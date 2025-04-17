'use client'
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Badge, Alert } from "react-bootstrap";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { getCart } from '../util/api';
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
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const router = useRouter();
  const { data: session, status } = useSession();

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

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item._id !== id)
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode === "SALE10") {
      setAppliedCoupon({
        code: "SALE10",
        discount: 0.1,
      });
    } else if (couponCode === "SALE20") {
      setAppliedCoupon({
        code: "SALE20",
        discount: 0.2,
      });
    }
  };

  const calculateSubtotal = () => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 0), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return calculateSubtotal() * appliedCoupon.discount;
  };

  const calculateShipping = () => {
    return shippingMethod === "standard" ? 30000 : 50000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
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

  if (!cart?.items?.length) {
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
                                  {item.size || "M"}
                                </Badge>
                                <Badge bg="light" text="dark">
                                  {item.color || "Đen"}
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
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className={`px-2 ${styles.btnOutlineSecondary}`}
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            >
                              <FaMinus />
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity || 1}
                              min={1}
                              className="mx-2"
                              style={{ width: "60px" }}
                              onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className={`px-2 ${styles.btnOutlineSecondary}`}
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
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
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleApplyCoupon}
                  >
                    Áp dụng
                  </Button>
                </div>
                {appliedCoupon && (
                  <Alert variant="success" className="mt-2 mb-0">
                    Đã áp dụng mã {appliedCoupon.code} (-{appliedCoupon.discount * 100}%)
                  </Alert>
                )}
              </div>

              <div className="mb-3">
                <Form.Label>Phương thức vận chuyển</Form.Label>
                <Form.Select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                >
                  <option value="standard">Giao hàng tiêu chuẩn (30.000đ)</option>
                  <option value="express">Giao hàng nhanh (50.000đ)</option>
                </Form.Select>
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                {appliedCoupon && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(calculateDiscount())}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span>{formatPrice(calculateShipping())}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Tổng cộng:</span>
                  <span className="text-danger">{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <Button variant="danger" className="w-100 mt-3">
                Thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
