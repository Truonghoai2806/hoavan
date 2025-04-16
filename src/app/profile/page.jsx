"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaLock, FaHistory, FaHeart, FaShoppingBag } from "react-icons/fa";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP.HCM"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Xử lý lưu thông tin
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    // TODO: Xử lý đổi mật khẩu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handlePasswordCancel = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const renderProfileContent = () => {
    if (activeTab === "password") {
      return (
        <div>
          <div className={styles.cardHeader}>
            <h2>Đổi mật khẩu</h2>
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FaLock className="me-2" />
                Mật khẩu hiện tại
              </div>
              <Form.Control
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FaLock className="me-2" />
                Mật khẩu mới
              </div>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <FaLock className="me-2" />
                Xác nhận mật khẩu mới
              </div>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={styles.formControl}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              className={styles.saveButton}
              onClick={handlePasswordSave}
            >
              <FaSave className="me-2" />
              Lưu mật khẩu
            </Button>
            <Button
              variant="outline-secondary"
              className={styles.cancelButton}
              onClick={handlePasswordCancel}
            >
              <FaTimes className="me-2" />
              Hủy
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={styles.cardHeader}>
          <h2>Thông tin cá nhân</h2>
          {!isEditing && (
            <Button
              variant="outline-secondary"
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="me-2" />
              Chỉnh sửa
            </Button>
          )}
        </div>

        <div className={styles.infoGroup}>
          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              <FaEnvelope className="me-2" />
              Email
            </div>
            {isEditing ? (
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            ) : (
              <div className={styles.infoText}>{formData.email}</div>
            )}
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              <FaPhone className="me-2" />
              Số điện thoại
            </div>
            {isEditing ? (
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            ) : (
              <div className={styles.infoText}>{formData.phone}</div>
            )}
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoLabel}>
              <FaMapMarkerAlt className="me-2" />
              Địa chỉ
            </div>
            {isEditing ? (
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            ) : (
              <div className={styles.infoText}>{formData.address}</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              className={styles.saveButton}
              onClick={handleSave}
            >
              <FaSave className="me-2" />
              Lưu thay đổi
            </Button>
            <Button
              variant="outline-secondary"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              <FaTimes className="me-2" />
              Hủy
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={styles.profileSection}>
      <Container>
        <Row>
          {/* Sidebar */}
          <Col md={3} className={styles.sidebar}>
            <Card className={styles.sidebarCard}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <FaUser />
                </div>
                <h3 className={styles.profileName}>{formData.name}</h3>
                <p className={styles.userEmail}>{formData.email}</p>
              </div>
              <div className={styles.sidebarMenu}>
                <Button 
                  variant="link" 
                  className={`${styles.menuItem} ${activeTab === "profile" ? styles.activeMenuItem : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <FaUser className="me-2" />
                  Thông tin cá nhân
                </Button>
                <Button 
                  variant="link" 
                  className={`${styles.menuItem} ${activeTab === "password" ? styles.activeMenuItem : ""}`}
                  onClick={() => setActiveTab("password")}
                >
                  <FaLock className="me-2" />
                  Đổi mật khẩu
                </Button>
                <Button variant="link" className={styles.menuItem}>
                  <FaHistory className="me-2" />
                  Lịch sử đơn hàng
                </Button>
                <Button variant="link" className={styles.menuItem}>
                  <FaHeart className="me-2" />
                  Sản phẩm yêu thích
                </Button>
                <Button variant="link" className={styles.menuItem}>
                  <FaShoppingBag className="me-2" />
                  Giỏ hàng
                </Button>
              </div>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            <Card className={styles.mainCard}>
              <Card.Body>
                {renderProfileContent()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
} 