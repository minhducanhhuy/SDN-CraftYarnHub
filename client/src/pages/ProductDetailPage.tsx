import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Card,
  Spin,
  InputNumber,
  message,
  Divider,
  Space,
} from 'antd';
import {
  ShoppingCartOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productsService } from '../services/products.service';
import { useCart } from '../context/CartContext';

const { Title, Paragraph, Text } = Typography;

const FALLBACK_PRODUCT_IMG =
  'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productsService.getById(id);
        if (res.success) {
          setProduct(res.data);
        }
      } catch (err) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    message.success(`Đã thêm ${quantity} x "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px', color: '#888' }}>Đang nạp chi tiết sản phẩm...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Title level={3}>Không tìm thấy sản phẩm này</Title>
        <Link to="/accessories">
          <Button type="primary">Quay lại danh sách Phụ kiện</Button>
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  const formattedOriginalPrice = product.original_price
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(product.original_price)
    : null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/accessories">
          <Button icon={<ArrowLeftOutlined />} type="text" style={{ color: '#d81b60', fontWeight: 600 }}>
            Quay lại danh mục Phụ Kiện
          </Button>
        </Link>
      </div>

      <Card
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #ffe4e6',
        }}
      >
        <Row gutter={[36, 36]}>
          {/* Product Image */}
          <Col xs={24} md={11}>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                height: '420px',
                border: '1px solid #fce7f3',
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PRODUCT_IMG;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Col>

          {/* Product Details */}
          <Col xs={24} md={13}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Tag color="cyan" style={{ borderRadius: '999px', fontWeight: 600, padding: '3px 12px' }}>
                {product.category?.name || 'Phụ kiện'}
              </Tag>
              <Tag
                color={product.stock_status === 'Còn hàng' ? 'green' : 'orange'}
                style={{ borderRadius: '999px', fontWeight: 600, padding: '3px 12px' }}
              >
                {product.stock_status}
              </Tag>
            </div>

            <Title level={1} style={{ fontSize: '26px', color: '#2c1810', marginBottom: '12px' }}>
              {product.name}
            </Title>

            <Paragraph style={{ color: '#666', fontSize: '15px', lineHeight: 1.6 }}>
              {product.short_desc}
            </Paragraph>

            {/* Price Box */}
            <div
              style={{
                background: '#fff0f3',
                padding: '16px 20px',
                borderRadius: '16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '30px', fontWeight: 800, color: '#e11d48' }}>
                {formattedPrice}
              </span>
              {formattedOriginalPrice && product.original_price > product.price && (
                <span
                  style={{
                    fontSize: '16px',
                    textDecoration: 'line-through',
                    color: '#999',
                  }}
                >
                  {formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <Text strong style={{ fontSize: '15px' }}>Số lượng:</Text>
              <InputNumber
                min={1}
                max={99}
                value={quantity}
                onChange={(val) => setQuantity(val || 1)}
                style={{ width: '80px', borderRadius: '8px' }}
              />
            </div>

            {/* Action Buttons */}
            <Space size={16} style={{ marginBottom: '28px', flexWrap: 'wrap' }}>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                style={{
                  height: '48px',
                  padding: '0 28px',
                  borderRadius: '999px',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                  border: 'none',
                }}
              >
                Thêm Vào Giỏ
              </Button>

              <Button
                size="large"
                icon={<ThunderboltOutlined />}
                onClick={handleBuyNow}
                style={{
                  height: '48px',
                  padding: '0 28px',
                  borderRadius: '999px',
                  fontSize: '16px',
                  borderColor: '#ff758c',
                  color: '#d81b60',
                  fontWeight: 600,
                }}
              >
                Mua Ngay
              </Button>
            </Space>

            <Divider style={{ margin: '16px 0' }} />

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#555', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#10b981' }} />
                <span>Cam kết len sợi loại 1, mềm mại, chuẩn màu như hình chụp</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SafetyCertificateOutlined style={{ color: '#3b82f6' }} />
                <span>Hỗ trợ đổi trả trong 7 ngày nếu lỗi từ nhà sản xuất</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Detailed Description */}
        <div style={{ marginTop: '36px', borderTop: '1px solid #fce7f3', paddingTop: '24px' }}>
          <Title level={4} style={{ color: '#d81b60', marginBottom: '12px' }}>
            📝 Mô Tả Chi Tiết Sản Phẩm
          </Title>
          <Paragraph style={{ color: '#444', fontSize: '15px', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {product.description || product.short_desc}
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};
