'use client';
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge, InputGroup, FormControl } from "react-bootstrap";
import { FaCreditCard, FaShippingFast, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import styles from "./page.module.css";  // Add your CSS module for custom styling

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("atm");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([
    { name: "Áo thun nam cổ tròn", price: 200000, quantity: 2 },
    { name: "Quần jean nam", price: 300000, quantity: 1 },
  ]);
  
  // Tính tổng tiền
  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Validate form data
      if (!name || !email || !address || !phone) {
        throw new Error('Vui lòng điền đầy đủ thông tin');
      }

      // Tạo đơn hàng và lấy orderId
      const orderId = Date.now().toString();
      
      // Gọi API tạo thanh toán
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderInfo: `Thanh toán đơn hàng ${orderId}`,
          amount: totalPrice,
          orderId: orderId,
          paymentMethod: paymentMethod,
          customerInfo: {
            name,
            email,
            phone,
            address
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

      // Chuyển hướng đến trang thanh toán
      window.location.href = data.data.paymentUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <Container>
        <h3 className="text-center mb-4" style={{ color: "#333" }}>Thanh toán</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Row>
          {/* Thông tin giao hàng */}
          <Col md={6}>
            <Card className={styles.cardShadow}>
              <Card.Header className={styles.cardHeader}>
                <FaShippingFast /> Thông tin giao hàng
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={styles.input}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.input}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
                      <FormControl
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={styles.input}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                    <InputGroup>
                      <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
                      <FormControl
                        type="text"
                        placeholder="Nhập địa chỉ giao hàng"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className={styles.input}
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Phương thức thanh toán */}
                  <Form.Group className="mb-3">
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <div>
                      <Form.Check
                        type="radio"
                        label="Thẻ ATM nội địa"
                        name="paymentMethod"
                        value="atm"
                        checked={paymentMethod === "atm"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className={styles.paymentOption}
                      />
                      <Form.Check
                        type="radio"
                        label="Internet Banking"
                        name="paymentMethod"
                        value="banking"
                        checked={paymentMethod === "banking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className={styles.paymentOption}
                      />
                      <Form.Check
                        type="radio"
                        label="QR Code"
                        name="paymentMethod"
                        value="qr"
                        checked={paymentMethod === "qr"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className={styles.paymentOption}
                      />
                    </div>
                  </Form.Group>
                  <Button 
                    variant="outline-dark" 
                    type="submit" 
                    className={`w-40 ${styles.submitButton}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Tổng hợp đơn hàng */}
          <Col md={6}>
            <Card className={styles.cardShadow}>
              <Card.Header className={styles.cardHeader}>
                <FaMoneyBillWave /> Tổng hợp đơn hàng
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className={styles.orderItem}>
                      <div className="d-flex justify-content-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className={styles.orderSummary}>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Tổng tiền</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <Badge bg="dark" className="mt-3 text-light">
                  {paymentMethod === "atm" ? "Thẻ ATM nội địa" : 
                   paymentMethod === "banking" ? "Internet Banking" : "QR Code"}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
