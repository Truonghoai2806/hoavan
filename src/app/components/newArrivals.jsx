'use client';
import React from "react";
import { Container, Button, Badge } from "react-bootstrap";

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
  {
    name: "Chân váy caro",
    price: 279000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
  },
];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function NewArrivals() {
  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <h4 className="text-center fw-bold mb-4">Sản phẩm mới nhất</h4>
        <div className="product-grid">
          {newProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div
                className="product-img"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                {product.tag && (
                  <Badge bg="success" className="product-badge">
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
          ))}
        </div>
      </Container>

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
        }

        @media (min-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(5, 1fr); /* 5 sản phẩm hàng lớn */
          }
        }

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
