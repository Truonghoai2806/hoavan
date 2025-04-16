"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    try {
      // Add your registration logic here
      console.log("Registering user:", formData);
      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setError("Đăng nhập bằng Google thất bại");
    }
  };

  return (
    <section className={styles.loginSection}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className={styles.loginCard}>
              <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </Form>
              <div className={styles.divider}>
                <span>hoặc</span>
              </div>
              <Button
                variant="outline-dark"
                className="w-100 mb-3"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FaGoogle className="me-2" />
                Đăng ký bằng Google
              </Button>
              <p className="text-center mb-0">
                Đã có tài khoản?{" "}
                <a href="/login" className={styles.link}>
                  Đăng nhập
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
