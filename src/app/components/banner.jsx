"use client";

import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BannerCarousel() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Carousel fade interval={4000} controls indicators wrap={true} pause={false}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1581235720704-cd2c0c1c2b84?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Mua sắm dễ dàng</h1>
                <p className="banner-subtitle">Khám phá hàng ngàn sản phẩm với ưu đãi mỗi ngày</p>
                <Button variant="light" size="lg">Xem ngay</Button>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1607082350899-566a9ef53c85?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Ưu đãi đặc biệt</h1>
                <p className="banner-subtitle">Mua 1 tặng 1, giảm sốc lên đến 70%</p>
                <Button variant="light" size="lg">Mua ngay</Button>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1606817665080-2887ec90f779?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Hỗ trợ 24/7</h1>
                <p className="banner-subtitle">Đội ngũ tư vấn luôn sẵn sàng giúp bạn</p>
                <Button variant="light" size="lg">Liên hệ</Button>
              </Container>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <style jsx>{`
        .banner-slide {
          height: 400px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .banner-title {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .banner-subtitle {
          font-size: 20px;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .banner-title {
            font-size: 32px;
          }

          .banner-subtitle {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
