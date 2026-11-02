# SDN302 COURSE PROJECT RULES & GUIDELINES

Dự án môn học: **SDN302 - Server-side Development with NodeJS, Express & MongoDB (FPT University)**
Đề tài: **Hệ thống Quản lý & Chia sẻ Chart Móc Len (Crochet Chart & Accessories)**
Mô hình kiến trúc: **Client - Server Architecture**

---

## 1. NGUYÊN TẮC HÀNG ĐẦU: ĐƠN GIẢN, DỄ HIỂU & TRÔI CHẢY

1. **Chuẩn đồ án sinh viên môn SDN302:**
   - Mã nguồn sạch sẽ, tường minh, cấu trúc thư mục rõ ràng theo module.
   - Flow làm việc trôi chảy, chủ động triển khai code hoàn chỉnh, chạy được ngay.
   - Code dễ đọc, dễ giải thích cấu trúc Module - Controller - Service khi bảo vệ đồ án trước giảng viên.

2. **Mô hình Client - Server tách biệt:**
   - **Frontend (Client):** `React + Vite` (gọn nhẹ, hot-reload tức thì, sử dụng Ant Design / Lucide Icons theo phong cách ấm áp của dự án cũ, chạy tại port 5173).
   - **Backend (Server):** `NestJS` (Module - Controller - Service - Schema Mongoose, chuẩn Slot 17-19 giáo trình SDN302, chạy tại port 3000, cấu hình CORS đầy đủ cho React Vite gọi tới).
   - **Database:** `MongoDB` kết nối qua `@nestjs/mongoose` và `mongoose` (chuẩn giáo trình SDN302).

3. **Nói không với Mock Data:**
   - Tất cả dữ liệu hiển thị trên Client đều được lấy từ MongoDB qua API của Backend NestJS.
   - Có kịch bản Seed Script (`npm run seed`) nạp sẵn dữ liệu thật, phong phú và đẹp mắt vào MongoDB (Charts, Danh mục, Phụ kiện len, Bài viết blog...).

---

## 2. TIÊU CHUẨN BACKEND (NESTJS + MONGOOSE REST API)

1. **Chuẩn RESTful API:**
   - Sử dụng đúng HTTP Methods: `@Get()`, `@Post()`, `@Put()` / `@Patch()`, `@Delete()`.
   - Trả về đúng HTTP Status Codes:
     - `200 OK`: Thành công với dữ liệu.
     - `201 Created`: Tạo mới thành công.
     - `400 Bad Request`: Lỗi validation / dữ liệu gửi lên không hợp lệ.
     - `404 Not Found`: Không tìm thấy bản ghi.
     - `500 Internal Server Error`: Lỗi máy chủ hoặc database.
   - Format response thống nhất:
     ```json
     {
       "success": true,
       "data": { ... },
       "message": "Thành công"
     }
     ```

2. **Mongoose Schema & Modules:**
   - Đặt trong thư mục `server/src/modules/<feature>/` (gồm: `schemas/`, `<feature>.controller.ts`, `<feature>.service.ts`, `<feature>.module.ts`).
   - Có validation cơ bản: `@Prop({ required: true, trim: true })`.
   - Sử dụng quan hệ giữa các Model (như `category: { type: Types.ObjectId, ref: 'Category' }`) và hàm `.populate()` để thể hiện kiến thức môn SDN302.

3. **CORS & Middleware:**
   - Bật `app.enableCors({ origin: 'http://localhost:5173' })` để Client React Vite gọi API không bị lỗi CORS policy.

---

## 3. TIÊU CHUẨN FRONTEND (REACT + VITE)

1. **Giao diện & Trải nghiệm (UI/UX):**
   - Kế thừa trọn vẹn bố cục thân thiện, hiện đại của bản cũ:
     - Header / Navbar (Trang chủ, Kho Chart, Phụ kiện, Blog, Giỏ hàng).
     - Hero Banner & Carousel ấm cúng phong cách đan len.
     - Bộ lọc danh mục (Tags, Search bar, Độ khó).
     - Chi tiết Chart (Hình ảnh, Dụng cụ/Len cần chuẩn bị, Các bước móc chi tiết R1, R2... kèm tính năng đếm dòng).
     - Phụ kiện & Dụng cụ (sản phẩm len, kim móc, đặt hàng/giỏ hàng).
     - Blog chia sẻ mẹo đan móc len.
   - Giao diện phản hồi nhanh, có trạng thái Loading và thông báo thân thiện.

2. **Gọi API:**
   - Tập trung các hàm fetch API vào thư mục `src/services/` bằng `axios`.
   - Dễ dàng cấu hình URL backend qua biến môi trường `.env` (`VITE_API_URL=http://localhost:3000/api`).

---

## 4. QUY TRÌNH HỢP TÁC & TRIỂN KHAI

- AI chủ động hoàn thiện từng module trọn vẹn (Backend API + Database Model + Seed Data + Frontend UI).
- Cung cấp lệnh khởi chạy đơn giản, rõ ràng để người dùng chạy và nghiệm thu ngay lập tức.
