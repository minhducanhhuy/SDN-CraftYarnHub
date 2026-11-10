# ĐỒ ÁN MÔN HỌC SDN302: TIỆM LEN XINH (CRAFTYARNHUB)
## HỆ THỐNG QUẢN LÝ & CHIA SẺ CHART MÓC LEN & PHỤ KIỆN HANDMADE

> **Môn học:** SDN302 – Server-side Development with NodeJS, Express & MongoDB (FPT University)  
> **Kiến trúc:** Client - Server Architecture (React Vite + NestJS + Mongoose ODM + MongoDB)  
> **Cam kết:** 100% dữ liệu động từ MongoDB (Nói không với Mock Data), chuẩn RESTful API, đầy đủ 4 thao tác CRUD và DTO Validation Pipe.

---

## 1. CẤU TRÚC THƯ MỤC DỰ ÁN

```
SDN-CraftYarnHub/
├── server/                         # Backend NestJS (Port 3000)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── categories/         # Danh mục Chart & Phụ kiện (CRUD)
│   │   │   ├── patterns/           # Kho Chart móc len (CRUD, Regex search, $inc view/like)
│   │   │   ├── products/           # Phụ kiện & Dụng cụ len (CRUD)
│   │   │   ├── blogs/              # Bài viết cẩm nang đan móc (CRUD, tăng view theo slug)
│   │   │   ├── comments/           # Đánh giá & Bình luận (ref Pattern, rating 1-5 sao)
│   │   │   └── orders/             # Đơn đặt hàng (Tạo đơn, tra cứu theo SĐT, đổi trạng thái)
│   │   ├── scripts/
│   │   │   └── seed.ts             # Script nạp dữ liệu thật & đơn hàng mẫu vào MongoDB
│   │   ├── app.module.ts           # Root Module
│   │   └── main.ts                 # Global Prefix /api, CORS port 5173, ValidationPipe
│   └── package.json
│
├── client/                         # Frontend React + Vite (Port 5173)
│   ├── src/
│   │   ├── components/             # Navbar, Footer, PatternCard, ProductCard, RowCounter...
│   │   ├── pages/                  # HomePage, PatternsPage, PatternDetailPage, AccessoriesPage,
│   │   │                           # ProductDetailPage, BlogPage, BlogDetailPage, CartPage, AdminPage
│   │   ├── context/                # CartContext (Quản lý giỏ hàng & LocalStorage)
│   │   ├── services/               # Gọi RESTful API qua Axios
│   │   └── styles/                 # Tone màu ấm áp pastel (#ff6584)
│   └── package.json
│
└── package.json                    # Monorepo runner (concurrently chạy đồng thời Server & Client)
```

---

## 2. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### Yêu cầu tiên quyết:
- Đã cài đặt **Node.js** (v18 trở lên).
- Dịch vụ **MongoDB** đang chạy trên máy (mặc định: `mongodb://localhost:27017/chart_crochet_db`).

### Bước 1: Nạp dữ liệu ban đầu vào MongoDB (Chỉ cần chạy 1 lần)
Tại thư mục gốc dự án:
```bash
npm run seed
```
> Script sẽ tự động dọn dẹp và nạp đầy đủ danh mục, các mẫu chart đẹp, phụ kiện len sợi, bài viết blog, đánh giá sao và các đơn hàng mẫu để kiểm thử.

