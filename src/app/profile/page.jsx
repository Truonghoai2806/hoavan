"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "Người dùng",
        email: session.user.email || "",
        phone: session.user.phone || "",
        address: session.user.address || ""
      });
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const renderProfileContent = () => {
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

  if (!session) {
    return <div>Vui lòng đăng nhập để xem thông tin cá nhân.</div>;
  }

  return (
    <section className={styles.profileSection}>
      <Container>
        <Row>
          {/* Sidebar */}
          <Col md={3} className={styles.sidebar}>
            <Card className={styles.sidebarCard}>
              <div className={styles.avatarContainer}>
                <div className={styles.image}>
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className={styles.avatar} 
                    />
                  ) : (
                    <FaUser className={styles.avatar} />
                  )}
                </div>
                <h3 className={styles.profileName}>{session.user?.name || formData.name}</h3>
                <p className={styles.userEmail}>{session.user?.email || formData.email}</p>
              </div>
              <div className={styles.sidebarMenu}>
                <Button variant="link" className={styles.menuItem}>
                  <FaUser className="me-2" />
                  Thông tin cá nhân
                </Button>
                {/* Các item khác trong menu */}
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
