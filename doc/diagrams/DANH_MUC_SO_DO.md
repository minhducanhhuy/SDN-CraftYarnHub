# DANH MỤC & CHÚ THÍCH BỘ SƠ ĐỒ HỆ THỐNG CRAFTYARNHUB
## (CraftYarnHub System Diagrams Catalog & Specifications)

**Dự án:** CraftYarnHub – Hệ Thống Quản Lý & Chia Sẻ Chart Móc Len & Phụ Kiện Handmade  
**Môn học:** SDN302 – Server-side Development with NodeJS, Express & MongoDB (FPT University)  
**Nhóm sinh viên thực hiện:**  
- **Thành viên 1 (Trưởng nhóm):** Đinh Thị Thu Trang – MSSV: HE195077  
- **Thành viên 2:** Nguyễn Thị Thắm – MSSV: HE191525  
- **Thành viên 3:** Nguyễn Minh Đức – MSSV: HE194336  
**Phiên bản:** 1.0 Final  
**Định dạng hình ảnh:** Hỗ trợ song song cả **PNG** (ảnh độ nét cao nhúng báo cáo Word/PDF) và **SVG** (ảnh vector phóng to không vỡ nét).  
**Trang xem trực quan tương tác:** [`view_diagrams.html`](./view_diagrams.html)

---

## BẢNG TỔNG HỢP DANH MỤC 11 SƠ ĐỒ HỆ THỐNG

| STT | Mã Sơ Đồ | Tên Sơ Đồ Tiếng Việt | Loại Sơ Đồ (UML / Architectural) | Tệp Ảnh PNG | Tệp Ảnh SVG | Tệp Mã Nguồn MMD |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `DIA-01` | **Sơ Đồ Ngữ Cảnh Hệ Thống (Context Diagram)** | Architecture / Data Flow | [`01_context_diagram.png`](./images/01_context_diagram.png) | [`01_context_diagram.svg`](./images/01_context_diagram.svg) | [`01_context_diagram.mmd`](./01_context_diagram.mmd) |
| **02** | `DIA-02` | **Sơ Đồ Use Case Tổng Thể (16 Chức Năng)** | Use Case Diagram | [`02_system_usecase_diagram.png`](./images/02_system_usecase_diagram.png) | [`02_system_usecase_diagram.svg`](./images/02_system_usecase_diagram.svg) | [`02_system_usecase_diagram.mmd`](./02_system_usecase_diagram.mmd) |
| **03** | `DIA-03` | **Sơ Đồ Tuần Tự Quy Trình Đặt Hàng** | Sequence Diagram | [`03_sequence_checkout_order.png`](./images/03_sequence_checkout_order.png) | [`03_sequence_checkout_order.svg`](./images/03_sequence_checkout_order.svg) | [`03_sequence_checkout_order.mmd`](./03_sequence_checkout_order.mmd) |
| **04** | `DIA-04` | **Sơ Đồ Tuần Tự Xem Chi Tiết & Thả Tim Chart** | Sequence Diagram | [`04_sequence_view_like_pattern.png`](./images/04_sequence_view_like_pattern.png) | [`04_sequence_view_like_pattern.svg`](./images/04_sequence_view_like_pattern.svg) | [`04_sequence_view_like_pattern.mmd`](./04_sequence_view_like_pattern.mmd) |
| **05** | `DIA-05` | **Sơ Đồ Tuần Tự Gửi Đánh Giá & Bình Luận Sao** | Sequence Diagram | [`05_sequence_submit_comment.png`](./images/05_sequence_submit_comment.png) | [`05_sequence_submit_comment.svg`](./images/05_sequence_submit_comment.svg) | [`05_sequence_submit_comment.mmd`](./05_sequence_submit_comment.mmd) |
| **06** | `DIA-06` | **Sơ Đồ Hoạt Động Quy Trình Thanh Toán Giỏ Hàng** | Activity Diagram | [`06_activity_checkout.png`](./images/06_activity_checkout.png) | [`06_activity_checkout.svg`](./images/06_activity_checkout.svg) | [`06_activity_checkout.mmd`](./06_activity_checkout.mmd) |
| **07** | `DIA-07` | **Sơ Đồ Hoạt Động Trợ Lý Đếm Hàng Móc Len** | Activity Diagram | [`07_activity_row_counter.png`](./images/07_activity_row_counter.png) | [`07_activity_row_counter.svg`](./images/07_activity_row_counter.svg) | [`07_activity_row_counter.mmd`](./07_activity_row_counter.mmd) |
| **08** | `DIA-08` | **Sơ Đồ Máy Trạng Thái Đơn Hàng (State Machine)** | State Machine Diagram | [`08_state_order_status.png`](./images/08_state_order_status.png) | [`08_state_order_status.svg`](./images/08_state_order_status.svg) | [`08_state_order_status.mmd`](./08_state_order_status.mmd) |
| **09** | `DIA-09` | **Sơ Đồ Lớp Thực Thể Dữ Liệu (Class Diagram)** | Class Diagram | [`09_class_diagram_entities.png`](./images/09_class_diagram_entities.png) | [`09_class_diagram_entities.svg`](./images/09_class_diagram_entities.svg) | [`09_class_diagram_entities.mmd`](./09_class_diagram_entities.mmd) |
| **10** | `DIA-10` | **Sơ Đồ Thành Phần Vật Lý (Component Diagram)** | Component Diagram | [`10_component_diagram.png`](./images/10_component_diagram.png) | [`10_component_diagram.svg`](./images/10_component_diagram.svg) | [`10_component_diagram.mmd`](./10_component_diagram.mmd) |
| **11** | `DIA-11` | **Sơ Đồ Quan Hệ Thực Thể CSDL MongoDB (ERD)** | Entity-Relationship Diagram | [`11_database_erd.png`](./images/11_database_erd.png) | [`11_database_erd.svg`](./images/11_database_erd.svg) | [`11_database_erd.mmd`](./11_database_erd.mmd) |

