'use client';
import React, { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { getProducts } from "../util/api";
import styles from "../../styles/newarrivals.module.css";
import { useRouter } from "next/navigation";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const res = await getProducts();
      if (!res?.message) {
        const newProducts = res.filter(item => item.tags.includes("new"));
        setProducts(newProducts);
      } else {
        notification.error({
          message: "Get user failed",
          description: res.message,
        });
      }
    };
    getProduct();
  }, []);

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <h4 className="text-center fw-bold mb-4">Sản phẩm mới nhất</h4>
        <div className={styles.productGrid}>
          {products.map((item) => {
            const hasDiscount = item.discount > 0;
            // Giảm giá
            const discountedPrice = hasDiscount
              ? item.price * (1 - item.discount / 100)
              : item.price;

            return (
              <div key={item._id} className={styles.productCard}>
                <div
                  className={styles.productImg}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {item.tag && (
                    <Badge bg="success" className={styles.productBadge}>
                      {item.tag}
                    </Badge>
                  )}
                  <div className={styles.hoverOverlay}>
                    {/* <Button variant="light" size="sm" className={styles.actionBtn}>
                      Mua ngay
                    </Button> */}
                    <Button
                      variant="light"
                      size="sm"
                      className={styles.actionBtn}
                      onClick={() => router.push(`/products/${item._id}`)}
                    >
                      Mua ngay
                    </Button>

                    <Button variant="dark" size="sm" className={styles.actionBtn}>
                      + Giỏ
                    </Button>
                  </div>
                </div>
                <div className="product-info text-center py-3">
                  <h6 className="mb-1">{item.name}</h6>
                  {hasDiscount ? (
                    <p className="mb-0">
                      <span className="text-danger fw-bold me-2">
                        {formatPrice(discountedPrice)}
                      </span>
                      <del className="text-muted">
                        {formatPrice(item.price)}
                      </del>
                    </p>
                  ) : (
                    <p className="text-muted mb-0">{formatPrice(item.price)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>

    </section>
  );
}
