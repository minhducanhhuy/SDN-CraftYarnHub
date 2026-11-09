import React from 'react';
import { Card, Tag, Typography, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const { Title, Paragraph } = Typography;

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    message.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price || 0);

  return (
    <Card
      hoverable
      className="hover-card"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      cover={
        <Link to={`/accessories/${product._id}`} style={{ display: 'block' }}>
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
              onMouseOver={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.08)')}
              onMouseOut={(e) => ((e.target as HTMLElement).style.transform = 'scale(1)')}
            />
            <Tag
              color={product.stock_status === 'Còn hàng' ? 'success' : 'warning'}
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                borderRadius: '999px',
                fontWeight: 700,
                border: 'none',
                padding: '2px 10px',
              }}
            >
              {product.stock_status || 'Còn hàng'}
            </Tag>
          </div>
        </Link>
      }
      bodyStyle={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <div>
        <Link to={`/accessories/${product._id}`} style={{ textDecoration: 'none' }}>
          <Title
            level={4}
            style={{
              fontSize: '16px',
              marginBottom: '6px',
              color: '#2c1810',
              lineHeight: 1.3,
              cursor: 'pointer',
            }}
          >
            {product.name}
          </Title>
        </Link>
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ color: '#777', fontSize: '13px', marginBottom: '8px' }}
        >
          {product.short_desc || product.description}
        </Paragraph>
      </div>

      <div>
        <div style={{ margin: '10px 0' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#e11d48' }}>
            {formattedPrice}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span
              style={{
                marginLeft: '8px',
                fontSize: '12px',
                textDecoration: 'line-through',
                color: '#aaa',
              }}
            >
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.original_price)}
            </span>
          )}
        </div>

        <Button
          type="primary"
          block
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          style={{ borderRadius: '999px' }}
        >
          Thêm Vào Giỏ
        </Button>
      </div>
    </Card>
  );
};


