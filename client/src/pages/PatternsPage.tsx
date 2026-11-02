import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Select, Tag, Spin, Empty, Button } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { Pattern, Category } from '../types';
import { patternsService } from '../services/patterns.service';
import { categoriesService } from '../services/categories.service';
import { PatternCard } from '../components/PatternCard';

const { Title, Text } = Typography;
const { Option } = Select;

export const PatternsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Load danh mục từ Backend
  useEffect(() => {
    categoriesService.getAll('pattern').then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  // Load danh sách Patterns khi filter thay đổi
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        setLoading(true);
        const res = await patternsService.getAll({
          q: search || undefined,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          difficulty: selectedDifficulty !== 'all' ? selectedDifficulty : undefined,
        });
        if (res.success) {
          setPatterns(res.data);
        }
      } catch (err) {
        console.error('Lỗi khi tải kho chart:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPatterns();
    }, 250);

    return () => clearTimeout(timer);
  }, [search, selectedCategory, selectedDifficulty]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchParams({});
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <Title level={1} style={{ color: '#d81b60', fontSize: '32px', marginBottom: '8px' }}>
          Kho Chart Móc Len Miễn Phí 🧶
        </Title>
        <Text style={{ color: '#666', fontSize: '16px' }}>
          Tuyển tập các mẫu móc len chi tiết từng bước, từ thú bông amigurumi đến hoa quả dễ thương
        </Text>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid #ffe4e6',
          marginBottom: '32px',
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={10}>
            <Input
              size="large"
              placeholder="Tìm theo tên chart hoặc nguyên liệu (VD: Súp lơ, Cotton)..."
              prefix={<SearchOutlined style={{ color: '#ff6584' }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              style={{ borderRadius: '12px' }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            >
              <Option value="all">Tất cả danh mục</Option>
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.icon} {c.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col xs={12} md={5}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={selectedDifficulty}
              onChange={(val) => setSelectedDifficulty(val)}
            >
              <Option value="all">Tất cả độ khó</Option>
              <Option value="Dễ">Độ khó: Dễ</Option>
              <Option value="Vừa">Độ khó: Vừa</Option>
              <Option value="Khó">Độ khó: Khó</Option>
            </Select>
          </Col>

          <Col xs={24} md={3} style={{ textAlign: 'right' }}>
            <Button
              block
              size="large"
              icon={<ClearOutlined />}
              onClick={handleResetFilters}
              style={{ borderRadius: '12px' }}
            >
              Đặt Lại
            </Button>
          </Col>
        </Row>
      </div>

      {/* Pattern Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px', color: '#888' }}>Đang nạp chart từ MongoDB...</div>
        </div>
      ) : patterns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Empty description="Không tìm thấy mẫu chart nào phù hợp với bộ lọc của bạn" />
          <Button
            type="primary"
            onClick={handleResetFilters}
            style={{ marginTop: '16px', borderRadius: '999px' }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '16px', color: '#888', fontSize: '14px' }}>
            Tìm thấy <strong>{patterns.length}</strong> mẫu chart:
          </div>
          <Row gutter={[24, 24]}>
            {patterns.map((pat) => (
              <Col xs={24} sm={12} md={6} key={pat._id}>
                <PatternCard pattern={pat} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

