'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Badge, Pagination } from 'react-bootstrap';
import { getProductsByCategory, getCategories } from '../util/api';
import styles from '../../styles/newarrivals.module.css';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

const PRODUCTS_PER_PAGE = 10;

export default function ProductByCategory() {
    const { id } = useParams();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    // Fetch category name
                    const categoriesResponse = await getCategories();
                    if (!categoriesResponse?.message) {
                        const category = categoriesResponse.find(cat => cat._id === id);
                        if (category) {
                            setCategoryName(category.name);
                        }
                    }

                    // Fetch products
                    const productsResponse = await getProductsByCategory(id);
                    if (!productsResponse?.message) {
                        setProducts(productsResponse || []);
                    } else {
                        console.error(productsResponse.message);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [id]);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const pages = [];

        pages.push(
            <Pagination.First key="first" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        );
        pages.push(
            <Pagination.Prev key="prev" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        );

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
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
            <Pagination.Next key="next" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        );
        pages.push(
            <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        );

        return <Pagination className="justify-content-center mt-4">{pages}</Pagination>;
    };

    return (
        <section className="py-5" style={{ background: "#f5f5f5" }}>
            <Container>
                <h4 className="text-center fw-bold mb-4">
                    Sản phẩm thuộc danh mục: {categoryName || '...'}
                </h4>
                <div className={styles.productGrid}>
                    {paginatedProducts.map((item) => {
                        const hasDiscount = item.discount > 0;
                        const discountedPrice = hasDiscount
                            ? item.price * (1 - item.discount / 100)
                            : item.price;

                        return (
                            <div key={item._id} className={styles.productCard}>
                                <div
                                    className={styles.productImg}
                                    style={{ backgroundImage: `url(${item.image})` }}
                                    onClick={() => router.push(`/products/${item._id}`)}
                                >
                                    {item.tag && (
                                        <Badge bg="success" className={styles.productBadge}>
                                            {item.tag}
                                        </Badge>
                                    )}
                                </div>
                                <div className="product-info text-center py-3">
                                    <h6 className="mb-1">{item.name}</h6>
                                    {hasDiscount ? (
                                        <p className="mb-0">
                                            <span className="text-danger fw-bold me-2">
                                                {formatPrice(discountedPrice)}
                                            </span>
                                            <del className="text-muted">{formatPrice(item.price)}</del>
                                        </p>
                                    ) : (
                                        <p className="text-muted mb-0">{formatPrice(item.price)}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {renderPagination()}
            </Container>
        </section>
    );
}
