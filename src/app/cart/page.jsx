'use client'
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Badge, Alert } from "react-bootstrap";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { getCart, updateCartItem, removeFromCart } from '../util/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      setError('Vui lòng đăng nhập để xem giỏ hàng');
      router.push('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await getCart(session?.accessToken);
        if (response && response.items) {
          setCart(response);
        } else {
          setCart({ items: [] });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        if (error.response?.status === 401) {
          setError('Vui lòng đăng nhập để xem giỏ hàng');
          router.push('/login');
        } else {
          setError('Có lỗi xảy ra khi tải giỏ hàng');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [status, router, session]);

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 0) return;

    try {
        if (newQuantity === 0) {
            await handleRemoveItem(id);
            return;
        }

        // Find the current item to get product info
        const currentItem = cart.items.find(item => item._id === id);
        if (!currentItem) return;

        // Get the size object from the product
        const sizeObj = currentItem.product.sizes.find(s => s.size === currentItem.size);
        if (!sizeObj) return;

        // Limit the quantity to available stock
        const maxQuantity = sizeObj.quantity;
        if (newQuantity > maxQuantity) {
            setError(`Số lượng tối đa có thể mua là ${maxQuantity}`);
            return;
        }

        setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.map(item => 
                item._id === id ? { ...item, quantity: newQuantity } : item
            ),
            total: prevCart.items.reduce((total, item) => 
                total + (item.product?.price || 0) * (item._id === id ? newQuantity : item.quantity), 0
            )
        }));

        const response = await updateCartItem(id, { quantity: newQuantity }, session?.accessToken);
        
        if (response.success) {
            const cartResponse = await getCart(session?.accessToken);
            if (cartResponse && cartResponse.data) {
                setCart(cartResponse.data);
            }
            setError(null);
        } else {
            if (response.message.includes('Insufficient stock')) {
                setError('Số lượng sản phẩm trong kho không đủ');
            } else {
                setError(response.message);
            }
            const cartResponse = await getCart(session?.accessToken);
            if (cartResponse && cartResponse.data) {
                setCart(cartResponse.data);
            }
        }
    } catch (error) {
        setError('Có lỗi xảy ra khi cập nhật số lượng');
        const cartResponse = await getCart(session?.accessToken);
        if (cartResponse && cartResponse.data) {
            setCart(cartResponse.data);
        }
    }
  };

  const handleRemoveItem = async (id) => {
    try {
        setCart(prevCart => ({
            ...prevCart,
            items: prevCart.items.filter(item => item._id !== id),
            total: prevCart.items
                .filter(item => item._id !== id)
                .reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
        }));

        const response = await removeFromCart(id, session?.accessToken);
        if (!response.success) {
            setError(response.message);
            const cartResponse = await getCart(session?.accessToken);
            if (cartResponse) setCart(cartResponse);
        }
    } catch (error) {
        setError('Có lỗi xảy ra khi xóa sản phẩm');
        const cartResponse = await getCart(session?.accessToken);
        if (cartResponse) setCart(cartResponse);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Validate cart items
      if (!cart.items || cart.items.length === 0) {
        throw new Error('Giỏ hàng trống');
      }

      // Calculate total amount
      const totalAmount = cart.items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
      
      // Create order
      const orderId = Date.now().toString();
      const orderInfo = `Thanh toán đơn hàng ${orderId}`;

      // Call payment API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderInfo,
          amount: totalAmount,
          orderId,
          paymentMethod: 'atm', // Default payment method
          customerInfo: {
            name: 'Khách hàng', // You can get this from user session or form
            email: 'customer@example.com',
            phone: '0123456789',
            address: 'Địa chỉ giao hàng'
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi tạo thanh toán');
      }

      if (!data.success) {
        throw new Error(data.message || 'Lỗi tạo thanh toán');
      }

      // Redirect to payment URL
      window.location.href = data.data.paymentUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <section className="py-5" style={{ background: "#f5f5f5" }}>
        <Container>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Đang tải giỏ hàng...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5" style={{ background: "#f5f5f5" }}>
        <Container>
          <Alert variant="danger" className="text-center">
            <h4 className="alert-heading">Lỗi!</h4>
            <p>{error}</p>
            <hr />
            <Button variant="primary" onClick={() => window.location.reload()}>
              Thử lại
            </Button>
          </Alert>
        </Container>
      </section>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <section className="py-5" style={{ background: "#f5f5f5" }}>
        <Container>
          <Alert variant="info" className="text-center">
            Giỏ hàng của bạn đang trống. <a href="/products">Tiếp tục mua sắm</a>
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <h4 className="fw-bold mb-4">Giỏ hàng của bạn</h4>

        <Row>
          <Col md={8}>
            <div className="bg-white rounded shadow-sm p-3 mb-4">
              <div className={styles.tableResponsive}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map(item => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.product?.image || "/placeholder.png"}
                              alt={item.product?.name || "Sản phẩm"}
                              style={{ width: "80px", height: "80px", objectFit: "cover" }}
                              className="rounded me-3"
                            />
                            <div>
                              <h6 className="mb-1">{item.product?.name || "Sản phẩm"}</h6>
                              <div className="d-flex gap-2">
                                <Badge bg="light" text="dark">
                                  Size: {item.size || "M"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {item.product?.originalPrice ? (
                            <div>
                              <span className="text-danger fw-bold">
                                {formatPrice(item.product.price)}
                              </span>
                              <br />
                              <del className="text-muted small">
                                {formatPrice(item.product.originalPrice)}
                              </del>
                            </div>
                          ) : (
                            formatPrice(item.product?.price || 0)
                          )}
                        </td>
                        <td>
                          <div className={`d-flex align-items-center ${styles.quantityControls}`}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className={`${styles.btnOutlineSecondary}`}
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  handleRemoveItem(item._id);
                                } else {
                                  handleQuantityChange(item._id, item.quantity - 1);
                                }
                              }}
                            >
                              <FaMinus />
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity || 1}
                              min={1}
                              max={item.product?.sizes?.find(s => s.size === item.size)?.quantity || 1}
                              className={`${styles.quantityInput}`}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                const maxQuantity = item.product?.sizes?.find(s => s.size === item.size)?.quantity || 1;
                                if (newQuantity <= maxQuantity) {
                                  handleQuantityChange(item._id, newQuantity);
                                }
                              }}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className={`${styles.btnOutlineSecondary}`}
                              onClick={() => {
                                const maxQuantity = item.product?.sizes?.find(s => s.size === item.size)?.quantity || 1;
                                if (item.quantity < maxQuantity) {
                                  handleQuantityChange(item._id, item.quantity + 1);
                                }
                              }}
                              disabled={item.quantity >= (item.product?.sizes?.find(s => s.size === item.size)?.quantity || 1)}
                            >
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td className="fw-bold">
                          {formatPrice((item.product?.price || 0) * (item.quantity || 1))}
                        </td>
                        <td>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => handleRemoveItem(item._id)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white rounded shadow-sm p-3 mb-4">
              <h6 className="mb-3">Tổng đơn hàng</h6>

              <div className="mb-3">
                <Form.Label>Mã giảm giá</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    disabled
                  />
                  <Button
                    variant="outline-secondary"
                    disabled
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <Form.Label>Phương thức vận chuyển</Form.Label>
                <Form.Select disabled>
                  <option value="standard">Giao hàng tiêu chuẩn (30.000đ)</option>
                  <option value="express">Giao hàng nhanh (50.000đ)</option>
                </Form.Select>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(cart.total || 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Giảm giá:</span>
                  <span>-0đ</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span>0đ</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Tổng cộng:</span>
                  <span className="text-danger">{formatPrice(cart.total || 0)}</span>
                </div>
              </div>

              <Button 
                variant="danger" 
                className="w-100 mt-3"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                Thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
