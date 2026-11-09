import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { PlusOutlined, MinusOutlined, ReloadOutlined, SoundOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const RowCounter: React.FC<{ maxRows?: number; patternId?: string }> = ({
  maxRows = 50,
  patternId,
}) => {
  const storageKey = patternId ? `crochet_row_${patternId}` : 'crochet_row_default';

  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, count.toString());
    } catch (e) {}
  }, [count, storageKey]);

  // Âm thanh bíp giả lập bằng Web Audio API không cần file ngoài
  const playBeep = (freq = 600) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // browser audio policy
    }
  };

  const handleIncrement = () => {
    setCount((prev) => {
      const next = prev + 1;
      playBeep(750);
      return next;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      if (prev > 1) {
        playBeep(450);
        return prev - 1;
      }
      return 1;
    });
  };

  const handleReset = () => {
    setCount(1);
    playBeep(350);
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #fff0f5 0%, #fff7ed 100%)',
        borderRadius: '16px',
        border: '1px solid #ffccd5',
        textAlign: 'center',
        padding: '12px',
        boxShadow: '0 4px 16px rgba(255, 105, 180, 0.12)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <SoundOutlined style={{ color: '#ff6584' }} />
        <Text strong style={{ color: '#c2185b', fontSize: '15px' }}>
          Trợ Lý Đếm Hàng Móc (Row Counter)
        </Text>
      </div>

      <div
        style={{
          fontSize: '44px',
          fontWeight: '800',
          color: '#d81b60',
          lineHeight: '1.2',
          margin: '12px 0',
          fontFamily: 'Quicksand, monospace',
        }}
      >
        Hàng R{count}
      </div>

      <Space size={12}>
        <Button
          shape="circle"
          size="large"
          icon={<MinusOutlined />}
          onClick={handleDecrement}
          disabled={count <= 1}
        />
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleIncrement}
          style={{
            padding: '0 24px',
            height: '42px',
            fontSize: '16px',
          }}
        >
          Hàng Tiếp Theo (+1)
        </Button>
        <Button
          shape="circle"
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleReset}
          title="Bắt đầu lại từ Hàng 1"
        />
      </Space>
    </Card>
  );
};

