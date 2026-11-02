# MASTER WORKFLOW FOR SDN302 PROJECT (NESTJS + REACT VITE)

Quy trình phát triển dự án môn học SDN302: **Đơn giản - Rõ ràng - Chạy thật**.

## 1. MỤC TIÊU DỰ ÁN
- Xây dựng ứng dụng hoàn chỉnh theo mô hình Client-Server.
- Frontend: React + Vite (Port 5173).
- Backend: NestJS REST API (Port 3000) kết nối MongoDB qua Mongoose.
- Dữ liệu: 100% dữ liệu từ MongoDB thật (thông qua seed data).

## 2. QUY TRÌNH THỰC HIỆN
1. **Khởi tạo dự án Server (NestJS):**
   - Thiết lập cấu trúc Module, Controller, Service, Mongoose Schemas (Category, Pattern, Product, Blog, Comment).
   - Kịch bản seed data tự động nạp dữ liệu phong phú vào MongoDB.
2. **Khởi tạo dự án Client (React + Vite):**
   - Cài đặt React + Vite, Ant Design, Axios, React Router DOM.
   - Xây dựng các trang: Home, Patterns, PatternDetail, Accessories, Blog, Basket.
3. **Kết nối API & Tích hợp:**
   - Cấu hình CORS ở NestJS, gọi API từ React Vite.
4. **Kiểm thử & Bàn giao:**
   - Kiểm tra toàn diện mọi tính năng và hướng dẫn khởi chạy.
