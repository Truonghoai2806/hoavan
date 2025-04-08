'use client';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMale, FaFemale, FaShoePrints, FaGem, FaStar, FaTshirt } from "react-icons/fa";

const categories = [
    {
        title: "Áo nam",
        icon: <FaMale size={18} />,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=60",
    },
    {
        title: "Áo nữ",
        icon: <FaFemale size={18} />,
        image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=600&q=60",
    },
    {
        title: "Giày dép",
        icon: <FaShoePrints size={18} />,
        image: "https://images.unsplash.com/photo-1600185365984-b36e9e3b89f6?auto=format&fit=crop&w=600&q=60",
    },
    {
        title: "Phụ kiện",
        icon: <FaGem size={18} />,
        image: "https://images.unsplash.com/photo-1555529669-e69c3d393b97?auto=format&fit=crop&w=600&q=60",
    },
    {
        title: "Bộ sưu tập mới",
        icon: <FaStar size={18} />,
        image: "https://images.unsplash.com/photo-1582738414185-2887bfcde5f0?auto=format&fit=crop&w=600&q=60",
    },
    {
        title: "Tất cả sản phẩm",
        icon: <FaTshirt size={18} />,
        image: "https://images.unsplash.com/photo-1530018607912-eff2daa1b1bc?auto=format&fit=crop&w=600&q=60",
    },
];

export default function CategorySection() {
    return (
        <section className="py-4 bg-light">
            <Container>
                <h5 className="text-center fw-semibold mb-4">Danh mục sản phẩm</h5>
                <Row className="g-2 justify-content-center">
                    {categories.map((cat, index) => (
                        <Col key={index} xs={6} sm={4} md={3} lg={2}>
                            <div className="category-item">
                                <div className="category-img" style={{ backgroundImage: `url(${cat.image})` }}></div>
                                <div className="category-label text-center">
                                    <div className="icon">{cat.icon}</div>
                                    <div className="text">{cat.title}</div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style jsx>{`
        .category-item {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
        }

        .category-item:hover {
          transform: scale(1.03);
        }

        .category-img {
          height: 80px;
          background-size: cover;
          background-position: center;
        }

        .category-label {
          padding: 8px 6px;
          font-size: 0.85rem;
        }

        .icon {
          color: #333;
          margin-bottom: 4px;
        }

        @media (max-width: 576px) {
          .category-img {
            height: 60px;
          }

          .category-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
        </section>
    );
}
