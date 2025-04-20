'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge, InputGroup, FormControl, Alert } from "react-bootstrap";
import { FaShippingFast, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCart } from "../util/api";
import styles from "./page.module.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  
  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Set user information from session
    setName(session.user?.name || "");
    setEmail(session.user?.email || "");
    setPhone(session.user?.phone || "");
    setAddress(session.user?.address || "");

    // Fetch additional user info only if phone or address is missing
    const fetchUserInfo = async () => {
      if (!session.user?.phone || !session.user?.address) {
        try {
          const res = await fetch('/api/user-info');
          const data = await res.json();
          if (data) {
            if (!session.user?.phone) setPhone(data.phone || "");
            if (!session.user?.address) setAddress(data.address || "");
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();

    // Fetch cart items
    const fetchCartItems = async () => {
      try {
        const response = await getCart(session.accessToken);
        if (response && response.items) {
          setOrderItems(response.items);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Không thể tải giỏ hàng. Vui lòng thử lại.');
      }
    };

    fetchCartItems();
  }, [session, router]);

  // Tính tổng tiền
  const totalPrice = orderItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Validate form data
      if (!name || !email || !address || !phone) {
        throw new Error('Vui lòng điền đầy đủ thông tin');
      }

      // Validate phone number format
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (10 số)');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Email không hợp lệ. Vui lòng kiểm tra lại.');
      }

      // Validate cart items
      if (!orderItems || orderItems.length === 0) {
        throw new Error('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.');
      }

      // Update user info if phone or address is changed
      if (phone !== session.user?.phone || address !== session.user?.address) {
        const updateResponse = await fetch('/api/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone, address })
        });

        if (!updateResponse.ok) {
          throw new Error('Có lỗi xảy ra khi cập nhật thông tin');
        }
      }

      // TODO: Implement actual payment integration here
      // For now, just show a success message
      alert('Đơn hàng đã được tạo thành công!');
      router.push('/orders');
      
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
          <Alert variant="danger" className="mb-4">
            <FaExclamationTriangle className="me-2" />
            {error}
          </Alert>
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
                    <Form.Text className="text-muted">
                      Nhập số điện thoại Việt Nam (10-11 số)
                    </Form.Text>
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

                  <Button 
                    variant="outline-dark" 
                    type="submit" 
                    className={`w-40 ${styles.submitButton}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
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
                        <span>
                          {item.product?.name} x{item.quantity}
                          {item.size && <span className="ms-2">(Size: {item.size})</span>}
                        </span>
                        <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className={styles.orderSummary}>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Tổng tiền</span>
                      <span className="fw-bold text-danger">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