### Bước 2: Khởi chạy đồng thời cả Server và Client
Tại thư mục gốc dự án:
```bash
npm run dev
```
Hệ thống sẽ tự động khởi chạy song song:
- **Frontend (Giao diện React Vite):** [http://localhost:5173](http://localhost:5173)
- **Backend (NestJS REST API):** [http://localhost:3000/api](http://localhost:3000/api)
- **Trang Quản Trị Hệ Thống:** [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 3. PHÂN CHIA TRÁCH NHIỆM THÀNH VIÊN TRONG NHÓM (3 THÀNH VIÊN)

Dự án áp dụng mô hình phân chia theo **Chiều dọc (Full-stack theo Feature)** để mỗi thành viên đều có đóng góp trọn vẹn ở cả Backend (NestJS, Mongoose) lẫn Frontend (React Ant Design):

### 👤 THÀNH VIÊN 1: Module Kho Chart & Tương Tác (Trưởng nhóm)
- **Nhánh Git:** `dev_trangdtt` (hoặc `feature/member-1`)
- **Backend:** 
  - Module Patterns: Viết đầy đủ API CRUD (`GET`, `POST`, `PUT`, `DELETE /api/patterns`), tìm kiếm Regex theo tên/nguyên liệu, lọc Category & Difficulty, tăng view và like bằng toán tử atomic `$inc`. DTOs `CreatePatternDto`, `UpdatePatternDto`.
  - Module Comments: Viết API `GET /api/comments?patternId=...` và `POST /api/comments`, validate `CreateCommentDto`, tự động sinh avatar Dicebear.
- **Frontend:**
  - Trang Chủ (`HomePage.tsx`): Carousel Banner, Mẫu Chart Nổi Bật.
  - Kho Chart (`PatternsPage.tsx`): Bộ lọc danh mục, độ khó, thanh tìm kiếm Debounce 250ms, đồng bộ URL params hai chiều.
  - Chi Tiết Chart (`PatternDetailPage.tsx`): Xem công thức móc R1, R2... theo từng bộ phận, checklist nguyên liệu/dụng cụ dạng checkbox, nút Thả tim gọi API, form gửi đánh giá sao kèm reload danh sách tức thì.
  - Widget Đếm Hàng (`RowCounter.tsx`): Âm thanh tiếng bíp chân thực (Web Audio API) + Lưu tiến độ theo từng mẫu chart vào `localStorage`.

### 👤 THÀNH VIÊN 2: Module Gian Hàng, Giỏ Hàng & Đơn Hàng (E-Commerce)
- **Nhánh Git:** `feature/member-2`
- **Backend:**
  - Module Products: Viết đầy đủ API CRUD (`GET`, `POST`, `PUT`, `DELETE /api/products`), lọc danh mục phụ kiện, tìm kiếm sản phẩm.
  - Module Orders: Xây dựng mới `OrderSchema` (sub-document `items`), API `POST /api/orders` tạo đơn hàng, sinh mã tự động `ORD-XXXXXX`, API `GET /api/orders/lookup` tra cứu theo SĐT/mã đơn, API `PATCH /api/orders/:id/status` đổi trạng thái. DTO `CreateOrderDto`.
- **Frontend:**
  - Trang Phụ Kiện (`AccessoriesPage.tsx`): Tabs danh mục, thẻ sản phẩm, nút thêm giỏ hàng.
  - Chi Tiết Sản Phẩm (`ProductDetailPage.tsx`): Xem ảnh to, giá khuyến mãi, chọn số lượng, nút Mua ngay.
  - Giỏ Hàng & Đặt Hàng (`CartPage.tsx`): Quản lý số lượng, tính tổng tiền VNĐ, form nhận hàng kết nối API tạo đơn thật và popup hiển thị mã đơn hàng.
  - Tra cứu đơn hàng: Popup tra cứu lịch sử mua hàng qua Số điện thoại.

### 👤 THÀNH VIÊN 3: Module Cẩm Nang Blog & Trang Quản Trị (Admin Dashboard)
- **Nhánh Git:** `feature/member-3`
- **Backend:**
  - Module Blogs: Viết đầy đủ API CRUD (`GET`, `POST`, `PUT`, `DELETE /api/blogs`), chi tiết bài viết tăng view theo slug.
  - Module Categories: Viết đầy đủ API CRUD (`GET`, `POST`, `PUT`, `DELETE /api/categories`) cho cả chart và phụ kiện.
  - Tối ưu cấu hình: Bật Global `ValidationPipe`, xử lý Exception Filter toàn cục.
- **Frontend:**
  - Trang Blog (`BlogPage.tsx`, `BlogDetailPage.tsx`): Cẩm nang mẹo hay đan móc, đọc bài theo slug thân thiện SEO.
  - Trang Quản Trị Tối Giản (`AdminPage.tsx`):
    - 3 Thẻ thống kê tổng quan (Đơn hàng, Mẫu chart, Phụ kiện).
    - Tab Quản lý Đơn hàng: Đổi trạng thái đơn, xem chi tiết món đặt, xóa đơn.
    - Tab Quản lý Chart: Xem bảng, Modal thêm mới chart, nút xóa chart.
    - Tab Quản lý Phụ kiện: Xem bảng, Modal thêm mới sản phẩm, cập nhật kho, xóa sản phẩm.

---

## 4. DANH MỤC RESTFUL API ĐÃ TRIỂN KHAI

| Nhóm | Phương thức | Đường dẫn (Endpoint) | Chức năng |
| :--- | :--- | :--- | :--- |
| **Patterns** | `GET` | `/api/patterns` | Danh sách chart (tìm kiếm `q`, lọc `category`, `difficulty`) |
| | `GET` | `/api/patterns/featured` | Top chart nhiều lượt xem và yêu thích nhất |
| | `GET` | `/api/patterns/:id` | Chi tiết chart (tự động tăng view qua `$inc`) |
| | `PATCH` | `/api/patterns/:id/like` | Thả tim chart (tự động tăng like qua `$inc`) |
| | `POST` | `/api/patterns` | Thêm mới mẫu chart (có DTO validate) |
| | `PUT` | `/api/patterns/:id` | Cập nhật thông tin chart |
| | `DELETE`| `/api/patterns/:id` | Xóa mẫu chart khỏi database |
| **Comments** | `GET` | `/api/comments?patternId=...` | Danh sách đánh giá & nhận xét của chart |
| | `POST` | `/api/comments` | Gửi bình luận mới (sao 1-5, họ tên, nội dung) |
| **Products** | `GET` | `/api/products` | Danh sách phụ kiện & dụng cụ len |
| | `GET` | `/api/products/:id` | Chi tiết phụ kiện |
| | `POST` | `/api/products` | Thêm mới sản phẩm phụ kiện |
| | `PUT` | `/api/products/:id` | Sửa thông tin sản phẩm |
| | `DELETE`| `/api/products/:id` | Xóa sản phẩm khỏi database |
| **Orders** | `POST` | `/api/orders` | Khách gửi đơn đặt hàng từ giỏ hàng |
| | `GET` | `/api/orders` | Lấy danh sách toàn bộ đơn hàng (cho Admin) |
| | `GET` | `/api/orders/lookup?q=...` | Tra cứu đơn hàng theo Mã đơn hoặc Số điện thoại |
| | `PATCH` | `/api/orders/:id/status` | Đổi trạng thái (`Chờ xác nhận`, `Đang xử lý`, `Đã giao`, `Đã hủy`) |
| | `DELETE`| `/api/orders/:id` | Xóa đơn hàng |
| **Blogs** | `GET` | `/api/blogs` | Danh sách bài viết cẩm nang đan móc |
| | `GET` | `/api/blogs/:idOrSlug` | Xem chi tiết bài viết (tăng views) |
| **Categories**| `GET` | `/api/categories` | Lấy danh mục (`?type=pattern\|product`) |
| | `POST` | `/api/categories` | Thêm mới danh mục |
| | `DELETE`| `/api/categories/:id` | Xóa danh mục |

---

## 5. ĐÁP ỨNG TIÊU CHUẨN ĐỒ ÁN MÔN SDN302

1. **Kiến trúc Module - Controller - Service - Schema:** Tách biệt rõ ràng từng lớp nghiệp vụ theo chuẩn NestJS hiện đại.
2. **Quan hệ Mongoose & Populate:** Áp dụng liên kết giữa `Category` ref `Pattern`, `Category` ref `Product`, `Pattern` ref `Comment` bằng `Types.ObjectId` và gọi `.populate()`.
3. **Toán tử Atomic `$inc`:** Tăng view và like trực tiếp tại MongoDB engine, chống race-condition.
4. **Validation Pipe:** Sử dụng `class-validator` và `class-transformer` kiểm soát toàn bộ dữ liệu gửi lên server.
5. **UI/UX React Vite:** Phản hồi nhanh tức thì, thông báo Toast Ant Design ấm áp, thân thiện, có âm thanh Web Audio và lưu tiến độ `localStorage`.