---

## CHI TIẾT & CHÚ THÍCH TỪNG SƠ ĐỒ

### 1. Sơ Đồ Ngữ Cảnh Hệ Thống (Context Diagram - DIA-01)
- **Tệp hình ảnh:** `images/01_context_diagram.png`
- **Mục đích & Ý nghĩa:** Thể hiện ranh giới ngoài của ứng dụng CraftYarnHub, các luồng trao đổi dữ liệu hai chiều giữa 2 nhóm tác nhân (Khách vãng lai/Thợ móc len và Quản trị viên) với hệ thống lõi NestJS Server và cụm CSDL MongoDB.

---

### 2. Sơ Đồ Use Case Tổng Thể (System Use Case Diagram - DIA-02)
- **Tệp hình ảnh:** `images/02_system_usecase_diagram.png`
- **Mục đích & Ý nghĩa:** Phân rã trực quan toàn bộ 16 trường hợp sử dụng (Use Cases) được chia thành 2 phân hệ rõ rệt:
  - Phân hệ Khách hàng (`Visitor / Customer`): 11 Use Cases (từ UC-01 đến UC-11).
  - Phân hệ Quản trị (`Administrator`): 5 Use Cases (từ UC-12 đến UC-16).

---

### 3. Sơ Đồ Tuần Tự Quy Trình Đặt Hàng (Sequence Checkout Order - DIA-03)
- **Tệp hình ảnh:** `images/03_sequence_checkout_order.png`
- **Mục đích & Ý nghĩa:** Đặc tả trình tự gửi thông điệp thời gian thực giữa Khách hàng $\rightarrow$ `CartPage` $\rightarrow$ `OrdersController` $\rightarrow$ `OrdersService` $\rightarrow$ MongoDB Database. Thể hiện cơ chế tự sinh mã `ORD-xxxx`, lưu mảng Sub-document `items` và xóa rỗng giỏ hàng sau khi thành công.

---

