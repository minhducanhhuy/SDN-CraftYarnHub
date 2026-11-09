import React, { useState } from 'react';
import { Input, Badge, Button, Drawer, Tooltip } from 'antd';
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
    <header className="app-header">
      {/* Brand Logo (Left) */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          lineHeight: 'normal',
          flexShrink: 0,
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
            flexShrink: 0,
          }}
        >
          <HeartFilled style={{ color: '#fff', fontSize: '20px' }} />
        </div>
        <div style={{ lineHeight: 'normal' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#d81b60',
              lineHeight: 1.15,
              fontFamily: 'Quicksand, sans-serif',
              letterSpacing: '-0.3px',
            }}
          >
            Tiệm Len Xinh
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#888',
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: '2px',
            }}
          >
            Crochet & Handmade
          </div>
        </div>
      </Link>

      {/* Desktop Navigation Links (Center) */}
      <nav
        className="desktop-links"
        style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
          lineHeight: 'normal',
        }}
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
              className={`header-nav-link ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Actions: Search + Cart + Admin + Mobile Menu Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          lineHeight: 'normal',
          flexShrink: 0,
        }}
      >
        {/* Search input (desktop/tablet) */}
        <div className="header-search">
          <Input
            placeholder="Tìm chart, len..."
            suffix={
              <SearchOutlined
                style={{ color: '#ff758c', cursor: 'pointer' }}
                onClick={() => handleSearch(search)}
              />
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => handleSearch(search)}
            style={{
              width: '180px',
              borderRadius: '999px',
              borderColor: '#fbcfe8',
              height: '38px',
              lineHeight: 'normal',
            }}
          />
        </div>

        {/* Cart button */}
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', lineHeight: 'normal' }}>
          <Badge count={totalItems} overflowCount={99} color="#ff476e" offset={[-2, 4]}>
            <Button
              shape="circle"
              size="large"
              icon={<ShoppingCartOutlined style={{ fontSize: '20px', color: '#ff6584' }} />}
              style={{
                borderColor: '#fbcfe8',
                background: '#fff0f3',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </Badge>
        </Link>

        {/* Admin management button */}
        <Link to="/admin" className="header-admin-btn">
          <Tooltip title="Quản trị hệ thống (CRUD)">
            <Button
              shape="circle"
              size="large"
              icon={<SettingOutlined style={{ fontSize: '18px', color: '#d81b60' }} />}
              style={{
                borderColor: '#fbcfe8',
                background: '#fff0f3',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </Tooltip>
        </Link>

        {/* Mobile Hamburger Button (Only on screen <= 992px) */}
        <div className="mobile-menu-btn">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '22px', color: '#ff6584' }} />}
            onClick={() => setMobileOpen(true)}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Tiệm Len Xinh 🧶"
        placement="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={280}
      >
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="Tìm chart, len..."
            suffix={
              <SearchOutlined
                style={{ color: '#ff758c', cursor: 'pointer' }}
                onClick={() => handleSearch(search)}
              />
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={() => handleSearch(search)}
            style={{ borderRadius: '999px', borderColor: '#fbcfe8', height: '40px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: isActive ? '#ff476e' : '#333',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: isActive ? '#fff0f3' : 'transparent',
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
          <div style={{ height: '1px', background: '#ffe4e6', margin: '8px 0' }} />
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#d81b60',
              padding: '12px 14px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: location.pathname === '/admin' ? '#fff0f3' : 'transparent',
            }}
          >
            <SettingOutlined /> Quản Trị Hệ Thống
          </Link>
        </div>
      </Drawer>
    </header>
  );
};


