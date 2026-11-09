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
} from '@ant-design/icons';
import { ordersService } from '../services/orders.service';
import { patternsService } from '../services/patterns.service';
import { productsService } from '../services/products.service';
import { categoriesService } from '../services/categories.service';
import { Order, Pattern, Product, Category } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // State data
  const [orders, setOrders] = useState<Order[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal Thêm Chart
  const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
  const [patternForm] = Form.useForm();

  // Modal Thêm Sản Phẩm
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm] = Form.useForm();

  // Modal Chi tiết Đơn hàng
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersRes, patternsRes, productsRes, catsRes] = await Promise.all([
        ordersService.getAll(),
        patternsService.getAll(),
        productsService.getAll(),
        categoriesService.getAll(),
      ]);

      if (ordersRes.success) setOrders(ordersRes.data);
      if (patternsRes.success) setPatterns(patternsRes.data);
      if (productsRes.success) setProducts(productsRes.data);
      if (catsRes.success) setCategories(catsRes.data);
    } catch (err) {
      console.error(err);
      message.error('Lỗi khi tải dữ liệu quản trị');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await ordersService.updateStatus(id, newStatus);
      if (res.success) {
        message.success(`Đã chuyển trạng thái đơn sang "${newStatus}"`);
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus as any } : o))
        );
      }
    } catch (err) {
      message.error('Không thể cập nhật trạng thái');
    }
  };

  // Xóa đơn hàng
  const handleDeleteOrder = async (id: string) => {
    try {
      await ordersService.delete(id);
      message.success('Đã xóa đơn hàng');
      setOrders((prev) => prev.filter((o) => o._id !== id));
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
        author: values.author || 'Admin Tiệm Len',
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

  // Xóa Sản phẩm
  const handleDeleteProduct = async (id: string) => {
    try {
      await productsService.delete(id);
      message.success('Đã xóa phụ kiện thành công');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      message.error('Không thể xóa sản phẩm');
    }
  };

  // Cột bảng Đơn Hàng
  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'order_code',
      key: 'order_code',
      render: (code: string) => <Tag color="magenta" style={{ fontWeight: 700 }}>{code}</Tag>,
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
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space>
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

  // Cột bảng Chart
  const patternColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 70,
      render: (url: string) => (
        <img src={url} alt="chart" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
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
      title: 'Thống kê',
      key: 'stats',
      render: (_: any, r: Pattern) => (
        <span style={{ fontSize: '13px', color: '#666' }}>
          👁 {r.view_count || 0} lượt xem • ❤️ {r.likes || 0} like
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, r: Pattern) => (
        <Popconfirm
          title="Xác nhận xóa Chart này?"
          onConfirm={() => handleDeletePattern(r._id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  // Cột bảng Phụ Kiện
  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      key: 'image_url',
      width: 70,
      render: (url: string) => (
        <img src={url} alt="prod" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Tên sản phẩm',
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
      render: (p: number) => (
        <span style={{ color: '#e11d48', fontWeight: 700 }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p)}
        </span>
      ),
    },
    {
      title: 'Kho hàng',
      dataIndex: 'stock_status',
      key: 'stock_status',
      render: (st: string) => (
        <Tag color={st === 'Còn hàng' ? 'green' : st === 'Sắp hết' ? 'gold' : 'red'}>{st}</Tag>
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
          <Button size="small" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ color: '#d81b60', marginBottom: '4px' }}>
            ⚙️ Trang Quản Trị Hệ Thống (Admin Control Panel)
          </Title>
          <Text style={{ color: '#666' }}>
            Dành cho sinh viên demo đầy đủ 4 thao tác CRUD (Create - Read - Update - Delete) trên MongoDB
          </Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={loadData} loading={loading}>
          Làm mới dữ liệu
        </Button>
      </div>

      {/* Thống kê nhanh */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '16px', border: '1px solid #ffd6e0' }}>
            <Statistic
              title="Tổng Đơn Hàng"
              value={orders.length}
              prefix={<ShoppingOutlined style={{ color: '#d81b60' }} />}
              valueStyle={{ color: '#d81b60', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '16px', border: '1px solid #d1fae5' }}>
            <Statistic
              title="Tổng Mẫu Chart"
              value={patterns.length}
              prefix={<ReadOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#10b981', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '16px', border: '1px solid #e0e7ff' }}>
            <Statistic
              title="Tổng Phụ Kiện & Dụng Cụ"
              value={products.length}
              prefix={<InboxOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#6366f1', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs Quản Trị */}
      <Card style={{ borderRadius: '20px', border: '1px solid #ffe4e6' }}>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={[
            {
              key: 'orders',
              label: `🛒 Quản Lý Đơn Hàng (${orders.length})`,
              children: (
                <Table
                  dataSource={orders}
                  columns={orderColumns}
                  rowKey="_id"
                  loading={loading}
                  pagination={{ pageSize: 8 }}
                />
              ),
            },
            {
              key: 'patterns',
              label: `🧶 Quản Lý Kho Chart (${patterns.length})`,
              children: (
                <div>
                  <div style={{ marginBottom: '16px', textAlign: 'right' }}>
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
                    pagination={{ pageSize: 8 }}
                  />
                </div>
              ),
            },
            {
              key: 'products',
              label: `🛍️ Quản Lý Phụ Kiện (${products.length})`,
              children: (
                <div>
                  <div style={{ marginBottom: '16px', textAlign: 'right' }}>
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
                    pagination={{ pageSize: 8 }}
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
              <Option value="Sắp hết">Sắp hết</Option>
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
                      <img src={item.image_url} alt={item.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
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

