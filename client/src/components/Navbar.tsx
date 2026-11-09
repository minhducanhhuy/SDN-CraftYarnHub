import React, { useState } from 'react';
import { Layout, Input, Badge, Button, Drawer } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartFilled,
  HomeOutlined,
  ReadOutlined,
  ShoppingOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useCart } from '../context/CartContext';

const { Header } = Layout;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/patterns?q=${encodeURIComponent(value.trim())}`);
      setSearch('');
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Trang Chủ', icon: <HomeOutlined /> },
    { path: '/patterns', label: 'Kho Chart', icon: <ReadOutlined /> },
    { path: '/accessories', label: 'Phụ Kiện', icon: <ShoppingOutlined /> },
    { path: '/blog', label: 'Chuyện Của Len', icon: <BookOutlined /> },
  ];

  return (
    <Header
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '75px',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Mobile Menu Button */}
      <div className="mobile-btn" style={{ display: 'none' }}>
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '20px', color: '#ff6584' }} />}
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(255, 117, 140, 0.4)',
          }}
        >
          <HeartFilled style={{ color: '#fff', fontSize: '20px' }} />
        </div>
        <div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#d81b60',
              lineHeight: 1.1,
              fontFamily: 'Quicksand, sans-serif',
            }}
          >
            Tiệm Len Xinh
          </div>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>
            Crochet & Handmade
          </div>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div
        className="desktop-links"
        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
      >
        {navLinks.map((link) => {
          const isActive =
            link.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '15px',
                color: isActive ? '#fff' : '#4a3b32',
                background: isActive
                  ? 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)'
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Search Bar & Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Input
          placeholder="Tìm chart, len..."
          prefix={<SearchOutlined style={{ color: '#ff758c' }} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={() => handleSearch(search)}
          style={{
            width: '200px',
            borderRadius: '999px',
            borderColor: '#fbcfe8',
          }}
        />

        <Link to="/cart">
          <Badge count={totalItems} overflowCount={99} color="#ff476e">
            <Button
              shape="circle"
              size="large"
              icon={
                <ShoppingCartOutlined
                  style={{ fontSize: '20px', color: '#ff6584' }}
                />
              }
              style={{
                borderColor: '#fbcfe8',
                background: '#fff0f3',
              }}
            />
          </Badge>
        </Link>

        <Link to="/admin">
          <Button
            type="dashed"
            icon={<SettingOutlined />}
            style={{
              borderRadius: '999px',
              color: '#d81b60',
              borderColor: '#fbcfe8',
            }}
          >
            Quản trị
          </Button>
        </Link>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Tiệm Len Xinh"
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#333',
                padding: '10px',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#d81b60',
              padding: '10px',
              textDecoration: 'none',
            }}
          >
            ⚙️ Quản Trị Hệ Thống
          </Link>
        </div>
      </Drawer>
    </Header>
  );
};

