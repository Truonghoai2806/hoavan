'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from '../../styles/header.module.css';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  // Toggle dropdown visibility
  const handleAvatarClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicked outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles.avatarWrapper}`)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/products?search=${encodeURIComponent(keyword.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>🛍️ Hoa Van</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Trang chủ</Nav.Link>
            </Link>
            <Link href="/products" passHref legacyBehavior>
              <Nav.Link>Sản phẩm</Nav.Link>
            </Link>
            <Link href="/checkout" passHref legacyBehavior>
              <Nav.Link>Thanh toán</Nav.Link>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <Nav.Link>Liên hệ</Nav.Link>
            </Link>
          </Nav>

          <div className={`${styles['search-wrapper']} mx-auto`}>
            <input
              type="text"
              className={styles['search-input']}
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles['search-button']} aria-label="Tìm" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          <div className="d-flex align-items-center ms-3 gap-2">
            {session ? (
              <div className="d-flex align-items-center">
                <div
                  className={styles.avatarWrapper}
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                  ) : (
                    <FaUser className={styles.avatar} />
                  )}
                </div>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/profile" className={styles.dropdownItem}>
                      Thông tin cá nhân
                    </Link>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => signOut()}
                    >
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <a className={styles['icon-button']}>
                  <FaUser />
                </a>
              </Link>
            )}

            <Link href="/cart" passHref legacyBehavior>
              <a className={styles['icon-button']}>
                <FaShoppingCart />
              </a>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
