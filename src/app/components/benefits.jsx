'use client';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaShippingFast, FaRedo, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const benefits = [
    {
        icon: <FaShippingFast size={32} color="#000" />,
        title: "Giao hàng toàn quốc",
        description: "Nhanh chóng và an toàn đến tận tay bạn.",
    },
    {
        icon: <FaRedo size={32} color="#000" />,
        title: "Đổi trả dễ dàng",
        description: "Hỗ trợ đổi trả trong vòng 7 ngày.",
    },
    {
        icon: <FaHeadset size={32} color="#000" />,
        title: "Hỗ trợ 24/7",
        description: "Luôn sẵn sàng giải đáp mọi thắc mắc.",
    },
    {
        icon: <FaMoneyBillWave size={32} color="#000" />,
        title: "Thanh toán COD",
        description: "Thanh toán khi nhận hàng tiện lợi.",
    },
];

export default function Benefits() {
    return (
        <section className="py-5 bg-light">
            <Container>
                <h4 className="text-center fw-bold mb-4">Cam kết của chúng tôi</h4>
                <Row className="g-4">
                    {benefits.map((benefit, index) => (
                        <Col key={index} xs={12} sm={6} md={3}>
                            <div className="benefit-card text-center p-3 rounded bg-white shadow-sm h-100">
                                <div className="icon mb-3">{benefit.icon}</div>
                                <h6 className="fw-bold">{benefit.title}</h6>
                                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                                    {benefit.description}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style jsx>{`
        .benefit-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
      `}</style>
        </section>
    );
}
