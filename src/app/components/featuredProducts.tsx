'use client';
import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const products = [
  {
    name: "Áo sơ mi trắng cổ điển",
    price: 399000,
    originalPrice: 499000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
  {
    name: "Đầm hoa mùa hè",
    price: 489000,
    originalPrice: 589000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "Sale",
  },
  {
    name: "Áo khoác denim nam",
    price: 599000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
  },
  {
    name: "Váy dài họa tiết boho",
    price: 729000,
    originalPrice: 899000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function FeaturedProducts() {
  return (
    <section className="py-5" style={{ background: "#f9fafb" }}>
      <Container>
        <h4 className="text-center fw-bold mb-4">Sản phẩm nổi bật</h4>
        <Row className="g-4">
          {products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className="product-card">
                <div className="product-img" style={{ backgroundImage: `url(${product.image})` }}>
                  {product.tag && (
                    <Badge bg={product.tag === "Sale" ? "danger" : "success"} className="product-badge">
                      {product.tag}
                    </Badge>
                  )}
                  <div className="hover-overlay">
                    <Button variant="light" size="sm" className="action-btn">
                      Mua ngay
                    </Button>
                    <Button variant="dark" size="sm" className="action-btn">
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
          bottom: 10px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 0 10px;
        }

        .product-img:hover .hover-overlay {
          opacity: 1;
        }

        .action-btn {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
        }

        @media (max-width: 576px) {
          .product-img {
            height: 150px;
          }

          .hover-overlay {
            flex-direction: column;
            align-items: center;
            gap: 6px;
            bottom: 10px;
            padding: 0 20px;
          }

          .action-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
