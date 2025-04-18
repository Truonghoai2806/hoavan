'use client';
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // xử lý gửi form tại đây
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-5" style={{ background: "#f9f9f9" }}>
      <Container>
        <h3 className="text-center fw-bold mb-4">Liên hệ với cửa hàng thời trang của chúng tôi</h3>
        <Row className="mb-5">
          <Col md={6}>
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <h5 className="mb-3">Thông tin liên hệ</h5>
              <p><FaMapMarkerAlt className="me-2 text-primary" /> Quận 12, TP.HCM</p>
              <p><FaPhone className="me-2 text-primary" /> 0395 428 360</p>
              <p><FaEnvelope className="me-2 text-primary" /> truuonghoai2806@gmail.comcom</p>
              <p><strong>Giờ mở cửa:</strong> Thứ 2 - CN: 9h - 21h</p>
              <div className="mt-3">
                <a href="https://facebook.com/truonghoai2806" target="_blank" className="me-3 text-decoration-none text-dark">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" className="text-decoration-none text-dark">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </Col>

          <Col md={6}>
            {submitted && (
              <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
              </Alert>
            )}
            <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
              <h5 className="mb-3">Gửi liên hệ nhanh</h5>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ tên của bạn"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tiêu đề liên hệ"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Nội dung bạn muốn gửi..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary">
                  Gửi liên hệ
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <div className="mt-4">
          <h5 className="mb-3 fw-bold">Bản đồ cửa hàng</h5>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2430110821974!2d106.7004236748058!3d10.792733058853683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d0e866fef5%3A0x2e95ce54fcf46c7c!2zMTEzIMSQLiBOZ3V54buFbiBDaMOtbmgsIFBoxrDhu51uZyA3LCBRdeG6rW4gMywgSOG7kyBDaMOtbmggVmnDqm4sIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1684659089439!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
}
