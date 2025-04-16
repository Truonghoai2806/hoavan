'use client'
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Badge, Alert } from "react-bootstrap";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import styles from "./page.module.css";

const initialCartItems = [
  {
    id: 1,
    name: "Áo thun oversize",
    price: 299000,
    originalPrice: 359000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    size: "M",
    color: "Đen",
    quantity: 1,
  },
  {
    id: 2,
    name: "Quần short kaki",
    price: 349000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    size: "L",
    color: "Xanh",
    quantity: 2,
  },
  {
    id: 3,
    name: "Áo khoác gió nữ",
    price: 429000,
    originalPrice: 499000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    size: "S",
    color: "Hồng",
    quantity: 1,
  },
];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("standard");

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleApplyCoupon = () => {
    // Simulate coupon validation
    if (couponCode === "SALE10") {
      setAppliedCoupon({
        code: "SALE10",
        discount: 0.1, // 10% discount
      });
    } else if (couponCode === "SALE20") {
      setAppliedCoupon({
        code: "SALE20",
        discount: 0.2, // 20% discount
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <h4 className="fw-bold mb-4">Giỏ hàng của bạn</h4>
        
        {cartItems.length === 0 ? (
          <Alert variant="info" className="text-center">
            Giỏ hàng của bạn đang trống. <a href="/products">Tiếp tục mua sắm</a>
          </Alert>
        ) : (
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
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                className="rounded me-3"
                              />
                              <div>
                                <h6 className="mb-1">{item.name}</h6>
                                <div className="d-flex gap-2">
                                  <Badge bg="light" text="dark">
                                    {item.size}
                                  </Badge>
                                  <Badge bg="light" text="dark">
                                    {item.color}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {item.originalPrice ? (
                              <div>
                                <span className="text-danger fw-bold">
                                  {formatPrice(item.price)}
                                </span>
                                <br />
                                <del className="text-muted small">
                                  {formatPrice(item.originalPrice)}
                                </del>
                              </div>
                            ) : (
                              formatPrice(item.price)
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className={`px-2 ${styles.btnOutlineSecondary}`}
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <FaMinus />
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                min={1}
                                className="mx-2"
                                style={{ width: "60px" }}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className={`px-2 ${styles.btnOutlineSecondary}`}
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </td>
                          <td className="fw-bold">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                          <td>
                            <Button
                              variant="link"
                              className="text-danger p-0"
                              onClick={() => handleRemoveItem(item.id)}
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
        )}
      </Container>
    </section>
  );
}
