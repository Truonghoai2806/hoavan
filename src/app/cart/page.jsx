'use client'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Alert } from 'react-bootstrap';
import { getCart } from '../util/api';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      setError('Vui lòng đăng nhập để xem giỏ hàng');
      router.push('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await getCart();
        console.log('Cart response:', response);
        if (response && response.data) {
          setCart(response.data);
        } else {
          setError('Không thể lấy dữ liệu giỏ hàng');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        if (error.response && error.response.status === 401) {
          setError('Vui lòng đăng nhập để xem giỏ hàng');
          router.push('/login');
        } else {
          setError('Có lỗi xảy ra khi tải giỏ hàng');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [status, router]);

  if (status === 'loading' || loading) {
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
      <Container className="py-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="info">
          <h4>Giỏ hàng trống</h4>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Button variant="primary" onClick={() => router.push('/products')}>
            Tiếp tục mua sắm
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.cartItemImage}
                  />
                  <div className="ms-3">
                    <h6>{item.product.name}</h6>
                  </div>
                </div>
              </td>
              <td>{item.size}</td>
              <td>{formatPrice(item.product.price)}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.product.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-end"><strong>Tổng tiền:</strong></td>
            <td><strong>{formatPrice(cart.total)}</strong></td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}
