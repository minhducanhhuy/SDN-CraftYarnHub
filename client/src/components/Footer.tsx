import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { HeartFilled, InstagramOutlined, FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#fff',
        borderTop: '1px solid #ffe4e6',
        marginTop: '60px',
        padding: '50px 30px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Space direction="vertical" size={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartFilled style={{ color: '#ff6584', fontSize: '24px' }} />
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#d81b60',
                    fontFamily: 'Quicksand, sans-serif',
                  }}
                >
                  Tiệm Len Xinh
                </span>
              </div>
              <Paragraph style={{ color: '#666', lineHeight: 1.7 }}>
                Lưu giữ đam mê trong từng vòng ma thuật. Nơi chia sẻ các mẫu chart móc len miễn phí, phụ kiện đan len chất lượng và công cụ đếm dòng tiện ích.
              </Paragraph>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Title level={5} style={{ color: '#d81b60', marginBottom: '16px' }}>
              Khám Phá
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/patterns" style={{ color: '#666', textDecoration: 'none' }}>
                Kho Chart Móc Len
              </Link>
              <Link to="/accessories" style={{ color: '#666', textDecoration: 'none' }}>
                Phụ Kiện & Len Sợi
              </Link>
              <Link to="/blog" style={{ color: '#666', textDecoration: 'none' }}>
                Chuyện Của Len
              </Link>
              <Link to="/cart" style={{ color: '#666', textDecoration: 'none' }}>
                Giỏ Hàng
              </Link>
            </div>
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Title level={5} style={{ color: '#d81b60', marginBottom: '16px' }}>
              Học Phần SDN302
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#666', fontSize: '13px' }}>
              <div>• Mô hình: Client - Server</div>
              <div>• Frontend: React + Vite</div>
              <div>• Backend: NestJS REST API</div>
              <div>• Database: MongoDB + Mongoose</div>
              <div>• FPT University 2026</div>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#d81b60', marginBottom: '16px' }}>
              Kết Nối Cùng Chúng Mình
            </Title>
            <Paragraph style={{ color: '#666' }}>
              Tham gia cộng đồng đan móc để học hỏi kinh nghiệm và chia sẻ thành phẩm bạn nhé!
            </Paragraph>
            <Space size={16}>
              <a href="#" style={{ fontSize: '24px', color: '#ff6584' }}>
                <FacebookOutlined />
              </a>
              <a href="#" style={{ fontSize: '24px', color: '#ff6584' }}>
                <InstagramOutlined />
              </a>
              <a href="#" style={{ fontSize: '24px', color: '#ff6584' }}>
                <YoutubeOutlined />
              </a>
            </Space>
          </Col>
        </Row>

        <div
          style={{
            borderTop: '1px solid #fce7f3',
            marginTop: '40px',
            paddingTop: '20px',
            textAlign: 'center',
            color: '#888',
            fontSize: '13px',
          }}
        >
          © 2026 Tiệm Len Xinh. Đồ án môn học SDN302 - Server-side Development with NodeJS, Express & MongoDB.
        </div>
      </div>
    </footer>
  );
};
