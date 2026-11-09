import React, { useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  InputNumber,
  Empty,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Tag,
  Alert,
} from 'antd';
import {
  DeleteOutlined,
  ShoppingOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersService } from '../services/orders.service';
import { Order } from '../types';

const { Title, Text, Paragraph } = Typography;

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems } = useCart();
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // State tra cứu đơn hàng
  const [lookupModal, setLookupModal] = useState(false);
  const [lookupKeyword, setLookupKeyword] = useState('');
  const [lookupResults, setLookupResults] = useState<Order[]>([]);
  const [lookupLoading, setLookupLoading] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleCheckout = async (values: any) => {
    if (cart.length === 0) {
      message.warning('Giỏ hàng của bạn đang trống!');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        customer_name: values.customer_name,
        phone: values.phone,
        address: values.address,
        note: values.note || '',
        items: cart.map((item) => ({
          product_id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image_url: item.product.image_url,
        })),
        total_amount: totalAmount,
      };

      const res = await ordersService.create(payload);
      if (res.success) {
        setCreatedOrder(res.data);
        setIsSuccessModal(true);
        clearCart();
        form.resetFields();
      }
    } catch (err: any) {
      message.error(err.message || 'Không thể tạo đơn hàng, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookup = async () => {
    if (!lookupKeyword.trim()) {
      message.warning('Vui lòng nhập Mã đơn hàng hoặc Số điện thoại');
      return;
    }
    try {
      setLookupLoading(true);
      const res = await ordersService.lookup(lookupKeyword.trim());
      if (res.success) {
        setLookupResults(res.data);
        if (res.data.length === 0) {
          message.info('Không tìm thấy đơn hàng nào khớp với thông tin này');
        }
      }
    } catch (err) {
      message.error('Lỗi khi tra cứu đơn hàng');
    } finally {
      setLookupLoading(false);
    }
  };

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalAmount);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <Title level={1} style={{ color: '#d81b60', fontSize: '28px', marginBottom: '4px' }}>
            Giỏ Hàng Của Bạn 🛒
          </Title>
          <Text style={{ color: '#666' }}>Bạn có {totalItems} sản phẩm phụ kiện trong giỏ</Text>
        </div>

        <Button
          icon={<SearchOutlined />}
          onClick={() => setLookupModal(true)}
          style={{ borderRadius: '999px', borderColor: '#ff758c', color: '#d81b60' }}
        >
          Tra Cứu Đơn Hàng Của Tôi
        </Button>
      </div>

      {cart.length === 0 ? (
        <Card style={{ borderRadius: '24px', textAlign: 'center', padding: '60px 0', border: '1px solid #ffe4e6' }}>
          <Empty description="Giỏ hàng của bạn đang trống" />
          <Link to="/accessories">
            <Button type="primary" size="large" style={{ marginTop: '20px', borderRadius: '999px' }}>
              Khám Phá Phụ Kiện Ngay
            </Button>
          </Link>
        </Card>
      ) : (
        <Row gutter={[32, 32]}>
          {/* Cart Items List */}
          <Col xs={24} lg={15}>
            <Card style={{ borderRadius: '24px', border: '1px solid #ffe4e6' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #fce7f3',
                    }}
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <Title level={5} style={{ marginBottom: '4px', color: '#2c1810' }}>
                        {item.product.name}
                      </Title>
                      <div style={{ color: '#e11d48', fontWeight: 700, fontSize: '15px' }}>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(item.product.price)}
                      </div>
                    </div>

                    <InputNumber
                      min={1}
                      max={99}
                      value={item.quantity}
                      onChange={(val) => updateQuantity(item.product._id, val || 1)}
                      style={{ borderRadius: '8px', width: '65px' }}
                    />

                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.product._id)}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Link to="/accessories">
                  <Button icon={<ArrowLeftOutlined />}>Tiếp tục chọn đồ</Button>
                </Link>
                <Button danger type="text" onClick={clearCart}>
                  Xóa tất cả
                </Button>
              </div>
            </Card>
          </Col>

          {/* Checkout Form */}
          <Col xs={24} lg={9}>
            <Card
              title={<span style={{ color: '#d81b60', fontSize: '18px' }}>Thông Tin Nhận Hàng</span>}
              style={{ borderRadius: '24px', border: '1px solid #ffe4e6' }}
            >
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>Tạm tính:</Text>
                  <Text strong>{formattedTotal}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text>Phí vận chuyển:</Text>
                  <Text style={{ color: '#52c41a' }}>Miễn phí</Text>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                  <Text strong>Tổng cộng:</Text>
                  <Text strong style={{ color: '#e11d48' }}>
                    {formattedTotal}
                  </Text>
                </div>
              </div>

              <Form form={form} layout="vertical" onFinish={handleCheckout}>
                <Form.Item
                  name="customer_name"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên người nhận' }]}
                >
                  <Input placeholder="Ví dụ: Lan Anh, Mai Phương..." style={{ borderRadius: '10px' }} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ (10-11 số)' },
                  ]}
                >
                  <Input placeholder="0912345678" style={{ borderRadius: '10px' }} />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Địa chỉ nhận hàng"
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng' }]}
                >
                  <Input.TextArea rows={2} placeholder="Số nhà, tên đường, quận/huyện..." style={{ borderRadius: '10px' }} />
                </Form.Item>

                <Form.Item name="note" label="Ghi chú thêm (tùy chọn)">
                  <Input placeholder="Giao giờ hành chính, bọc kỹ..." style={{ borderRadius: '10px' }} />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={submitting}
                  icon={<ShoppingOutlined />}
                  style={{ height: '46px', fontSize: '16px', borderRadius: '999px', marginTop: '12px' }}
                >
                  {submitting ? 'Đang tạo đơn...' : 'Đặt Hàng Ngay'}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      )}

      {/* Success Modal */}
      <Modal
        open={isSuccessModal}
        footer={null}
        onCancel={() => setIsSuccessModal(false)}
        centered
        style={{ textAlign: 'center' }}
      >
        <div style={{ padding: '24px 12px' }}>
          <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a', marginBottom: '16px' }} />
          <Title level={3} style={{ color: '#2c1810', marginBottom: '8px' }}>
            Đặt Hàng Thành Công!
          </Title>
          <div style={{ marginBottom: '16px' }}>
            <Tag color="magenta" style={{ fontSize: '15px', padding: '6px 14px', borderRadius: '999px' }}>
              Mã đơn hàng: {createdOrder?.order_code}
            </Tag>
          </div>
          <Paragraph style={{ color: '#666', fontSize: '15px' }}>
            Cảm ơn bạn <strong>{createdOrder?.customer_name}</strong> đã ủng hộ Tiệm Len Xinh.
            Đơn hàng trị giá{' '}
            <strong style={{ color: '#e11d48' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                createdOrder?.total_amount || 0
              )}
            </strong>{' '}
            đã được lưu vào hệ thống và đang chờ xác nhận!
          </Paragraph>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setIsSuccessModal(false);
                navigate('/');
              }}
              style={{ borderRadius: '999px' }}
            >
              Về Trang Chủ
            </Button>
            <Button
              size="large"
              onClick={() => {
                setIsSuccessModal(false);
                setLookupModal(true);
                if (createdOrder) {
                  setLookupKeyword(createdOrder.order_code);
                  setLookupResults([createdOrder]);
                }
              }}
              style={{ borderRadius: '999px' }}
            >
              Xem Chi Tiết Đơn
            </Button>
          </div>
        </div>
      </Modal>

      {/* Lookup Order Modal */}
      <Modal
        title={<span style={{ color: '#d81b60', fontSize: '18px' }}>🔍 Tra Cứu Tình Trạng Đơn Hàng</span>}
        open={lookupModal}
        onCancel={() => setLookupModal(false)}
        footer={null}
        width={680}
      >
        <div style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <Input
              placeholder="Nhập Mã đơn hàng (VD: ORD-...) hoặc Số điện thoại"
              value={lookupKeyword}
              onChange={(e) => setLookupKeyword(e.target.value)}
              onPressEnter={handleLookup}
              style={{ borderRadius: '10px' }}
            />
            <Button
              type="primary"
              onClick={handleLookup}
              loading={lookupLoading}
              style={{ borderRadius: '10px' }}
            >
              Tra Cứu
            </Button>
          </div>

          {lookupResults.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '420px', overflowY: 'auto' }}>
              {lookupResults.map((ord) => (
                <Card
                  key={ord._id}
                  size="small"
                  style={{ borderRadius: '12px', border: '1px solid #ffd6e0' }}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ color: '#d81b60' }}>{ord.order_code}</Text>
                      <Tag
                        color={
                          ord.status === 'Đã giao'
                            ? 'green'
                            : ord.status === 'Đang xử lý'
                            ? 'blue'
                            : ord.status === 'Đã hủy'
                            ? 'red'
                            : 'orange'
                        }
                      >
                        {ord.status}
                      </Tag>
                    </div>
                  }
                >
                  <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                    <div><strong>Người nhận:</strong> {ord.customer_name} - SĐT: {ord.phone}</div>
                    <div><strong>Địa chỉ:</strong> {ord.address}</div>
                    <div><strong>Tổng thanh toán:</strong> <span style={{ color: '#e11d48', fontWeight: 700 }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ord.total_amount)}</span></div>
                    <div><strong>Số mặt hàng:</strong> {ord.items?.length || 0} sản phẩm</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>Ngày đặt: {new Date(ord.createdAt).toLocaleString('vi-VN')}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
