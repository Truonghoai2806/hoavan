'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { getProductById } from '../../util/api';
import styles from './page.module.css';

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductdetail = async () => {
      try {
        const res = await getProductById(id);
        if (res && res._id) {
          const processedProduct = {
            ...res,
            sizes: Array.isArray(res.sizes) ? res.sizes.map(size => typeof size === 'object' ? size.size : size) : [],
          };
          setProduct(processedProduct);
        } else {
          console.error('Invalid product data:', res);
          setError('Không tìm thấy sản phẩm');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Có lỗi xảy ra khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    getProductdetail();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">{error}</h2>
        <p>ID sản phẩm: {id}</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Sản phẩm không tồn tại</h2>
        <p>ID sản phẩm: {id}</p>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSiz) {
      alert('Vui lòng chọn size');
      return;
    }
  };

  const originalPrice = product.price;
  const discountAmount = (originalPrice * product.discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <div className={styles.productImageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.priceSection}>
              {product.discount > 0 ? (
                <>
                  <span className={styles.discountedPrice}>
                    {formatPrice(finalPrice)}
                  </span>
                  <span className={styles.originalPrice}>
                    {formatPrice(originalPrice)}
                  </span>
                  <Badge bg="danger" className={styles.discountBadge}>
                    -{product.discount}%
                  </Badge>
                </>
              ) : (
                <span className={styles.price}>
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <div className={styles.description}>
             Mô tả: {product.description}
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Giới tính: </span>
                <span className={styles.detailValue}>{product.gender}</span>
              </div>
            </div>

            <div className={styles.sizeSection}>
              <h4>Kích thước</h4>
              <div className={styles.sizeList}>
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`${styles.sizeItem} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySection}>
              <h4>Số lượng</h4>
              <div className={styles.quantityControl}>
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className={styles.quantityInput}
                />
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="lg"
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
