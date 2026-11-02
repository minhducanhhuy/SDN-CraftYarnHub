# UI/UX & TÍNH NĂNG MÔ HỌC SDN302

1. **Học hỏi bố cục từ dự án cũ:**
   - Kế thừa bố cục visual nhẹ nhàng, ấm áp, tông màu pastel đặc trưng của chủ đề len sợi.
   - Header linh hoạt có logo, thanh tìm kiếm, menu điều hướng và giỏ hàng.
   - Kho Chart có lọc danh mục (Rau củ, Con vật, Hoa lá...), lọc độ khó (Dễ, Vừa, Khó), tìm kiếm tức thì.
   - Trang Chi tiết Chart hiển thị trực quan: hình ảnh, danh sách nguyên liệu, dụng cụ, các dòng chart (R1, R2...), bộ đếm hàng (row counter) và khu vực bình luận tương tác.
   - Trang Phụ Kiện: Danh sách len sợi, kim móc, dụng cụ với lọc theo loại và thêm vào giỏ.
   - Trang Blog: Bài viết cẩm nang chia sẻ kỹ thuật đan móc.

2. **Dữ liệu thật từ MongoDB:**
   - Không sử dụng dữ liệu giả (mock data) trong component. Mọi dữ liệu đều được fetch từ API backend và render lên giao diện.
