'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import styles from '../../styles/header.module.css';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    // Add click event listener to document
    document.addEventListener("click", handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            <Link href="/deals" passHref legacyBehavior>
              <Nav.Link>Khuyến mãi</Nav.Link>
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
            />
            <button className={styles['search-button']} aria-label="Tìm">
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

                {/* Dropdown menu */}
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
