import React, { useEffect, useState } from 'react';
import { Typography, Card, Tag, Spin, Button, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, UserOutlined, EyeOutlined, HomeOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { Blog } from '../types';
import { blogsService } from '../services/blogs.service';

const { Title, Paragraph } = Typography;

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    blogsService.getBySlugOrId(slug).then((res) => {
      if (res.success) setBlog(res.data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Title level={3}>Không tìm thấy bài viết này</Title>
        <Link to="/blog">
          <Button type="primary">Quay lại danh sách bài viết</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined /> Trang chủ
                </Link>
              ),
            },
            {
              title: <Link to="/blog">Chuyện Của Len</Link>,
            },
            {
              title: blog.title,
            },
          ]}
        />
        <Link to="/blog">
          <Button icon={<ArrowLeftOutlined />} type="text" style={{ color: '#d81b60', fontWeight: 600 }}>
            Quay lại trang Blog
          </Button>
        </Link>
      </div>

      <Card
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #ffe4e6',
        }}
      >
        <Tag color="magenta" style={{ borderRadius: '999px', fontWeight: 600, marginBottom: '12px' }}>
          {blog.category}
        </Tag>

        <Title level={1} style={{ fontSize: '30px', color: '#2c1810', lineHeight: 1.3, marginBottom: '16px' }}>
          {blog.title}
        </Title>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#888',
            fontSize: '14px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #fce7f3',
            flexWrap: 'wrap',
          }}
        >
          <span><UserOutlined /> {blog.author}</span>
          <span>•</span>
          <span><ClockCircleOutlined /> {blog.read_time}</span>
          <span>•</span>
          <span><EyeOutlined /> {blog.views || 0} lượt xem</span>
        </div>

        <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '28px' }}>
          <img
            src={blog.image_url}
            alt={blog.title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>

        <Paragraph style={{ fontSize: '18px', fontWeight: 500, color: '#4a3b32', lineHeight: 1.8, marginBottom: '20px' }}>
          {blog.excerpt}
        </Paragraph>

        <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
          {blog.content}
        </Paragraph>
      </Card>
    </div>
  );
};


