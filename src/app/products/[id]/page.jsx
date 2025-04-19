'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Row, Col, Button, Badge, Toast } from 'react-bootstrap';
import { getProductById, addToCart, getCart } from '../../util/api';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getProductdetail = async () => {
      try {
        const res = await getProductById(id);
        if (res && res._id) {
          setProduct(res);
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

  useEffect(() => {
    const fetchCart = async () => {
      if (status === 'authenticated') {
        try {
          const response = await getCart(session?.accessToken);
          if (response && response.data) {
            setCartItems(response.data.items || []);
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };
    fetchCart();
  }, [status, session]);

  const getAvailableQuantity = () => {
    if (!selectedSize || !product) return 0;
    
    const sizeObj = product.sizes.find(s => s.size === selectedSize);
    if (!sizeObj) return 0;

    // Tìm số lượng đã có trong giỏ hàng
    const cartItem = cartItems.find(item => 
      item.product._id === product._id && item.size === selectedSize
    );
    const cartQuantity = cartItem ? cartItem.quantity : 0;

    // Số lượng có thể thêm = số lượng tồn kho - số lượng đã có trong giỏ
    return sizeObj.quantity - cartQuantity;
  };

  const handleQuantityChange = (newQuantity) => {
    if (!selectedSize) return;
    
    const availableQuantity = getAvailableQuantity();
    if (availableQuantity <= 0) return;
    
    setQuantity(Math.min(newQuantity, availableQuantity));
  };

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

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setToastMessage('Vui lòng chọn size');
      setShowToast(true);
      return;
    }

    if (status === 'unauthenticated') {
      setToastMessage('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      setShowToast(true);
      router.push('/login');
      return;
    }

    const availableQuantity = getAvailableQuantity();
    if (availableQuantity <= 0) {
      setToastMessage('Số lượng sản phẩm trong kho không đủ');
      setShowToast(true);
      return;
    }

    try {
      const response = await addToCart({
        productId: id,
        size: selectedSize,
        quantity: quantity,
        token: session.accessToken
      });

      if (response) {
        setToastMessage('Đã thêm sản phẩm vào giỏ hàng');
        setShowToast(true);
        // Cập nhật lại giỏ hàng sau khi thêm
        const cartResponse = await getCart(session.accessToken);
        if (cartResponse && cartResponse.data) {
          setCartItems(cartResponse.data.items || []);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.message.includes('401')) {
        setToastMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        setShowToast(true);
        router.push('/login');
      } else {
        setToastMessage(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
        setShowToast(true);
      }
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
                    className={`${styles.sizeItem} ${selectedSize === size.size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySection}>
              <h4>Số lượng</h4>
              <div className={styles.quantityControl}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || 1;
                    handleQuantityChange(newQuantity);
                  }}
                  className={styles.quantityInput}
                />
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!selectedSize || quantity >= getAvailableQuantity()}
                >
                  +
                </button>
              </div>
              {selectedSize && (
                <div className="text-muted small mt-2">
                  Còn {getAvailableQuantity()} sản phẩm trong kho
                </div>
              )}
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="outline-dark"
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

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}
