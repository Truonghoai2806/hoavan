'use client';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession, signOut } from "next-auth/react"; // Import thêm useSession
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession(); // Lấy session của người dùng
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu người dùng đã đăng nhập, chuyển về trang chủ
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError("Email hoặc mật khẩu không đúng");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/" });
      // Nếu đăng nhập Google thành công, tự động chuyển về trang chủ
      if (result?.ok) {
        router.push("/");
      }
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
              <h2>Đăng nhập</h2>
              {error && <Alert variant="danger" className={styles.alert}>{error}</Alert>}
              {!session ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.formControl}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={styles.formControl}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className={styles.btnDark}
                    disabled={loading}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </Form>
              ) : null} {/* Không hiển thị gì khi đã đăng nhập */}
              {!session && (
                <>
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
                    Đăng nhập bằng Google
                  </Button>
                </>
              )}
              <p className="text-center mb-0">
                Chưa có tài khoản?{" "}
                <a href="/register" className={styles.link}>
                  Đăng ký
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
