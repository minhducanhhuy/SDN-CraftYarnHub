import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Tabs, Spin, Empty } from 'antd';
import { SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Product, Category } from '../types';
import { productsService } from '../services/products.service';
import { categoriesService } from '../services/categories.service';
import { ProductCard } from '../components/ProductCard';

const { Title, Text } = Typography;

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    categoriesService.getAll('product').then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productsService.getAll({
          category: activeTab !== 'all' ? activeTab : undefined,
          search: search || undefined,
        });
        if (res.success) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Lỗi khi tải phụ kiện:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProducts();
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTab, search]);

  const tabItems = [
    { key: 'all', label: 'Tất Cả Sản Phẩm' },
    ...categories.map((c) => ({
      key: c.slug,
      label: `${c.icon || ''} ${c.name}`,
    })),
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <Title level={1} style={{ color: '#d81b60', fontSize: '32px', marginBottom: '8px' }}>
          Phụ Kiện & Dụng Cụ Móc Len 🛍️
        </Title>
        <Text style={{ color: '#666', fontSize: '16px' }}>
          Tất cả những gì bạn cần để tạo ra những tác phẩm len thủ công hoàn mỹ
        </Text>
      </div>

      {/* Tabs & Search */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '16px 24px',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #ffe4e6',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={tabItems}
          style={{ flex: 1, minWidth: '280px', marginBottom: 0 }}
        />

        <Input
          placeholder="Tìm tên phụ kiện..."
          prefix={<SearchOutlined style={{ color: '#ff6584' }} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ width: '240px', borderRadius: '999px' }}
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px', color: '#888' }}>Đang nạp sản phẩm từ MongoDB...</div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Empty description="Không tìm thấy sản phẩm nào" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

