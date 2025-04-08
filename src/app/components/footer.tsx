"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row className="py-4">
          {/* Logo */}
          <Col md={3} className="footer-logo">
            <h3>🛍️ Hoa Van</h3>
            <p>Thương hiệu uy tín với những sản phẩm chất lượng cao.</p>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="footer-contact">
            <h5>Liên hệ</h5>
            <p><FaPhone /> 0395 428 360</p>
            <p><FaEnvelope /> truonghoai2806@gmail.com</p>
            <p><FaMapMarkerAlt /> Quận 12, Hồ Chí Minh</p>
          </Col>

          {/* Services and Payment Methods */}
          <Col md={3} className="footer-services">
            <h5>Dịch vụ</h5>
            <ul>
              <li>Giao hàng nhanh chóng</li>
              <li>Hoàn trả sản phẩm</li>
              <li>Hỗ trợ khách hàng 24/7</li>
            </ul>

            <h5>Thanh toán</h5>
            <div className="payment-methods">
              <FaCreditCard /> <span>Visa, MasterCard, PayPal</span>
            </div>
          </Col>

          {/* Social Media Icons */}
          <Col md={3} className="footer-social">
            <h5>Mạng xã hội</h5>
            <div className="social-icons">
              <a href="https://facebook.com" className="icon-button"><FaFacebook /></a>
              <a href="https://instagram.com" className="icon-button"><FaInstagram /></a>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom py-3">
          <Col className="text-center">
            <p>
              <small>&copy; 2025 Hoa Van - <a href="/privacy-policy">Chính sách bảo mật</a> | <a href="/terms">Điều khoản sử dụng</a></small>
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .footer {
          background-color: #f9f9f9;
          border-top: 1px solid #e0e0e0;
        }

        .footer-logo h3 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
        }

        .footer-logo p {
          font-size: 14px;
          color: #777;
        }

        .footer-contact h5, .footer-services h5, .footer-social h5 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .footer-contact p, .footer-services ul, .footer-social p {
          font-size: 14px;
          color: #777;
        }

        .footer-services ul {
          padding-left: 20px;
        }

        .footer-services li {
          font-size: 14px;
          color: #777;
        }

        .payment-methods {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #777;
        }

        .payment-methods span {
          margin-left: 8px;
        }

        .footer-social .social-icons {
          display: flex;
          gap: 16px;
        }

        .icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f1f1f1;
          color: #333;
          text-decoration: none;
          font-size: 20px;
          transition: background-color 0.2s ease;
        }

        .icon-button:hover {
          background-color: #007bff;
          color: #fff;
        }

        .footer-bottom {
          background-color: #fff;
          border-top: 1px solid #e0e0e0;
        }

        .footer-bottom a {
          color: #007bff;
          text-decoration: none;
        }

        .footer-bottom a:hover {
          text-decoration: underline;
        }

        @media (max-width: 767px) {
          .footer-logo h3 {
            font-size: 24px;
          }

          .footer-contact h5, .footer-services h5, .footer-social h5 {
            font-size: 16px;
          }

          .footer-contact p, .footer-services ul, .footer-social p {
            font-size: 13px;
          }

          .footer-logo, .footer-contact, .footer-services, .footer-social {
            text-align: center;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}
