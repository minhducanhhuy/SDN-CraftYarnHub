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
} from 'antd';
import {
  DeleteOutlined,
  ShoppingOutlined,
  CheckCircleFilled,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const { Title, Text, Paragraph } = Typography;

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems } = useCart();
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const navigate = useNavigate();

  const handleCheckout = (values: any) => {
    setOrderInfo(values);
    setIsSuccessModal(true);
    clearCart();
  };

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalAmount);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={1} style={{ color: '#d81b60', fontSize: '28px', marginBottom: '4px' }}>
          Giỏ Hàng Của Bạn 🛒
        </Title>
        <Text style={{ color: '#666' }}>Bạn có {totalItems} sản phẩm phụ kiện trong giỏ</Text>
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

              <Form layout="vertical" onFinish={handleCheckout}>
                <Form.Item
                  name="customer_name"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                  <Input placeholder="Nguyễn Văn A" style={{ borderRadius: '10px' }} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
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

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={<ShoppingOutlined />}
                  style={{ height: '46px', fontSize: '16px', borderRadius: '999px', marginTop: '12px' }}
                >
                  Đặt Hàng Ngay
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
          <Paragraph style={{ color: '#666', fontSize: '15px' }}>
            Cảm ơn bạn <strong>{orderInfo?.customer_name}</strong> đã ủng hộ Tiệm Len Xinh.
            Chúng mình sẽ chuẩn bị gói hàng và liên hệ bạn qua SĐT {orderInfo?.phone} sớm nhất!
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setIsSuccessModal(false);
              navigate('/');
            }}
            style={{ borderRadius: '999px', marginTop: '16px' }}
          >
            Về Trang Chủ
          </Button>
        </div>
      </Modal>
    </div>
  );
};

