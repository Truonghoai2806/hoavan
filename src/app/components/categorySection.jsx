'use client';
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getCategories } from "../util/api";
import { useRouter } from "next/navigation";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getCategory = async () => {
      const res = await getCategories();
      if (!res?.message) {
        setCategories(res);
      } else {
        notification.error({
          message: 'Get user failed',
          description: res.message
        });
      }
    }
    getCategory();
  }, []);

  return (
    <section className="py-4 bg-light">
      <Container>
        <h5 className="text-center fw-semibold mb-4">Danh mục sản phẩm</h5>
        <Row className="g-2 justify-content-center">
          {categories.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2}>
              <div className="category-item text-center" onClick={() => router.push(`/category/${item._id}`)}>
              <h4>{item.name}</h4>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
                .category-item {
                    background: #fff;
                    border-radius: 12px;
                    padding: 20px 10px;
                    font-size: 0.9rem;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
                    transition: transform 0.2s ease;
                }

                .category-item:hover {
                    transform: scale(1.03);
                }
            `}</style>
    </section>
  );
}