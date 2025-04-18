'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Button, Badge, Form, Row, Col, Pagination } from "react-bootstrap";
import { FaTimes, FaFilter } from "react-icons/fa";
import { getProducts, searchProduct } from "../util/api";
import styles from "./page.module.css";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('search')?.toLowerCase() || '';

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (searchKeyword) {
          response = await searchProduct(searchKeyword);
        } else {
          response = await getProducts();
        }

        if (!response?.message) {
          setProducts(response);
        } else {
          console.error("Error fetching products:", response.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchKeyword]);

  const categories = Array.from(new Set(products.map(product => product.category?.name || product.category))).filter(Boolean);

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const categoryMatch = selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category?.name || product.category));
    return priceMatch && categoryMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];

    pages.push(
      <Pagination.First
        key="first"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
    );

    pages.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      />
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (
        (i === currentPage - 2 && i > 1) ||
        (i === currentPage + 2 && i < totalPages)
      ) {
        pages.push(<Pagination.Ellipsis key={`ellipsis-${i}`} disabled />);
      }
    }

    pages.push(
      <Pagination.Next
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    );

    pages.push(
      <Pagination.Last
        key="last"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return <Pagination className="justify-content-center mt-4">{pages}</Pagination>;
  };

  if (loading) {
    return (
      <section className="py-5" style={{ background: "#f5f5f5" }}>
        <Container>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Đang tải sản phẩm...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            {searchKeyword ? `Kết quả tìm kiếm cho "${searchKeyword}"` : "Tất cả sản phẩm"}
          </h4>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="d-flex align-items-center gap-2"
          >
            <FaFilter />
            {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </Button>
        </div>

        <Row>
          {/* Bộ lọc */}
          <Col md={2} className={`${styles.filterSection} ${!showFilters ? 'd-none' : ''}`}>
            <div className="bg-white rounded shadow-sm p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Bộ lọc</h6>
                <div className="d-flex gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none p-0"
                    onClick={clearFilters}
                  >
                    Xóa bộ lọc
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none p-0 d-md-none"
                    onClick={() => setShowFilters(false)}
                  >
                    <FaTimes />
                  </Button>
                </div>
              </div>

              <Form.Group className="mb-4">
                <Form.Label>Khoảng giá</Form.Label>
                <Form.Range
                  min={0}
                  max={1000000}
                  step={100000}
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                />
                <div className="d-flex justify-content-between">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Danh mục</Form.Label>
                <div className="d-flex flex-column gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategories.includes(category) ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className="text-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </div>
          </Col>

          {/* Danh sách sản phẩm */}
          <Col md={showFilters ? 10 : 12}>
            {filteredProducts.length === 0 ? (
              <div className="text-center text-muted py-5">
                Không tìm thấy sản phẩm nào.
              </div>
            ) : (
              <>
                <div className={styles.productGrid}>
                  {paginatedProducts.map((product) => (
                    <div key={product._id} className={styles.productCard}>
                      <div
                        className={styles.productImg}
                        style={{ backgroundImage: `url(${product.image})` }}
                        onClick={() => router.push(`/products/${product._id}`)}
                      >
                        {product.tag && (
                          <Badge bg={product.tag === "New" ? "success" : "danger"} className={styles.productBadge}>
                            {product.tag}
                          </Badge>
                        )}
                      </div>
                      <div className="product-info text-center py-3">
                        <h6 className="mb-1">{product.name}</h6>
                        {product.originalPrice ? (
                          <p className="mb-0">
                            <span className="text-danger fw-bold me-2">
                              {formatPrice(product.price)}
                            </span>
                            <del className="text-muted">{formatPrice(product.originalPrice)}</del>
                          </p>
                        ) : (
                          <p className="text-muted mb-0">{formatPrice(product.price)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
