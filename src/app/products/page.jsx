'use client';
import React, { useState } from "react";
import { Container, Button, Badge, Form, Row, Col } from "react-bootstrap";
import { FaTimes, FaFilter } from "react-icons/fa";

const products = [
  {
    name: "Áo thun oversize",
    price: 299000,
    originalPrice: 359000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Áo",
  },
  {
    name: "Quần short kaki",
    price: 349000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Quần",
  },
  {
    name: "Áo khoác gió nữ",
    price: 429000,
    originalPrice: 499000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Áo khoác",
  },
  {
    name: "Váy suông công sở",
    price: 489000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Váy",
  },
  {
    name: "Chân váy caro",
    price: 279000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Váy",
  },
  {
    name: "Áo sơ mi nam",
    price: 249000,
    originalPrice: 299000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "Sale",
    category: "Áo",
  },
  {
    name: "Quần jean nam",
    price: 399000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Quần",
  },
  {
    name: "Áo khoác nam",
    price: 599000,
    originalPrice: 699000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "Sale",
    category: "Áo khoác",
  },
  {
    name: "Váy liền thân",
    price: 459000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "New",
    category: "Váy",
  },
  {
    name: "Áo len nữ",
    price: 329000,
    originalPrice: 399000,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m844wnjtxzlu05.webp",
    tag: "Sale",
    category: "Áo",
  },
];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Lấy danh sách các danh mục và tag duy nhất
  const categories = Array.from(new Set(products.map(product => product.category)));
  const tags = Array.from(new Set(products.map(product => product.tag)));

  // Lọc sản phẩm dựa trên các tiêu chí
  const filteredProducts = products.filter(product => {
    // Lọc theo khoảng giá
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Lọc theo danh mục
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    // Lọc theo tag
    const tagMatch = selectedTags.length === 0 || selectedTags.includes(product.tag);
    
    return priceMatch && categoryMatch && tagMatch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Tất cả sản phẩm</h4>
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
          <Col md={2} className={`filter-section ${!showFilters ? 'd-none' : ''}`}>
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
              
              <Form.Group className="mb-4">
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
              
              <Form.Group>
                <Form.Label>Tag</Form.Label>
                <div className="d-flex flex-column gap-2">
                  {tags.map(tag => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => handleTagChange(tag)}
                      className="text-start"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </div>
          </Col>

          {/* Danh sách sản phẩm */}
          <Col md={showFilters ? 10 : 12}>
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <div
                    className="product-img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {product.tag && (
                      <Badge bg={product.tag === "New" ? "success" : "danger"} className="product-badge">
                        {product.tag}
                      </Badge>
                    )}
                    <div className="hover-overlay">
                      <Button variant="light" size="sm" className="action-btn">
                        Mua ngay
                      </Button>
                      <Button variant="dark" size="sm" className="action-btn">
                        + Giỏ
                      </Button>
                    </div>
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
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }

        @media (min-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .product-card {
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
          padding: 12px;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-img {
          height: 250px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          border-radius: 10px;
          position: relative;
        }

        .product-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .hover-overlay {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 0 10px;
        }

        .product-img:hover .hover-overlay {
          opacity: 1;
        }

        .action-btn {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
        }

        .filter-section {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .product-img {
            height: 150px;
          }

          .hover-overlay {
            flex-direction: column;
            align-items: center;
            gap: 6px;
            bottom: 10px;
            padding: 0 20px;
          }

          .action-btn {
            width: 100%;
          }

          .filter-section {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
          }

          .filter-section.d-none {
            display: none !important;
          }

          .filter-section .bg-white {
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
          }
        }

        @media (min-width: 768px) {
          .filter-section {
            position: sticky;
            top: 20px;
            height: fit-content;
            max-width: 250px;
          }

          .filter-section.d-none {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
