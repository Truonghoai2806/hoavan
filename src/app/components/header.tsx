"use client";

import React from "react";
import {
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="/">🛍️ Hoa Van</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          <Nav className="me-auto">
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="/products">Sản phẩm</Nav.Link>
            <Nav.Link href="/deals">Khuyến mãi</Nav.Link>
            <Nav.Link href="/contact">Liên hệ</Nav.Link>
          </Nav>

          <div className="search-wrapper mx-auto">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button className="search-button" aria-label="Tìm">
              <FaSearch />
            </button>
          </div>

          <div className="d-flex align-items-center ms-3 gap-2">
            <a href="/login" className="icon-button">
              <FaUser />
            </a>
            <a href="/cart" className="icon-button">
              <FaShoppingCart />
            </a>
          </div>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 8px 40px 8px 16px;
          border: 1px solid #ccc;
          border-radius: 999px;
          outline: none;
          transition: all 0.2s;
          background-color: #f9f9f9;
        }

        .search-input:focus {
          border-color: #007bff;
          background-color: #fff;
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #555;
          font-size: 16px;
          cursor: pointer;
        }

        .search-button:hover {
          color: #007bff;
        }

        .icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f1f1f1;
          color: #333;
          text-decoration: none;
          font-size: 18px;
          transition: background-color 0.2s ease;
        }

        .icon-button:hover {
          background-color: #e2e2e2;
        }
      `}</style>
    </Navbar>
  );
}
