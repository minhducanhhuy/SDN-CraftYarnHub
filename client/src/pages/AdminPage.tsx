import React, { useEffect, useState } from 'react';
import {
  Typography,
  Tabs,
  Table,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Tooltip,
  Avatar,
  Alert,
} from 'antd';
import {
  ShoppingOutlined,
  ReadOutlined,
  InboxOutlined,
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  CheckOutlined,
  CloseOutlined,
  LockOutlined,
  UserOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/orders.service';
import { patternsService } from '../services/patterns.service';
import { productsService } from '../services/products.service';
import { categoriesService } from '../services/categories.service';
import { authService, AdminUser } from '../services/auth.service';
import { Order, Pattern, Product, Category } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export const AdminPage: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => authService.getCurrentUser());
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm] = Form.useForm();

  // Tab 1: patterns, Tab 2: products, Tab 3: orders
  const [activeTab, setActiveTab] = useState('patterns');

  // State data
  const [orders, setOrders] = useState<Order[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Thống kê từ API /api/orders/stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    totalRevenue: 0,
    totalPatterns: 0,
    totalProducts: 0,
    totalBlogs: 0,
  });

  // Modal Thêm Chart
  const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
  const [patternForm] = Form.useForm();

  // Modal Thêm Sản Phẩm
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm] = Form.useForm();

  // Modal Sửa Giá Sản Phẩm Nhanh
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // Modal Chi tiết Đơn hàng
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersRes, patternsRes, productsRes, catsRes, statsRes] = await Promise.all([
        ordersService.getAll(),
        patternsService.getAll(),
        productsService.getAll(),
        categoriesService.getAll(),
        ordersService.getStats().catch(() => null),
      ]);

      if (ordersRes.success) setOrders(ordersRes.data);
      if (patternsRes.success) setPatterns(patternsRes.data);
      if (productsRes.success) setProducts(productsRes.data);
      if (catsRes.success) setCategories(catsRes.data);
      if (statsRes?.success) {
        setStats(statsRes.data);
      } else {
        setStats({
          totalOrders: ordersRes.data?.length || 0,
          newOrders: ordersRes.data?.filter((o: Order) => o.status === 'Chờ xác nhận').length || 0,
          totalRevenue: ordersRes.data?.reduce((sum: number, o: Order) => sum + (o.total_amount || 0), 0) || 0,
          totalPatterns: patternsRes.data?.length || 0,
          totalProducts: productsRes.data?.length || 0,
          totalBlogs: 4,
        });
      }
    } catch (err) {
      console.error(err);
      message.error('Lỗi khi tải dữ liệu quản trị');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Xử lý đăng nhập Admin
  const handleLogin = async (values: any) => {
    try {
      setLoginLoading(true);
      const res = await authService.login({
        username: values.username,
        password: values.password,
      });
      if (res.success) {
        message.success(`Chào mừng ${res.data.user.full_name} đã đăng nhập thành công!`);
        setIsAuthenticated(true);
        setCurrentUser(res.data.user);
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác';
      message.error(errMsg);
    } finally {
      setLoginLoading(false);
    }
  };

  // Điền nhanh tài khoản demo
  const handleFillDemo = () => {
    loginForm.setFieldsValue({
      username: 'admin',
      password: 'admin123',
    });
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    message.info('Đã đăng xuất khỏi tài khoản quản trị viên');
  };

  // Xử lý cập nhật trạng thái đơn hàng (Duyệt đơn)
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await ordersService.updateStatus(id, newStatus);
      if (res.success) {
        message.success(`Đã cập nhật trạng thái đơn: "${newStatus}"`);
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus as any } : o))
        );
        loadData();
      }
    } catch (err) {
      message.error('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  // Xóa đơn hàng
  const handleDeleteOrder = async (id: string) => {
    try {
      await ordersService.delete(id);
      message.success('Đã xóa đơn hàng');
      setOrders((prev) => prev.filter((o) => o._id !== id));
      loadData();
    } catch (err) {
      message.error('Không thể xóa đơn hàng');
    }
  };

  // Thêm mới Chart
  const handleCreatePattern = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        category: values.category,
        difficulty: values.difficulty,
        difficulty_stars: values.difficulty === 'Dễ' ? 2 : values.difficulty === 'Vừa' ? 3 : 5,
        image_url: values.image_url,
        description: values.description,
        materials: values.materials ? values.materials.split(',').map((s: string) => s.trim()) : ['Len sợi', 'Bông gòn'],
        tools: ['Kim móc', 'Kéo cắt chỉ'],
        content: {
          'Đầu / Thân': ['R1: MR 6X (6)', 'R2: 6V (12)', 'R3: (1X, 1V)*6 (18)'],
        },
        author: values.author || currentUser?.full_name || 'Admin Tiệm Len',
      };
      const res = await patternsService.create(payload);
      if (res.success) {
        message.success('Thêm mới Chart móc len thành công!');
        setIsPatternModalOpen(false);
        patternForm.resetFields();
        loadData();
      }
    } catch (err) {
      message.error('Lỗi khi thêm Chart');
    }
  };

  // Xóa Chart
  const handleDeletePattern = async (id: string) => {
    try {
      await patternsService.delete(id);
      message.success('Đã xóa Chart thành công');
      setPatterns((prev) => prev.filter((p) => p._id !== id));
      loadData();
    } catch (err) {
      message.error('Không thể xóa Chart');
    }
  };

  // Thêm mới Sản phẩm
  const handleCreateProduct = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        category: values.category,
        price: Number(values.price),
        original_price: Number(values.price) * 1.2,
        image_url: values.image_url,
        stock_status: values.stock_status,
        description: values.description,
      };
      const res = await productsService.create(payload);
      if (res.success) {
        message.success('Thêm mới phụ kiện thành công!');
        setIsProductModalOpen(false);
        productForm.resetFields();
        loadData();
      }
    } catch (err) {
      message.error('Lỗi khi thêm sản phẩm');
    }
  };

  // Cập nhật giá sản phẩm nhanh
  const handleSaveProductPrice = async () => {
    if (!editingProduct) return;
    try {
      const res = await productsService.update(editingProduct._id, { price: editPrice });
      if (res.success) {
        message.success(`Đã cập nhật giá mới: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(editPrice)}`);
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? { ...p, price: editPrice } : p))
        );
        setEditingProduct(null);
      }
    } catch (err) {
      message.error('Lỗi khi cập nhật giá');
    }
  };

  // Đổi trạng thái kho nhanh (Còn hàng / Hết hàng)
  const handleToggleStockStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Còn hàng' ? 'Hết hàng' : 'Còn hàng';
    try {
      const res = await productsService.update(id, { stock_status: nextStatus });
      if (res.success) {
        message.success(`Đã đổi trạng thái kho thành "${nextStatus}"`);
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, stock_status: nextStatus } : p))
        );
      }
    } catch (err) {
      message.error('Lỗi khi cập nhật trạng thái kho');
    }
  };

  // Xóa Sản phẩm
  const handleDeleteProduct = async (id: string) => {
    try {
      await productsService.delete(id);
      message.success('Đã xóa sản phẩm thành công');
      setProducts((prev) => prev.filter((p) => p._id !== id));
      loadData();
    } catch (err) {
      message.error('Không thể xóa sản phẩm');
    }
  };

  // ================= NẾU CHƯA ĐĂNG NHẬP: HIỂN THỊ MÀN HÌNH LOGIN =================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          background: 'linear-gradient(135deg, #fff0f5 0%, #fffbf0 100%)',
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '460px',
            borderRadius: '24px',
            boxShadow: '0 12px 32px rgba(255, 105, 180, 0.15)',
            border: '1px solid #ffd6e0',
            padding: '16px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(255, 117, 140, 0.35)',
              }}
            >
              <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#fff' }} />
            </div>

            <Title level={2} style={{ color: '#d81b60', marginBottom: '6px', fontSize: '24px' }}>
              Đăng Nhập Quản Trị Hệ Thống
            </Title>
            <Text style={{ color: '#777', fontSize: '14px' }}>
              Cổng quản lý tập trung dành riêng cho Admin Tiệm Len Xinh (CraftYarnHub)
            </Text>
          </div>

          <Alert
            message="Tài khoản Quản Trị Viên (Demo)"
            description={
              <div>
                <div>• Tên đăng nhập: <strong>admin</strong></div>
                <div>• Mật khẩu: <strong>admin123</strong></div>
                <Button
                  size="small"
                  type="link"
                  onClick={handleFillDemo}
                  style={{ padding: 0, marginTop: '4px', fontWeight: 600, color: '#d81b60' }}
                >
                  👉 Bấm vào đây để tự động điền tài khoản mẫu
                </Button>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '12px', background: '#fff5f7', border: '1px solid #fed7aa' }}
          />

          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{ username: '', password: '' }}
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined style={{ color: '#ff758c' }} />}
                placeholder="Nhập username (admin)"
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu bảo mật"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined style={{ color: '#ff758c' }} />}
                placeholder="Nhập mật khẩu (admin123)"
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loginLoading}
              style={{
                borderRadius: '999px',
                height: '46px',
                fontSize: '16px',
                fontWeight: 700,
                marginTop: '12px',
                background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                borderColor: '#ff758c',
              }}
            >
              Đăng Nhập Quản Trị
            </Button>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ color: '#888', fontSize: '13px' }}>
              <HomeOutlined /> Quay về trang chủ cửa hàng
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // ================= BẢNG 1: QUẢN LÝ CHART =================
  const patternColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 70,
      render: (url: string) => (
        <img
          src={url}
          alt="chart"
          style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/patterns/chau-cay-huong-duong.jpg';
          }}
        />
      ),
    },
    {
      title: 'Tên mẫu Chart',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Danh mục',
      key: 'category',
      render: (_: any, r: Pattern) => <Tag color="pink">{r.category?.name || 'Móc len'}</Tag>,
    },
    {
      title: 'Độ khó',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (d: string) => (
        <Tag color={d === 'Dễ' ? 'green' : d === 'Vừa' ? 'gold' : 'red'}>{d}</Tag>
      ),
    },
    {
      title: 'Lượt xem & Thích',
      key: 'stats',
      render: (_: any, r: Pattern) => (
        <span style={{ fontSize: '13px', color: '#666' }}>
          👁 {r.view_count || 0} xem • ❤️ {r.likes || 0} tim
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, r: Pattern) => (
        <Popconfirm
          title="Xác nhận xóa mẫu Chart này khỏi hệ thống?"
          onConfirm={() => handleDeletePattern(r._id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button size="small" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // ================= BẢNG 2: QUẢN LÝ PHỤ KIỆN =================
  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 70,
      render: (url: string) => (
        <img
          src={url}
          alt="prod"
          style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/products/len-milk-bo.jpg';
          }}
        />
      ),
    },
    {
      title: 'Tên phụ kiện / len',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Danh mục',
      key: 'category',
      render: (_: any, r: Product) => <Tag color="cyan">{r.category?.name || 'Phụ kiện'}</Tag>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (p: number, r: Product) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#e11d48', fontWeight: 700 }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)}
          </span>
          <Tooltip title="Cập nhật giá bán nhanh">
            <Button
              size="small"
              icon={<DollarOutlined />}
              onClick={() => {
                setEditingProduct(r);
                setEditPrice(r.price);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Tình trạng kho (Bấm để đổi)',
      dataIndex: 'stock_status',
      key: 'stock_status',
      render: (st: string, r: Product) => (
        <Tooltip title="Nhấp để đổi trạng thái Còn hàng / Hết hàng">
          <Button
            size="small"
            style={{
              borderColor: st === 'Còn hàng' ? '#52c41a' : '#ff4d4f',
              color: st === 'Còn hàng' ? '#52c41a' : '#ff4d4f',
              borderRadius: '999px',
              fontWeight: 600,
            }}
            onClick={() => handleToggleStockStatus(r._id, st)}
          >
            {st === 'Còn hàng' ? <CheckOutlined /> : <CloseOutlined />} {st || 'Còn hàng'}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, r: Product) => (
        <Popconfirm
          title="Xác nhận xóa sản phẩm này?"
          onConfirm={() => handleDeleteProduct(r._id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button size="small" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // ================= BẢNG 3: QUẢN LÝ ĐƠN HÀNG =================
  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'order_code',
      key: 'order_code',
      render: (text: string) => <Tag color="blue" style={{ fontWeight: 700 }}>{text}</Tag>,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, record: Order) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.customer_name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (val: number) => (
        <span style={{ color: '#e11d48', fontWeight: 700 }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: Order) => (
        <Select
          value={record.status}
          onChange={(val) => handleUpdateOrderStatus(record._id, val)}
          style={{ width: 140 }}
        >
          <Option value="Chờ xác nhận"><Tag color="orange">Chờ xác nhận</Tag></Option>
          <Option value="Đang xử lý"><Tag color="blue">Đang xử lý</Tag></Option>
          <Option value="Đã giao"><Tag color="green">Đã giao</Tag></Option>
          <Option value="Đã hủy"><Tag color="red">Đã hủy</Tag></Option>
        </Select>
      ),
    },
    {
      title: 'Thao tác & Duyệt đơn',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size={8}>
          {record.status === 'Chờ xác nhận' && (
            <Tooltip title="Duyệt đơn và chuyển sang trạng thái Đang xử lý">
              <Button
                type="primary"
                size="small"
                icon={<CheckCircleOutlined />}
                style={{ background: '#52c41a', borderColor: '#52c41a', borderRadius: '6px' }}
                onClick={() => handleUpdateOrderStatus(record._id, 'Đang xử lý')}
              >
                Duyệt đơn
              </Button>
            </Tooltip>
          )}

          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setSelectedOrder(record)}
          >
            Chi tiết
          </Button>

          <Popconfirm
            title="Xác nhận xóa đơn hàng này?"
            onConfirm={() => handleDeleteOrder(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Dashboard kèm Thông tin Admin & Đăng Xuất */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#fff',
          padding: '16px 20px',
          borderRadius: '20px',
          border: '1px solid #ffd6e0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        }}
      >
        <div>
          <Title level={2} style={{ color: '#d81b60', marginBottom: '2px', fontSize: '22px' }}>
            ⚙️ Cổng Quản Trị Hệ Thống (Admin Control Panel)
          </Title>
          <Text style={{ color: '#666', fontSize: '13px' }}>
            Quản trị tập trung Kho Chart móc len, Sản phẩm Phụ kiện & Duyệt Đơn hàng khách đặt
          </Text>
        </div>

        {/* Profile Admin & Nút Đăng Xuất */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar
              src={currentUser?.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin_master'}
              size={40}
              style={{ border: '2px solid #ff758c' }}
            />
            <div>
              <div style={{ fontWeight: 700, color: '#333', fontSize: '14px' }}>
                {currentUser?.full_name || 'Quản Trị Viên'}
              </div>
              <Tag color="magenta" style={{ fontSize: '11px', borderRadius: '4px', margin: 0 }}>
                {currentUser?.role?.toUpperCase() || 'ADMIN'}
              </Tag>
            </div>
          </div>

          <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading}>
            Làm mới
          </Button>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ borderRadius: '8px' }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* 4 Thống kê nhanh kết nối API /api/orders/stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #ffd6e0' }}>
            <Statistic
              title="Tổng Mẫu Chart"
              value={stats.totalPatterns}
              prefix={<ReadOutlined style={{ color: '#d81b60' }} />}
              valueStyle={{ color: '#d81b60', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #d1fae5' }}>
            <Statistic
              title="Tổng Phụ Kiện"
              value={stats.totalProducts}
              prefix={<InboxOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#10b981', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #fed7aa' }}>
            <Statistic
              title="Đơn Mới / Tổng Đơn"
              value={`${stats.newOrders} / ${stats.totalOrders}`}
              prefix={<ShoppingOutlined style={{ color: '#f97316' }} />}
              valueStyle={{ color: '#f97316', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e0e7ff' }}>
            <Statistic
              title="Tổng Doanh Thu"
              value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)}
              prefix={<DollarOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#6366f1', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs Quản Trị Theo Chuẩn 3 Tab */}
      <Card style={{ borderRadius: '20px', border: '1px solid #ffe4e6' }}>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={[
            // TAB 1: Quản lý Kho Chart
            {
              key: 'patterns',
              label: `🧶 Tab 1: Quản Lý Chart (${patterns.length})`,
              children: (
                <div>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">Bảng danh sách mẫu chart móc len từ MongoDB. Hỗ trợ xem, thêm mới và xóa.</Text>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsPatternModalOpen(true)}
                      style={{ borderRadius: '999px' }}
                    >
                      Thêm Mới Chart
                    </Button>
                  </div>
                  <Table
                    dataSource={patterns}
                    columns={patternColumns}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 800 }}
                  />
                </div>
              ),
            },

            // TAB 2: Quản lý Phụ Kiện
            {
              key: 'products',
              label: `🛍️ Tab 2: Quản Lý Phụ Kiện (${products.length})`,
              children: (
                <div>
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary">Bảng phụ kiện đan len. Hỗ trợ cập nhật nhanh giá tiền và đổi trạng thái Còn hàng / Hết hàng.</Text>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsProductModalOpen(true)}
                      style={{ borderRadius: '999px' }}
                    >
                      Thêm Phụ Kiện Mới
                    </Button>
                  </div>
                  <Table
                    dataSource={products}
                    columns={productColumns}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 800 }}
                  />
                </div>
              ),
            },

            // TAB 3: Quản lý Đơn Hàng
            {
              key: 'orders',
              label: `🛒 Tab 3: Quản Lý Đơn Hàng (${orders.length})`,
              children: (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text type="secondary">Danh sách đơn hàng khách vừa đặt từ giỏ hàng. Có nút bấm "Duyệt đơn" chuyển ngay sang Đang xử lý.</Text>
                  </div>
                  <Table
                    dataSource={orders}
                    columns={orderColumns}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: 800 }}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Modal Thêm Chart */}
      <Modal
        title="Thêm Mới Mẫu Chart Móc Len"
        open={isPatternModalOpen}
        onCancel={() => setIsPatternModalOpen(false)}
        footer={null}
      >
        <Form form={patternForm} layout="vertical" onFinish={handleCreatePattern}>
          <Form.Item name="name" label="Tên mẫu Chart" rules={[{ required: true, message: 'Nhập tên mẫu' }]}>
            <Input placeholder="Ví dụ: Bé Mèo Béo Quàng Khăn" />
          </Form.Item>

          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Chọn danh mục' }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="difficulty" label="Độ khó" initialValue="Dễ">
            <Select>
              <Option value="Dễ">Dễ</Option>
              <Option value="Vừa">Vừa</Option>
              <Option value="Khó">Khó</Option>
            </Select>
          </Form.Item>

          <Form.Item name="image_url" label="Link ảnh minh họa" rules={[{ required: true, message: 'Nhập link ảnh' }]}>
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="description" label="Mô tả mẫu">
            <Input.TextArea rows={2} placeholder="Mẫu móc len dễ thương cho người mới bắt đầu..." />
          </Form.Item>

          <Form.Item name="materials" label="Nguyên liệu (cách nhau bởi dấu phẩy)">
            <Input placeholder="Len milk bò 50g, Kim móc 2.5mm, Bông nhồi" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ borderRadius: '999px', marginTop: '12px' }}>
            Tạo Mẫu Chart
          </Button>
        </Form>
      </Modal>

      {/* Modal Thêm Sản Phẩm */}
      <Modal
        title="Thêm Phụ Kiện / Dụng Cụ Mới"
        open={isProductModalOpen}
        onCancel={() => setIsProductModalOpen(false)}
        footer={null}
      >
        <Form form={productForm} layout="vertical" onFinish={handleCreateProduct}>
          <Form.Item name="name" label="Tên phụ kiện" rules={[{ required: true, message: 'Nhập tên' }]}>
            <Input placeholder="Ví dụ: Set 9 Kim Móc Cán Dẻo" />
          </Form.Item>

          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Chọn danh mục' }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Giá bán (VNĐ)" rules={[{ required: true, message: 'Nhập giá' }]}>
            <InputNumber min={1000} style={{ width: '100%' }} placeholder="35000" />
          </Form.Item>

          <Form.Item name="stock_status" label="Tình trạng kho" initialValue="Còn hàng">
            <Select>
              <Option value="Còn hàng">Còn hàng</Option>
              <Option value="Hết hàng">Hết hàng</Option>
            </Select>
          </Form.Item>

          <Form.Item name="image_url" label="Link hình ảnh" rules={[{ required: true, message: 'Nhập link ảnh' }]}>
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="description" label="Mô tả sản phẩm">
            <Input.TextArea rows={2} placeholder="Chất liệu cao cấp, bảo vệ ngón tay khi móc lâu..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ borderRadius: '999px', marginTop: '12px' }}>
            Thêm Sản Phẩm
          </Button>
        </Form>
      </Modal>

      {/* Modal Sửa Giá Sản Phẩm Nhanh */}
      <Modal
        title={`Cập nhật giá bán: ${editingProduct?.name}`}
        open={!!editingProduct}
        onCancel={() => setEditingProduct(null)}
        onOk={handleSaveProductPrice}
        okText="Lưu giá mới"
        cancelText="Hủy"
      >
        <div style={{ padding: '16px 0' }}>
          <Text strong style={{ display: 'block', marginBottom: '8px' }}>Nhập giá bán mới (VNĐ):</Text>
          <InputNumber
            style={{ width: '100%' }}
            min={1000}
            step={5000}
            value={editPrice}
            onChange={(val) => setEditPrice(val || 0)}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, ''))}
          />
        </div>
      </Modal>

      {/* Modal Chi Tiết Đơn Hàng */}
      <Modal
        title={<span style={{ color: '#d81b60' }}>Chi Tiết Đơn Hàng: {selectedOrder?.order_code}</span>}
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div>
            <div style={{ marginBottom: '16px', background: '#fff9fa', padding: '16px', borderRadius: '12px' }}>
              <div><strong>Họ tên:</strong> {selectedOrder.customer_name}</div>
              <div><strong>Điện thoại:</strong> {selectedOrder.phone}</div>
              <div><strong>Địa chỉ:</strong> {selectedOrder.address}</div>
              {selectedOrder.note && <div><strong>Ghi chú:</strong> {selectedOrder.note}</div>}
              <div><strong>Thời gian:</strong> {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</div>
            </div>

            <Title level={5} style={{ marginBottom: '12px' }}>Danh sách mặt hàng đã đặt:</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {selectedOrder.items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/len-milk-bo.jpg';
                        }}
                        style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} x {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#e11d48' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'right', fontSize: '16px', fontWeight: 700, color: '#d81b60' }}>
              Tổng cộng:{' '}
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.total_amount)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
