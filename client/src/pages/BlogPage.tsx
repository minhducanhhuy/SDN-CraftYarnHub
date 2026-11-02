import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Tag, Spin, Button } from 'antd';
import { BookOutlined, ClockCircleOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Blog } from '../types';
import { blogsService } from '../services/blogs.service';

const { Title, Paragraph, Text } = Typography;

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsService.getAll().then((res) => {
      if (res.success) setBlogs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1} style={{ color: '#d81b60', fontSize: '32px', marginBottom: '8px' }}>
          Chuyện Của Len & Mẹo Hay 📖
        </Title>
        <Text style={{ color: '#666', fontSize: '16px' }}>
          Góc tâm tình, chia sẻ kỹ thuật đan móc và cách bảo quản len sợi từ các tín đồ handmade
        </Text>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 32]}>
          {blogs.map((blog) => (
            <Col xs={24} md={12} lg={6} key={blog._id}>
              <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  className="hover-card"
                  cover={
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                  style={{
                    borderRadius: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  bodyStyle={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                      <Tag color="pink" style={{ borderRadius: '999px', fontWeight: 600 }}>
                        {blog.category}
                      </Tag>
                      <span style={{ fontSize: '12px', color: '#888' }}>
                        <ClockCircleOutlined /> {blog.read_time}
                      </span>
                    </div>

                    <Title level={4} style={{ fontSize: '16px', lineHeight: 1.4, color: '#33272a' }}>
                      {blog.title}
                    </Title>

                    <Paragraph ellipsis={{ rows: 2 }} style={{ color: '#666', fontSize: '13px' }}>
                      {blog.excerpt}
                    </Paragraph>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #fce7f3',
                      paddingTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#ff6584',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    <span>{blog.author}</span>
                    <ArrowRightOutlined />
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

