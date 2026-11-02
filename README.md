# ĐỒ ÁN MÔN HỌC SDN302: TIỆM LEN XINH (CROCHET CHART & ACCESSORIES)

> Dự án xây dựng theo chuẩn mô hình **Client - Server**:
> - **Frontend (Client):** React + Vite (Ant Design, Responsive, UI tông ấm áp)
> - **Backend (Server):** NestJS RESTful API Server (Module - Controller - Service)
> - **Database:** MongoDB kết nối qua Mongoose (Schemas có type, validation, quan hệ `ObjectId` + `ref` và `.populate()`)
> - **Dữ liệu thật:** 100% dữ liệu nạp từ script seed vào MongoDB, không mock data.

---

## 1. CẤU TRÚC THƯ MỤC DỰ ÁN

```
chart-crochet/
├── server/                     # Backend NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── categories/     # Danh mục Chart & Phụ kiện
│   │   │   ├── patterns/       # Kho Chart móc len (có populate category)
│   │   │   ├── products/       # Phụ kiện & Dụng cụ len
│   │   │   ├── blogs/          # Bài viết cẩm nang đan móc
│   │   │   └── comments/       # Đánh giá & Bình luận (ref Pattern)
│   │   ├── scripts/
│   │   │   └── seed.ts         # Script nạp dữ liệu thật vào MongoDB
│   │   ├── app.module.ts
│   │   └── main.ts             # Khởi chạy port 3000, prefix /api, CORS port 5173
│   └── package.json
│
├── client/                     # Frontend React + Vite
│   ├── src/
│   │   ├── components/         # Navbar, Footer, PatternCard, ProductCard, RowCounter...
│   │   ├── pages/              # HomePage, PatternsPage, PatternDetailPage, AccessoriesPage, BlogPage, CartPage
│   │   ├── context/            # CartContext (Quản lý giỏ hàng & tính tiền)
│   │   ├── services/           # Gọi REST API qua Axios đến Backend
│   │   └── styles/             # Giao diện tông màu ấm áp pastel
│   └── package.json
│
└── package.json                # Quản lý chạy đồng thời cả Server và Client
```

---

## 2. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### Yêu cầu tiên quyết:
- Đảm bảo dịch vụ **MongoDB** đang chạy trên máy (mặc định port `27017`).

### Cách 1: Chạy đồng thời cả Server & Client (Khuyên dùng)
Tại thư mục gốc của dự án:
```bash
npm run dev
```
Lệnh này sẽ tự động khởi chạy song song:
- **Backend (NestJS API):** `http://localhost:3000/api`
- **Frontend (React Vite):** `http://localhost:5173`

---

### Cách 2: Chạy riêng lẻ từng phần
- **Khởi chạy Backend:**
  ```bash
  cd server
  npm run start:dev
  ```
- **Khởi chạy Frontend:**
  ```bash
  cd client
  npm run dev
  ```
- **Nạp lại dữ liệu thật vào MongoDB (Seed Data):**
  ```bash
  npm run seed
  # hoặc: cd server && npm run seed
  ```

---

## 3. CÁC TÍNH NĂNG CHÍNH CỦA HỆ THỐNG

1. **Trang Chủ (Home):**
   - Slider Carousel phong cách ấm áp (Bí Mật Chúng Mình, Quà Tặng Handmade, Chuyện Của Len).
   - Thẻ giới thiệu các tiện ích: Bấm Giờ & Định Giá, Đếm Hàng Chuẩn Bíp, Dịch Hóa Thuật Ngữ, Từ Điển Mũi Móc.
   - Hiển thị Chart nổi bật, Phụ kiện bán chạy và Cẩm nang đan móc từ MongoDB.

2. **Kho Chart Móc Len (Patterns Catalog):**
   - Tìm kiếm realtime theo tên và nguyên liệu.
   - Lọc danh mục: Rau Củ, Con Vật, Hoa Lá...
   - Lọc độ khó: Dễ, Vừa, Khó.
   - Thẻ Chart hiển thị ảnh, số sao, danh mục và số lượt xem.

3. **Chi Tiết Chart (Pattern Detail):**
   - Hình ảnh chi tiết, nguyên liệu, dụng cụ cần có.
   - Hướng dẫn móc từng bộ phận (Thân, Đầu, Cánh...) với các dòng R1, R2...
   - **Trợ lý đếm hàng đan móc (Row Counter)** phát âm thanh bíp pop trực tiếp.
   - Nút yêu thích / Thả tim (tăng like count lưu vào MongoDB).
   - Khu vực Đánh giá & Bình luận: Đọc bình luận thật và Form gửi đánh giá mới lưu ngay vào MongoDB.

4. **Phụ Kiện & Dụng Cụ (Accessories):**
   - Danh sách len sợi Milk bò, len xù cừu, kim móc dẻo ABS, mắt thú, bông gòn bi.
   - Lọc theo phân loại sản phẩm.
   - Thêm vào giỏ hàng với thông báo Toast trực quan.

5. **Giỏ Hàng & Đặt Hàng (Cart):**
   - Xem danh sách sản phẩm trong giỏ, tùy chỉnh số lượng, xóa sản phẩm.
   - Tự động tính tổng tiền.
   - Form thông tin nhận hàng và popup thông báo đặt hàng thành công.

6. **Blog Thủ Công (Blog & Tips):**
   - Các bài viết mẹo giấu len, bảo quản len sợi, kỹ thuật nhồi thú amigurumi căng tròn.

---

## 4. ĐÁP ỨNG CHUẨN ĐỒ ÁN MÔN SDN302 (FPT UNIVERSITY)

- **Mô hình Client - Server tách biệt:** Hoàn toàn độc lập giữa tầng giao diện (React Vite) và tầng xử lý nghiệp vụ/dữ liệu (NestJS).
- **Mongoose Schema & Models:** Schemas rõ ràng có validation (`required`, `enum`, `min`, `max`, `trim`).
- **Mongoose Population:** Áp dụng quan hệ giữa `Pattern` -> `Category`, `Product` -> `Category`, `Comment` -> `Pattern` sử dụng `Types.ObjectId` và hàm `.populate()`.
- **RESTful API:** Các phương thức HTTP rõ ràng (`GET`, `POST`, `PATCH`), trả về đúng mã trạng thái `200`, `201`, `400`, `404`, `500` kèm JSON đồng nhất `{ success, data, message }`.
- **CORS:** Cấu hình chuẩn xác cho phép Client port `5173` gọi API backend port `3000`.
- **Dữ liệu thật:** Không dùng mock data cứng ở giao diện, 100% dữ liệu động từ MongoDB.
