import React from 'react';
import { Card, Tag, Typography, Rate, Button } from 'antd';
import { EyeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Pattern } from '../types';

const { Title, Paragraph } = Typography;

export const PatternCard: React.FC<{
  pattern: Pattern;
  onLike?: (id: string) => void;
  } > = ({ pattern }) => {
    const difficultyColors: Record<string, string> = {
      'Dễ': '#52c41a',
      'Vừa': '#faad14',
      'Khó': '#f5222d',
    };

    return (
      <Card
        hoverable
        className="hover-card"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        cover={
        <Link to={`/patterns/${pattern._id}`} style={{ display: 'block' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={pattern.image_url || pattern.img}
                    alt={pattern.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/patterns/chau-cay-huong-duong.jpg';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.08)')}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Tag
                      color={difficultyColors[pattern.difficulty] || 'magenta'}
                      style={{
                        borderRadius: '999px',
                        fontWeight: 700,
                        border: 'none',
                        padding: '3px 10px',
                      }}
                    >
                      {pattern.difficulty}
                    </Tag>
                {pattern.category && (
                  <Tag
                    style={{
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      color: '#333',
                      fontWeight: 600,
                      border: 'none',
                    }}
                  >
                    {typeof pattern.category === 'object' ? pattern.category.name : 'Móc Len'}
                  </Tag>
                )}
            </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.55)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  color: '#fff',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <EyeOutlined /> {pattern.view_count || 0}
              </div>
            </div>
        </Link >
      }
bodyStyle = {{
  flex: 1,
    display: 'flex',
      flexDirection: 'column',
        justifyContent: 'space-between',
          padding: '16px',
      }}
    >
      <div>
        <Link to={`/patterns/${pattern._id}`} style={{ textDecoration: 'none' }}>
          <Title
            level={4}
            style={{
              fontSize: '17px',
              marginBottom: '6px',
              color: '#2c1810',
              lineHeight: 1.3,
              cursor: 'pointer',
            }}
          >
            {pattern.name}
          </Title>
        </Link>

        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ color: '#777', fontSize: '13px', marginBottom: '12px' }}
        >
          {pattern.description}
        </Paragraph>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            borderTop: '1px dashed #ffe4e6',
            paddingTop: '10px',
          }}
        >
          <Rate
            disabled
            value={pattern.difficulty_stars || 2}
            style={{ fontSize: '13px', color: '#ff758c' }}
          />
          <span style={{ fontSize: '12px', color: '#888' }}>
            {pattern.is_free !== false ? (
              <span style={{ color: '#52c41a', fontWeight: 'bold' }}>Miễn phí</span>
            ) : (
              'Có phí'
            )}
          </span>
        </div>

        <Link to={`/patterns/${pattern._id}`} style={{ textDecoration: 'none' }}>
          <Button
            type="primary"
            block
            icon={<ArrowRightOutlined />}
            style={{ borderRadius: '999px' }}
          >
            Xem Hướng Dẫn Móc
          </Button>
        </Link>
      </div>
    </Card >
  );
};


