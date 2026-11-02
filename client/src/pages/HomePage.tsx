import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Carousel, Button, Card, Spin, Space } from 'antd';
import {
  ClockCircleOutlined,
  HeartOutlined,
  BookOutlined,
  CompassOutlined,
  ArrowRightOutlined,
  FireOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Pattern, Product, Blog } from '../types';
import { patternsService } from '../services/patterns.service';
import { productsService } from '../services/products.service';
import { blogsService } from '../services/blogs.service';
import { PatternCard } from '../components/PatternCard';
import { ProductCard } from '../components/ProductCard';

const { Title, Text, Paragraph } = Typography;

export const HomePage: React.FC = () => {
  const [featuredPatterns, setFeaturedPatterns] = useState<Pattern[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patternsRes, productsRes, blogsRes] = await Promise.all([
          patternsService.getFeatured(),
          productsService.getAll(),
          blogsService.getAll(),
        ]);
        if (patternsRes.success) setFeaturedPatterns(patternsRes.data);
        if (productsRes.success) setFeaturedProducts(productsRes.data.slice(0, 4));
        if (blogsRes.success) setFeaturedBlogs(blogsRes.data.slice(0, 3));
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu trang chủ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bannerSlides = [
    {
      id: 1,
      image: '/3f78cdfb16a1f07c403b76466a29e740.jpg',
      title: 'Bí Mật Chúng Mình',
      subtitle: 'Nơi những sợi len biết kể câu chuyện tình ấm áp của bạn',
      cta: 'Khám Phá Kho Chart Miễn Phí',
      link: '/patterns',
    },
    {
      id: 2,
      image: '/f00fca8f160bd9af51c851a4c6f63b58.jpg',
      title: 'Quà Tặng Handmade',
      subtitle: 'Gửi gắm ngàn yêu thương qua từng mũi móc đan xen tỉ mỉ',
      cta: 'Xem Phụ Kiện & Dụng Cụ',
      link: '/accessories',
    },
    {
      id: 3,
      image: '/61332c7c7ae6299b398a78dc8c4d5559.jpg',
      title: 'Chuyện Của Len',
      subtitle: 'Nơi chia sẻ mẹo vặt, kỹ thuật gỡ rối sợi len cho tân thủ',
      cta: 'Đọc Chuyện Của Len',
      link: '/blog',
    },
  ];

  const features = [
    {
      icon: <ClockCircleOutlined style={{ fontSize: '32px', color: '#ff6584' }} />,
      title: 'Bấm Giờ & Định Giá ⏱️',
      desc: 'Theo dõi thời gian hoàn thiện từng sản phẩm và tính toán giá thành phẩm tối ưu.',
    },
    {
      icon: <HeartOutlined style={{ fontSize: '32px', color: '#10b981' }} />,
      title: 'Đếm Hàng Chuẩn Bíp 🪄',
      desc: 'Trợ lý đếm hàng có âm thanh bíp pop giúp bạn không bao giờ móc nhầm số dòng.',
    },
    {
      icon: <BookOutlined style={{ fontSize: '32px', color: '#f59e0b' }} />,
      title: 'Dịch Hóa Thuật Ngữ 📚',
      desc: 'Chuyển đổi tức thì ký hiệu chart chuẩn Việt (X, A, V, T) sang chuẩn US (sc, inc, dec).',
    },
    {
      icon: <CompassOutlined style={{ fontSize: '32px', color: '#8b5cf6' }} />,
      title: 'Từ Điển Mũi Móc 📖',
      desc: 'Tra cứu cách cầm kim và thao tác mũi móc cơ bản cho người mới bắt đầu.',
    },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero Carousel */}
      <div
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '48px',
          boxShadow: '0 12px 32px rgba(255, 101, 132, 0.15)',
        }}
      >
        <Carousel autoplay effect="fade">
          {bannerSlides.map((slide) => (
            <div key={slide.id}>
              <div
                style={{
                  position: 'relative',
                  height: '420px',
                  display: 'flex',
                  alignItems: 'center',
                  background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.5)), url(${slide.image}) center/cover no-repeat`,
                }}
              >
                <div style={{ padding: '0 48px', maxWidth: '650px', color: '#fff' }}>
                  <Title
                    level={1}
                    style={{
                      color: '#fff',
                      fontSize: '38px',
                      marginBottom: '12px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    }}
                  >
                    {slide.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: '#fdf2f8',
                      fontSize: '18px',
                      marginBottom: '24px',
                      lineHeight: 1.6,
                    }}
                  >
                    {slide.subtitle}
                  </Paragraph>
                  <Link to={slide.link}>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        height: '48px',
                        padding: '0 28px',
                        fontSize: '16px',
                        borderRadius: '999px',
                      }}
                    >
                      {slide.cta} <ArrowRightOutlined />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Feature Highlights */}
      <div style={{ marginBottom: '56px' }}>
        <Row gutter={[24, 24]}>
          {features.map((f, idx) => (
            <Col xs={24} sm={12} md={6} key={idx}>
              <Card
                className="hover-card"
                style={{
                  borderRadius: '20px',
                  height: '100%',
                  textAlign: 'center',
                  padding: '12px',
                  background: '#ffffff',
                }}
              >
                <div style={{ marginBottom: '14px' }}>{f.icon}</div>
                <Title level={4} style={{ fontSize: '17px', marginBottom: '8px' }}>
                  {f.title}
                </Title>
                <Text style={{ color: '#777', fontSize: '13px', lineHeight: 1.6 }}>
                  {f.desc}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Featured Patterns Section */}
      <div style={{ marginBottom: '56px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                fontSize: '26px',
                color: '#d81b60',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FireOutlined style={{ color: '#ff476e' }} /> Mẫu Chart Nổi Bật
            </Title>
            <Text style={{ color: '#888' }}>
              Những mẫu chart móc len được cộng đồng yêu thích nhất
            </Text>
          </div>
          <Link to="/patterns">
            <Button type="link" style={{ color: '#ff6584', fontWeight: 700, fontSize: '15px' }}>
              Xem tất cả ({featuredPatterns.length}) <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {featuredPatterns.map((pat) => (
              <Col xs={24} sm={12} md={6} key={pat._id}>
                <PatternCard pattern={pat} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Featured Products / Accessories Section */}
      <div style={{ marginBottom: '56px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                fontSize: '26px',
                color: '#d81b60',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShoppingOutlined style={{ color: '#10b981' }} /> Phụ Kiện & Dụng Cụ Móc Len
            </Title>
            <Text style={{ color: '#888' }}>
              Len sợi cao cấp, kim móc cán dẻo và phụ kiện nhồi thú
            </Text>
          </div>
          <Link to="/accessories">
            <Button type="link" style={{ color: '#ff6584', fontWeight: 700, fontSize: '15px' }}>
              Xem phụ kiện <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {featuredProducts.map((prod) => (
              <Col xs={24} sm={12} md={6} key={prod._id}>
                <ProductCard product={prod} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Blog & Tips Section */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                fontSize: '26px',
                color: '#d81b60',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <BookOutlined style={{ color: '#f59e0b' }} /> Cẩm Nang & Mẹo Đan Móc
            </Title>
            <Text style={{ color: '#888' }}>
              Bỏ túi những kinh nghiệm quý giá từ các thợ móc len điêu luyện
            </Text>
          </div>
          <Link to="/blog">
            <Button type="link" style={{ color: '#ff6584', fontWeight: 700, fontSize: '15px' }}>
              Đọc thêm bài viết <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        <Row gutter={[24, 24]}>
          {featuredBlogs.map((b) => (
            <Col xs={24} md={8} key={b._id}>
              <Link to={`/blog/${b.slug}`} style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  className="hover-card"
                  cover={
                    <img
                      src={b.image_url}
                      alt={b.title}
                      style={{ height: '190px', objectFit: 'cover' }}
                    />
                  }
                  style={{ borderRadius: '20px', height: '100%' }}
                >
                  <div style={{ fontSize: '12px', color: '#ff6584', fontWeight: 700, marginBottom: '6px' }}>
                    {b.category} • {b.read_time}
                  </div>
                  <Title level={4} style={{ fontSize: '16px', lineHeight: 1.4, color: '#33272a' }}>
                    {b.title}
                  </Title>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ color: '#777', fontSize: '13px' }}>
                    {b.excerpt}
                  </Paragraph>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

