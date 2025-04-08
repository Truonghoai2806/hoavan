'use client';
import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const newProducts = [
  {
    name: "Áo thun oversize",
    price: 299000,
    originalPrice: 359000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
  {
    name: "Quần short kaki",
    price: 349000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
  {
    name: "Áo khoác gió nữ",
    price: 429000,
    originalPrice: 499000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
  {
    name: "Váy suông công sở",
    price: 489000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function NewArrivals() {
  return (
    <section className="py-5">
      <Container>
        <h4 className="text-center fw-bold mb-4">Sản phẩm mới nhất</h4>
        <Row className="g-4">
          {newProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className="product-card">
                <div
                  className="product-img"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  {product.tag && (
                    <Badge bg="success" className="product-badge">
                      {product.tag}
                    </Badge>
                  )}
                  <div className="hover-overlay d-flex gap-2 justify-content-center">
                    <Button variant="light" size="sm">
                      Mua ngay
                    </Button>
                    <Button variant="dark" size="sm">
                      + Giỏ
                    </Button>
                  </div>
                </div>
                <div className="product-info text-center py-3">
                  <h6 className="mb-1">{product.name}</h6>
                  {product.originalPrice ? (
                    <p className="mb-0">
                      <span className="text-danger fw-bold me-2">
                        {formatPrice(product.price)}
                      </span>
                      <del className="text-muted">{formatPrice(product.originalPrice)}</del>
                    </p>
                  ) : (
                    <p className="text-muted mb-0">{formatPrice(product.price)}</p>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .product-card {
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          padding: 12px;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-img {
          height: 200px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          border-radius: 10px;
          position: relative;
        }

        .product-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .hover-overlay {
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-img:hover .hover-overlay {
          opacity: 1;
        }

        @media (max-width: 576px) {
          .product-img {
            height: 150px;
          }

          .hover-overlay {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </section>
  );
}
