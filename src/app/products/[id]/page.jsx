'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { getProductById } from '../../util/api';
import styles from './page.module.css';

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId);
        if (res?.data) {
          setProduct(res.data);
        } else {
          console.error('Product not found');
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Sản phẩm không tồn tại</h2>
        <Button variant="primary" onClick={() => router.push('/')}>
          Quay lại trang chủ
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Vui lòng chọn size và màu sắc');
      return;
    }
    // TODO: Thêm vào giỏ hàng
    console.log({
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
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
            {product.discount > 0 && (
              <Badge bg="danger" className={styles.discountBadge}>
                -{product.discount}%
              </Badge>
            )}
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
                </>
              ) : (
                <span className={styles.price}>
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            <div className={styles.description}>
              {product.description}
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Danh mục:</span>
                <span className={styles.detailValue}>{product.category}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Giới tính:</span>
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

            <div className={styles.colorSection}>
              <h4>Màu sắc</h4>
              <div className={styles.colorList}>
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`${styles.colorItem} ${selectedColor === color ? styles.selected : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
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
                className={styles.buyNowButton}
                onClick={handleAddToCart}
              >
                Mua ngay
              </Button>
              <Button 
                variant="outline-primary" 
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