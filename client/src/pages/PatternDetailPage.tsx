import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Tag,
  Rate,
  Button,
  Card,
  Checkbox,
  Spin,
  Divider,
  Input,
  Form,
  Avatar,
  message,
  Space,
} from 'antd';
import {
  HeartFilled,
  HeartOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ToolOutlined,
  CalendarOutlined,
  UserOutlined,
  SendOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { Pattern, CommentItem } from '../types';
import { patternsService } from '../services/patterns.service';
import { commentsService } from '../services/comments.service';
import { RowCounter } from '../components/RowCounter';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const FALLBACK_PATTERN_IMG =
  'https://i.pinimg.com/736x/8a/36/c9/8a36c968b077942a132ef2166f3249d8.jpg';

export const PatternDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!id) return;
    const fetchPatternAndComments = async () => {
      try {
        setLoading(true);
        const [patRes, commRes] = await Promise.all([
          patternsService.getById(id),
          commentsService.getByPattern(id),
        ]);
        if (patRes.success) {
          setPattern(patRes.data);
          setLikeCount(patRes.data.likes || 0);
        }
        if (commRes.success) {
          setComments(commRes.data);
        }
      } catch (err) {
        console.error('Lỗi khi tải chi tiết chart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatternAndComments();
  }, [id]);

  const handleLike = async () => {
    if (!id || liked) return;
    try {
      const res = await patternsService.like(id);
      if (res.success) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        message.success('Đã thả tim chart!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (values: any) => {
    if (!id) return;
    try {
      setSubmittingComment(true);
      const res = await commentsService.create({
        pattern_id: id,
        author_name: values.author_name,
        rating: values.rating || 5,
        content: values.content,
      });
      if (res.success) {
        message.success('Cảm ơn bạn đã gửi đánh giá!');
        setComments((prev) => [res.data, ...prev]);
        form.resetFields();
      }
    } catch (err: any) {
      message.error(err.message || 'Không thể gửi bình luận');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px', color: '#888' }}>Đang nạp dữ liệu chart từ MongoDB...</div>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Title level={3}>Không tìm thấy mẫu chart này</Title>
        <Link to="/patterns">
          <Button type="primary">Quay lại Kho Chart</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/patterns">
          <Button icon={<ArrowLeftOutlined />} type="text" style={{ color: '#d81b60', fontWeight: 600 }}>
            Quay lại danh sách Chart
          </Button>
        </Link>
      </div>

      {/* Main Info Card */}
      <Card
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #ffe4e6',
        }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '380px' }}>
              <img
                src={pattern.image_url || pattern.img}
                alt={pattern.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PATTERN_IMG;
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Tag color="magenta" style={{ borderRadius: '999px', fontWeight: 600, padding: '3px 12px' }}>
                {pattern.category?.name || 'Móc Len'}
              </Tag>
              <Tag color="green" style={{ borderRadius: '999px', fontWeight: 600, padding: '3px 12px' }}>
                Độ khó: {pattern.difficulty}
              </Tag>
              <Tag color="blue" style={{ borderRadius: '999px', fontWeight: 600, padding: '3px 12px' }}>
                Miễn phí
              </Tag>
            </div>

            <Title level={1} style={{ fontSize: '28px', color: '#2c1810', marginBottom: '8px' }}>
              {pattern.name}
            </Title>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: '#666' }}>
              <Space>
                <Rate disabled defaultValue={pattern.difficulty_stars || 2} style={{ fontSize: '15px' }} />
                <span>({pattern.difficulty_stars} / 5 sao)</span>
              </Space>
              <span>•</span>
              <span><EyeOutlined /> {pattern.view_count} lượt xem</span>
              <span>•</span>
              <span><UserOutlined /> {pattern.author}</span>
            </div>

            <Paragraph style={{ color: '#555', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              {pattern.description}
            </Paragraph>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button
                type={liked ? 'primary' : 'default'}
                danger
                icon={liked ? <HeartFilled /> : <HeartOutlined />}
                size="large"
                onClick={handleLike}
                style={{ borderRadius: '999px' }}
              >
                {liked ? 'Đã yêu thích' : 'Yêu thích'} ({likeCount})
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Materials & Tools */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} md={12}>
          <Card
            title={<span style={{ color: '#d81b60' }}><CheckCircleOutlined /> Nguyên Liệu Chuẩn Bị</span>}
            style={{ borderRadius: '20px', height: '100%', border: '1px solid #ffe4e6' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pattern.materials?.map((mat, idx) => (
                <Checkbox key={idx} style={{ fontSize: '15px' }}>
                  {mat}
                </Checkbox>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<span style={{ color: '#d81b60' }}><ToolOutlined /> Dụng Cụ Cần Thiết</span>}
            style={{ borderRadius: '20px', height: '100%', border: '1px solid #ffe4e6' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pattern.tools?.map((tool, idx) => (
                <Checkbox key={idx} style={{ fontSize: '15px' }}>
                  {tool}
                </Checkbox>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Pattern Steps & Row Counter */}
      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24} lg={16}>
          <Card
            title={<span style={{ color: '#d81b60', fontSize: '18px' }}>📝 Các Bước Móc Chi Tiết</span>}
            style={{ borderRadius: '20px', border: '1px solid #ffe4e6' }}
          >
            {pattern.content && Object.keys(pattern.content).length > 0 ? (
              Object.entries(pattern.content).map(([partName, steps]) => (
                <div key={partName} style={{ marginBottom: '24px' }}>
                  <Title level={4} style={{ color: '#ff476e', borderBottom: '2px dashed #fbcfe8', paddingBottom: '6px' }}>
                    ✦ Phần: {partName}
                  </Title>
                  <ul style={{ listStyleType: 'none', paddingLeft: '8px' }}>
                    {(steps as string[]).map((step, sIdx) => (
                      <li
                        key={sIdx}
                        style={{
                          padding: '8px 12px',
                          margin: '6px 0',
                          borderRadius: '8px',
                          background: sIdx % 2 === 0 ? '#fff5f7' : '#ffffff',
                          fontSize: '15px',
                          fontFamily: 'monospace',
                          color: '#333',
                          borderLeft: '3px solid #ff758c',
                        }}
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <Paragraph>Đang cập nhật nội dung chi tiết các vòng móc...</Paragraph>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <div style={{ position: 'sticky', top: '90px' }}>
            <RowCounter patternId={pattern._id} />
            <div
              style={{
                marginTop: '16px',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid #ffe4e6',
              }}
            >
              <Text strong style={{ color: '#d81b60' }}>Ký hiệu cơ bản:</Text>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#666', lineHeight: 1.8 }}>
                <div>• <strong>MR:</strong> Vòng tròn ma thuật</div>
                <div>• <strong>X / sc:</strong> Mũi đơn</div>
                <div>• <strong>V / inc:</strong> Mũi tăng (2 mũi cùng chân)</div>
                <div>• <strong>A / dec:</strong> Mũi giảm (thu 2 mũi thành 1)</div>
                <div>• <strong>BO:</strong> Mũi xù / bắp ngô</div>
                <div>• <strong>FO:</strong> Chốt sợi kết thúc</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Reviews & Comments Section */}
      <Card
        title={
          <span style={{ color: '#d81b60', fontSize: '18px' }}>
            💬 Đánh Giá & Bình Luận ({comments.length})
          </span>
        }
        style={{ borderRadius: '20px', border: '1px solid #ffe4e6' }}
      >
        {/* Comment Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCommentSubmit}
          initialValues={{ rating: 5 }}
          style={{
            background: '#fff9fa',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '32px',
            border: '1px solid #ffe4e6',
          }}
        >
          <Title level={5} style={{ color: '#d81b60', marginBottom: '16px' }}>
            Gửi nhận xét của bạn về mẫu chart này
          </Title>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="author_name"
                label="Họ và tên của bạn"
                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
              >
                <Input placeholder="Ví dụ: Lan Anh, Bún Móc Len..." style={{ borderRadius: '10px' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="rating" label="Đánh giá chất lượng chart">
                <Rate defaultValue={5} style={{ color: '#ff6584' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="content"
            label="Nội dung đánh giá"
            rules={[{ required: true, message: 'Vui lòng nhập cảm nhận hoặc câu hỏi' }]}
          >
            <TextArea
              rows={3}
              placeholder="Chia sẻ cảm nhận sau khi móc xong hoặc đặt câu hỏi về các dòng mũi móc..."
              style={{ borderRadius: '10px' }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={submittingComment}
            style={{ borderRadius: '999px', padding: '0 28px' }}
          >
            Gửi Đánh Giá
          </Button>
        </Form>

        {/* Comments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {comments.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#999', padding: '24px 0' }}>
              Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nhận nhé!
            </div>
          ) : (
            comments.map((comm) => (
              <div
                key={comm._id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  borderRadius: '14px',
                  background: '#ffffff',
                  border: '1px solid #fce7f3',
                }}
              >
                <Avatar src={comm.avatar} size={46} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text strong style={{ fontSize: '15px', color: '#33272a' }}>
                      {comm.author_name}
                    </Text>
                    <Rate disabled defaultValue={comm.rating} style={{ fontSize: '13px', color: '#ff758c' }} />
                  </div>
                  <Paragraph style={{ color: '#666', marginTop: '6px', marginBottom: 0, fontSize: '14px' }}>
                    {comm.content}
                  </Paragraph>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