### 4. Sơ Đồ Tuần Tự Xem Chi Tiết & Thả Tim Chart (Sequence View & Like - DIA-04)
- **Tệp hình ảnh:** `images/04_sequence_view_like_pattern.png`
- **Mục đích & Ý nghĩa:** Thể hiện cơ chế tăng biến đếm nguyên tử (`$inc`) trong MongoDB thông qua API NestJS mà không bị xung đột dữ liệu (Race Condition) khi nhiều người truy cập đồng thời.

---

### 5. Sơ Đồ Tuần Tự Gửi Đánh Giá & Bình Luận (Sequence Submit Comment - DIA-05)
- **Tệp hình ảnh:** `images/05_sequence_submit_comment.png`
- **Mục đích & Ý nghĩa:** Mô tả luồng gửi nhận xét kèm số sao (1-5 sao) của người dùng vào mẫu chart, NestJS kiểm tra `patternId` qua MongoDB quan hệ và phản hồi danh sách cập nhật cho client.

---

### 6. Sơ Đồ Hoạt Động Quy Trình Thanh Toán Giỏ Hàng (Activity Checkout - DIA-06)
- **Tệp hình ảnh:** `images/06_activity_checkout.png`
- **Mục đích & Ý nghĩa:** Đặc tả lưu đồ quyết định (decision nodes) khi khách hàng nhập form đặt hàng: xác thực số điện thoại 10 số, kiểm tra tồn kho, tạo đơn hàng MongoDB, làm sạch giỏ hàng và dẫn hướng tới màn hình xác nhận.

---

### 7. Sơ Đồ Hoạt Động Trợ Lý Đếm Hàng Móc Len (Activity Row Counter - DIA-07)
- **Tệp hình ảnh:** `images/07_activity_row_counter.png`
- **Mục đích & Ý nghĩa:** Mô tả vòng lặp thao tác của thợ móc len: bấm nút tăng dòng $\rightarrow$ kích hoạt Web Audio API phát tiếng bíp sine $\rightarrow$ cập nhật State và đồng bộ `localStorage` theo `patternId`.

---

### 8. Sơ Đồ Máy Trạng Thái Đơn Hàng (State Machine Order Status - DIA-08)
- **Tệp hình ảnh:** `images/08_state_order_status.png`
- **Mục đích & Ý nghĩa:** Đặc tả chu trình chuyển đổi trạng thái của đơn hàng từ khi tạo mới: `Chờ xác nhận` $\rightarrow$ `Đã xác nhận` $\rightarrow$ `Đang giao hàng` $\rightarrow$ `Đã giao hàng`, hoặc hủy đơn `Đã hủy`.

---

### 9. Sơ Đồ Lớp Thực Thể Dữ Liệu (Class Diagram - DIA-09)
- **Tệp hình ảnh:** `images/09_class_diagram_entities.png`
- **Mục đích & Ý nghĩa:** Biểu diễn các lớp Domain Model và quan hệ giữa chúng (`Category`, `Pattern`, `OrderItem`, `Order`, `Product`, `Comment`, `Blog`).

---

### 10. Sơ Đồ Thành Phần Vật Lý Hệ Thống (Component Diagram - DIA-10)
- **Tệp hình ảnh:** `images/10_component_diagram.png`
- **Mục đích & Ý nghĩa:** Biểu diễn kiến trúc phân tầng Client-Server: Tầng hiển thị (React Vite + Ant Design), Tầng API Gateway & Dịch vụ (NestJS REST API), và Tầng lưu trữ (MongoDB Mongoose ODM).

---

### 11. Sơ Đồ Quan Hệ Thực Thể CSDL MongoDB (Database ERD - DIA-11)
- **Tệp hình ảnh:** `images/11_database_erd.png`
- **Mục đích & Ý nghĩa:** Thể hiện chi tiết cấu trúc 6 Collections trong MongoDB (`categories`, `patterns`, `products`, `orders`, `comments`, `blogs`), bao gồm khóa chính `_id`, khóa ngoại `ObjectId ref`, các trường dữ liệu và quan hệ 1:N giữa các bảng.

