"use client";
import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function BannerCarousel() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Carousel fade interval={5000} controls indicators wrap={true} pause={false}>
        {/* Slide 1 */}
        <Carousel.Item>
        <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1520975922038-6b1b809de7b1?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Bộ sưu tập xuân hè</h1>
                <p className="banner-subtitle">Phong cách thời trang mới nhất cho bạn</p>
                <Link href="/products"><Button variant="light" size="lg">Mua ngay</Button></Link>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1520974721673-67a5f0f39c4f?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Giảm giá cực sốc</h1>
                <p className="banner-subtitle">Ưu đãi lên đến 50% cho đơn hàng đầu tiên</p>
                <Link href="/products"><Button variant="light" size="lg">Mua ngay</Button></Link>
              </Container>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="banner-slide" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1520975922038-6b1b809de7b1?auto=format&fit=crop&w=1400&q=80")` }}>
            <div className="overlay">
              <Container className="text-center text-white">
                <h1 className="banner-title">Thời trang nam & nữ</h1>
                <p className="banner-subtitle">Khám phá các mẫu thiết kế phù hợp với mọi phong cách</p>
                <Link href="/products"><Button variant="light" size="lg">Xem bộ sưu tập</Button></Link>
              </Container>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <style jsx>{`
        .banner-slide {
          height: 450px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.4);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .banner-title {
          font-size: 52px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .banner-subtitle {
          font-size: 22px;
          margin-bottom: 28px;
        }

        @media (max-width: 768px) {
          .banner-title {
            font-size: 34px;
          }

          .banner-subtitle {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
