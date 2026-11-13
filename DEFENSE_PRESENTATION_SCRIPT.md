# KỊCH BẢN BẢO VỆ & THUYẾT TRÌNH ĐỒ ÁN MÔN HỌC SDN302 (CHI TIẾT & CHUYÊN SÂU)
## ĐỀ TÀI: CRAFTYARNHUB – TIỆM LEN XINH (HỆ THỐNG QUẢN LÝ & CHIA SẺ CHART MÓC LEN & PHỤ KIỆN)

---

## PHẦN 1: BỐI CẢNH, LÝ DO CHỌN ĐỀ TÀI & GIẢI PHÁP HỆ THỐNG
*(Dành cho Trưởng nhóm hoặc đại diện nhóm mở đầu – Thời lượng gợi ý: 3 - 4 phút)*

### 1. Bối Cảnh Thực Tế (Background Context)
> *"Kính thưa Thầy/Cô và các bạn, trong những năm gần đây, phong trào thủ công đan móc len (Crochet & Thú bông Amigurumi) đã bùng nổ mạnh mẽ, đặc biệt là trong giới trẻ Gen Z, sinh viên và nhân viên văn phòng. Đan móc len không chỉ là sở thích làm quà tặng độc bản, bảo vệ môi trường mà còn là một liệu pháp chữa lành (healing therapy), giúp giảm căng thẳng sau những giờ học tập và làm việc."*

- **Thực trạng cộng đồng:** Hiện tại ở Việt Nam có hàng trăm hội nhóm đan móc với hàng triệu thành viên (ví dụ: *Hội Móc Len Amigurumi Việt Nam*, *Mê Đan Móc*...). Nhu cầu tìm kiếm công thức (gọi là **Chart móc**) và tìm mua phụ kiện (len sợi, kim móc, mắt thú, gòn bi) diễn ra từng phút từng giờ.
- **Tuy nhiên, thị trường hiện tại đang rất phân mảnh:** Người đan móc phải tìm chart ở một nơi (Pinterest, Facebook, TikTok), tra cứu từ viết tắt ở một nơi khác, và phải lặn lội lên nhiều sàn thương mại điện tử khác nhau để gom từng món phụ kiện nhỏ lẻ.

---

### 2. Bốn "Nỗi Đau" Lớn Của Người Đan Móc Len (Pain Points & Lý Do Chọn Đề Tài)
Xuất phát từ trải nghiệm thực tế của chính những người mê đan móc, nhóm nhận thấy 4 vấn đề nhức nhối:

1. **Công thức móc (Chart) trôi nổi, thiếu chuẩn hóa và khó dịch:**
   - Đa số chart đẹp trên mạng là tiếng Anh, tiếng Trung hoặc tiếng Nga viết tắt (`sc`, `inc`, `dec`, `ch`, `slst`...). Người mới bắt đầu (Beginner) gần như "bất lực" không thể đọc hiểu.
   - Các bài đăng trên Facebook dễ bị trôi bài, mất liên kết ảnh, không có bộ lọc phân loại theo độ khó (Dễ – Vừa – Khó) khiến người mới hay chọn nhầm mẫu quá khó rồi nản lòng bỏ cuộc.
2. **Nỗi ám ảnh "Quên số hàng đang móc" (The Lost Row Problem):**
   - Đan móc đòi hỏi phải đếm từng mũi và từng hàng (ví dụ: từ Hàng 1 đến Hàng 45).
   - Chỉ cần có người gọi hoặc lướt điện thoại 1 phút là người thợ quên mất mình đang móc ở Hàng 12 hay Hàng 13. Hậu quả là sản phẩm bị méo mó, lệch form và phải **tháo toàn bộ len ra làm lại từ đầu**, gây ức chế và tốn thời gian.
   - Các ứng dụng đếm hàng hiện có trên App Store/CH Play là app độc lập, không gắn liền với bản chart đang đọc, khiến người dùng phải chuyển đổi qua lại giữa nhiều màn hình rất bất tiện.
3. **Mất nhiều công sức chuẩn bị nguyên liệu (Preparation Barrier):**
   - Một mẫu chart móc cần rất nhiều loại phụ kiện: Len milk bò 50g màu vàng, kim móc 2.5mm, bông gòn bi, mắt thú an toàn 8mm, kim khâu len...
   - Người móc không có danh sách checklist rõ ràng để biết mình đã có món gì và còn thiếu món gì, dẫn đến việc đặt hàng thiếu trước hụt sau.
4. **Không có hệ sinh thái kết nối giữa "Nội dung" và "Mua sắm":**
   - Người xem thấy chart đẹp muốn làm ngay nhưng không biết mua đúng loại len sợi và kim móc ở đâu cho chuẩn kích cỡ; ngược lại các shop bán len thì không có thư viện chart để kích thích khách hàng mua sắm.

---

### 3. Giải Pháp Toàn Diện Của CraftYarnHub (System Solution)
Dự án **CraftYarnHub (Tiệm Len Xinh)** ra đời nhằm giải quyết triệt để 4 nỗi đau trên bằng một nền tảng Web All-in-One:

1. **Chuẩn hóa thư viện Chart móc tiếng Việt:**
   - Mọi chart đều được biên dịch sang thuật ngữ tiếng Việt chuẩn (`X: mũi đơn`, `V: tăng mũi`, `A: giảm mũi`), phân loại theo từng bộ phận (Đầu, Thân, Tay, Tai...) và từng hàng (R1, R2, R3...).
   - Bộ lọc thông minh theo Danh mục và Độ khó kèm thanh tìm kiếm tức thì.
2. **Trợ lý đếm hàng thông minh tích hợp Web Audio API (Row Counter):**
   - Widget đếm hàng nằm ngay bên cạnh công thức móc.
   - Mỗi lần bấm tăng hàng, hệ thống phát ra **tiếng bíp sóng sin (800Hz)** vui tai, phản hồi xúc giác giúp người thợ tập trung móc mà không cần nhìn chằm chằm vào màn hình.
   - Tự động lưu vết tiến độ vào `localStorage` theo từng mẫu chart: tắt máy, tắt trình duyệt mở lại vẫn còn nguyên số hàng đang móc dở.
3. **Checklist dụng cụ tương tác & Liên kết gian hàng phụ kiện:**
   - Bảng Checklist nguyên liệu cho phép tick chọn các món đã chuẩn bị.
   - Tích hợp gian hàng len sợi chính hãng, khách bấm mua trực tiếp các phụ kiện cần thiết chỉ với 1 click.
4. **Quy trình đặt hàng tinh gọn & Tra cứu đơn không cần đăng nhập:**
   - Giỏ hàng động tính toán tiền tự động, tạo đơn hàng lưu MongoDB với mã `ORD-XXXXXX`.
   - Khách chỉ cần nhập Số điện thoại là tra cứu được tiến độ đơn hàng tức thì.
5. **Cổng quản trị Admin tập trung (Full CRUD):**
   - Đăng nhập bảo mật để quản lý toàn diện Chart, Phụ kiện, cập nhật trạng thái giao vận đơn hàng và xem số liệu doanh thu thời gian thực.

---

## PHẦN 2: PHÂN CHIA VÀ REVIEW CHI TIẾT TỪNG THÀNH VIÊN
*(Mỗi thành viên trình bày sâu từ 3 - 4 phút về nghiệp vụ, flow giao diện và code Backend của mình)*

Dự án áp dụng mô hình phân chia **Vertical Slice (Mỗi thành viên chịu trách nhiệm Full-Stack một phân hệ độc lập: Database Schema $\rightarrow$ Controller & Service NestJS $\rightarrow$ Frontend UI React)**.

---

### 👤 THÀNH VIÊN 1: NGUYỄN ĐỨC ANH HUY (LEADER - FULLSTACK LEAD)
- **Nhánh Git:** `dev_trangdtt` (Merge vào `main`)
- **Phân hệ phụ trách:** **Kho Chart Móc Len & Tương Tác Cộng Đồng (Core System Module)**
- **Khối lượng công việc:** ~34% dự án.

#### 1. Chi Tiết Các Chức Năng Nghiệp Vụ Đảm Nhiệm:
1. **Nghiệp vụ Tìm kiếm & Phân loại Kho Chart:**
   - Xây dựng thanh tìm kiếm từ khóa linh hoạt bằng MongoDB Regex: tìm kiếm không phân biệt hoa thường theo tên chart, tác giả, hoặc tên nguyên liệu.
   - Tích hợp kỹ thuật **Debounce 250ms** trên ô tìm kiếm ở Client: người dùng gõ phím liên tục sẽ không bị bắn request dồn dập lên server, chỉ khi dừng gõ 250ms thì mới gửi API.
   - Đồng bộ bộ lọc hai chiều với URL Search Params (`?q=...&category=...&difficulty=...`): người dùng có thể copy đường link chia sẻ cho bạn bè mà vẫn giữ nguyên kết quả lọc.
2. **Nghiệp vụ Chi Tiết Chart & Công Thức Đan Móc Từng Bước:**
   - Hiển thị công thức móc cấu trúc lồng nhau (Mixed Type trong Mongoose): phân chia từng bộ phận (Đầu, Tai, Thân, Chân, Khâu ráp) kèm số mũi tổng kết ở cuối mỗi hàng.
   - Tích hợp bảng **Checklist Dụng cụ & Len sợi**: người dùng tick chọn các món đã có sẵn để chuẩn bị đồ móc.
3. **Nghiệp vụ Trợ Lý Đếm Hàng Móc Len (Row Counter):**
   - Thiết kế bộ đếm hàng trực quan nổi bật: nút Tăng hàng (+1), Giảm hàng (-1), Đặt lại về 0 (Reset).
   - Tích hợp **Web Audio API** tạo bộ dao động sóng sin (`OscillatorNode`) phát tiếng bíp 800Hz trong 0.1 giây mỗi khi bấm tăng hàng mà không cần tải file MP3 từ mạng, đảm bảo độ trễ gần như bằng 0 (< 10ms).
   - Tự động lưu tiến độ vào `localStorage` theo khóa `row_counter_patternId`: người dùng móc nhiều chart cùng lúc thì mỗi chart đều nhớ số hàng riêng biệt.
4. **Nghiệp vụ Tương Tác Cộng Đồng (Like & Bình Luận Đánh Giá):**
   - Thả tim tăng like thời gian thực sử dụng toán tử nguyên tử MongoDB `$inc`.
   - Gửi đánh giá sao (1 đến 5 sao) và nhận xét; tự động sinh avatar ngẫu nhiên qua API Dicebear; tự động reload danh sách bình luận ngay lập tức.
5. **Nghiệp vụ Trang Chủ (Showcase):**
   - Carousel Banner hiệu ứng trượt mượt mà giới thiệu các bộ sưu tập len mới.
   - Khu vực "Chart Nổi Bật Được Yêu Thích Nhất" gọi API `GET /api/patterns/featured` lấy top chart có lượt xem và like cao nhất.

#### 2. Review Code Then Chốt (Code Walkthrough):
- **Toán tử nguyên tử `$inc` chống Race Condition (`patterns.service.ts`):**
  ```typescript
  // Tăng lượt xem tự động khi khách xem chi tiết
  async findById(id: string): Promise<Pattern> {
    const pattern = await this.patternModel
      .findByIdAndUpdate(id, { $inc: { view_count: 1 } }, { new: true })
      .populate('category')
      .exec();
    if (!pattern) throw new NotFoundException('Không tìm thấy mẫu chart!');
    return pattern;
  }

  // Thả tim tăng like nguyên tử tại database engine
  async like(id: string): Promise<Pattern> {
    return this.patternModel
      .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .exec();
  }
  ```
- **Tạo âm thanh sóng sin bằng Web Audio API (`RowCounter.tsx`):**
  ```typescript
  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio not supported', e);
    }
  };
  ```

#### 3. Kịch Bản Demo Trực Tiếp Trên Web:
1. Mở trang chủ [http://localhost:5173/](http://localhost:5173/): chỉ vào Carousel và Top Chart nhiều like.
2. Vào trang Kho Chart [http://localhost:5173/patterns](http://localhost:5173/patterns): gõ từ khóa `"hoa"` $\rightarrow$ thấy bộ lọc debounce mượt mà; chọn độ khó `"Dễ"` $\rightarrow$ chỉ hiện mẫu dễ.
3. Click vào chart "Chậu Cây Hướng Dương Mini":
   - Bấm nút Thả tim $\rightarrow$ số like tăng tức thì từ 128 lên 129 (kiểm tra MongoDB thấy `likes` tăng).
   - Thử nghiệm Trợ lý đếm hàng: bấm nút "+" $\rightarrow$ **loa phát tiếng bíp**, số hàng nhảy lên 1, 2, 3... F5 tải lại trang $\rightarrow$ **số hàng vẫn giữ nguyên** nhờ `localStorage`.
   - Cuộn xuống form Bình luận: nhập tên "Bảo Trâm", chấm 5 sao, gửi nhận xét $\rightarrow$ bình luận xuất hiện ngay lập tức trên màn hình.

---

### 👤 THÀNH VIÊN 2: NGUYỄN THỊ THẮM (DEVELOPER 2 - E-COMMERCE & ORDERS)
- **Nhánh Git:** `dev_thamnt` (Merge vào `main`)
- **Phân hệ phụ trách:** **Gian Hàng Phụ Kiện, Giỏ Hàng & Hệ Thống Đơn Hàng (E-Commerce Module)**
- **Khối lượng công việc:** ~33% dự án.

#### 1. Chi Tiết Các Chức Năng Nghiệp Vụ Đảm Nhiệm:
1. **Nghiệp vụ Gian Hàng Phụ Kiện & Dụng Cụ Len (`/accessories`):**
   - Phân chia tab danh mục sản phẩm trực quan: Len sợi cao cấp (Len Milk bò, Len xù cừu), Kim móc & Dụng cụ (Kim móc cán dẻo, kim nhôm), Phụ liệu hoàn thiện (Mắt thú an toàn, Gòn bi).
   - Hiển thị nhãn trạng thái kho hàng ("Còn hàng" màu xanh lá, "Hết hàng" màu cam).
   - Hiển thị giá bán khuyến mãi nổi bật kèm giá gốc gạch ngang.
2. **Nghiệp vụ Xem Chi Tiết Phụ Kiện (`/accessories/:id`):**
   - Click vào thẻ sản phẩm chuyển hướng sang trang chi tiết xem hình ảnh phóng to độ nét cao, mô tả đặc tính sản phẩm (đường kính sợi, xuất xứ, ứng dụng phù hợp).
   - Bộ chọn số lượng (Quantity Counter) tăng giảm trước khi quyết định mua.
   - Hai nút hành động: "Thêm Vào Giỏ Hàng" (thông báo Toast popup) và "Mua Ngay" (thêm vào giỏ và tự động chuyển hướng thẳng sang trang thanh toán `/cart`).
3. **Nghiệp vụ Quản Lý Giỏ Hàng Mua Sắm (Cart Context & LocalStorage):**
   - Xây dựng `CartContext` quản lý giỏ hàng tập trung trong React: cho phép tăng/giảm số lượng từng món, xóa từng món hoặc xóa sạch giỏ hàng.
   - Tự động tính toán tổng số lượng món trên badge icon giỏ hàng ở Navbar và tổng số tiền thanh toán chuẩn định dạng tiền tệ Việt Nam Đồng (`Intl.NumberFormat('vi-VN')`).
   - Lưu trữ dữ liệu giỏ hàng vào `localStorage` của trình duyệt: người dùng rời trang web hoặc tắt trình duyệt thì giỏ hàng vẫn được lưu giữ.
4. **Nghiệp vụ Đặt Hàng Trực Tuyến & Lưu Trữ MongoDB:**
   - Form thông tin giao hàng có validation: Họ tên, Số điện thoại (kiểm tra chuẩn 10 chữ số), Địa chỉ giao hàng và Ghi chú đơn.
   - Kết nối API `POST /api/orders` gửi payload `CreateOrderDto`.
   - Server tự động sinh mã đơn hàng ngẫu nhiên `ORD-XXXXXX` (VD: `ORD-914283`), lưu mảng các Sub-documents `items` vào MongoDB với trạng thái mặc định `Chờ xác nhận`.
   - Sau khi tạo đơn thành công, client tự động xóa rỗng giỏ hàng và mở Modal chúc mừng kèm mã đơn hàng.
5. **Nghiệp vụ Tra Cứu Đơn Hàng Không Cần Đăng Nhập:**
   - Xây dựng Popup Tra Cứu Đơn Hàng tại trang Giỏ hàng: khách hàng chỉ cần nhập **Số điện thoại** đã đặt hàng là hệ thống gọi API `GET /api/orders/lookup?q=...` hiển thị danh sách tất cả các đơn hàng khách từng đặt kèm ngày đặt, tổng tiền và trạng thái xử lý (`Chờ xác nhận`, `Đang xử lý`, `Đã giao`).

#### 2. Review Code Then Chốt (Code Walkthrough):
- **Mongoose Schema Sub-document nhúng mảng `items` (`order.schema.ts`):**
  ```typescript
  @Prop({
    type: [
      {
        product_id: { type: Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        image_url: String,
      },
    ],
    required: true,
  })
  items: Array<{
    product_id: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
  }>;
  ```
- **Hàm tạo đơn hàng tự động sinh mã `ORD-XXXXXX` (`orders.service.ts`):**
  ```typescript
  async create(dto: CreateOrderDto): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Giỏ hàng không có sản phẩm nào!');
    }
    const order_code = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const total_amount = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    const newOrder = new this.orderModel({
      ...dto,
      order_code,
      total_amount,
      status: 'Chờ xác nhận',
    });
    return newOrder.save();
  }
  ```
- **API Tra cứu đơn theo SĐT hoặc Mã đơn (`orders.service.ts`):**
  ```typescript
  async findByCodeOrPhone(query: string): Promise<Order[]> {
    return this.orderModel
      .find({
        $or: [{ order_code: query }, { phone: query }],
      })
      .sort({ createdAt: -1 })
      .exec();
  }
  ```

#### 3. Kịch Bản Demo Trực Tiếp Trên Web:
1. Vào trang Phụ Kiện [http://localhost:5173/accessories](http://localhost:5173/accessories): bấm vào sản phẩm "Len Milk Bò 50g" $\rightarrow$ mở trang chi tiết, chọn số lượng 3 cuộn, bấm "Thêm Vào Giỏ".
2. Chọn tiếp 1 cây "Kim Móc Cán Dẻo Ergonomic" bấm "Thêm Vào Giỏ".
3. Nhìn lên Header: biểu tượng giỏ hàng hiển thị badge đỏ số `4`.
4. Click vào Giỏ hàng [http://localhost:5173/cart](http://localhost:5173/cart): thấy danh sách 2 món, tổng tiền hiển thị chính xác.
5. Điền form nhận hàng: Họ tên "Trần Hoàng Yến", SĐT "0912345678", Địa chỉ "Quận 1, TP.HCM" $\rightarrow$ bấm "Xác Nhận Đặt Hàng":
   - Modal bật lên thông báo đặt hàng thành công, hiển thị mã đơn hàng dạng `ORD-XXXXXX`. Giỏ hàng tự động làm sạch về 0.
6. Thử nghiệm tính năng Tra cứu: bấm nút "Tra Cứu Đơn Hàng" $\rightarrow$ nhập SĐT "0912345678" $\rightarrow$ hệ thống truy vấn MongoDB và hiển thị danh sách đơn vừa đặt kèm trạng thái "Chờ xác nhận".

---

### 👤 THÀNH VIÊN 3: TRẦN MINH ĐỨC (DEVELOPER 3 - BLOG, CATEGORIES, AUTH & ADMIN)
- **Nhánh Git:** `dev_duc` (Merge vào `main`)
- **Phân hệ phụ trách:** **Cẩm Nang Blog, Quản Lý Danh Mục, Xác Thực & Trang Quản Trị Hệ Thống (Admin Control Panel)**
- **Khối lượng công việc:** ~33% dự án.

#### 1. Chi Tiết Các Chức Năng Nghiệp Vụ Đảm Nhiệm:
1. **Nghiệp vụ Cẩm Nang Mẹo Đan Móc Len (`/blog`):**
   - Danh sách bài viết cẩm nang chia sẻ kỹ thuật đan móc: *Bí quyết móc len không bị đau tay*, *Cách đọc chart móc chuẩn quốc tế*, *Cách phân biệt các loại len sợi*...
   - Trang đọc bài viết chi tiết (`/blog/:slug`): Truy vấn dữ liệu theo trường `slug` thân thiện SEO thay vì ID; tự động tăng lượt đọc (`views`) qua `$inc`.
2. **Nghiệp vụ Quản Lý Danh Mục Hệ Thống (Categories Module):**
   - Xây dựng module `Categories` độc lập dùng chung cho cả Kho Chart (`type: 'pattern'`) và Gian Hàng Phụ Kiện (`type: 'product'`).
   - Cung cấp đầy đủ các API CRUD (`GET`, `POST`, `DELETE /api/categories`) phục vụ các dropdown chọn danh mục ở trang Admin.
3. **Nghiệp vụ Xác Thực Bảo Mật Quản Trị Viên (Auth Module):**
   - Thiết kế `UserSchema` lưu `username`, `password_hash` (mã hóa SHA-256 an toàn), `full_name`, `role: 'admin'`.
   - Xây dựng API `POST /api/auth/login` kiểm tra mật khẩu; API `GET /api/auth/me` xác thực phiên làm việc và `POST /api/auth/logout`.
   - Trang Quản trị (`/admin`) được bảo vệ nghiêm ngặt: nếu chưa đăng nhập sẽ hiển thị form Login; đăng nhập đúng tài khoản `admin` / `admin123` mới mở ra giao diện Dashboard.
4. **Nghiệp vụ Thống Kê Số Liệu Thời Gian Thực (Dashboard Stats):**
   - Xây dựng API `GET /api/orders/stats` sử dụng MongoDB Aggregation Framework:
     - Tính tổng doanh thu các đơn hàng hợp lệ (loại bỏ các đơn "Đã hủy").
     - Đếm tổng số đơn hàng đã phát sinh.
     - Đếm tổng số mẫu chart và tổng số mặt hàng phụ kiện đang có trong DB.
   - Hiển thị 4 thẻ chỉ số KPI trực quan trên Dashboard.
5. **Nghiệp vụ Bảng Điều Khiển Quản Trị Tập Trung 3 Tabs (Admin Control Panel):**
   - **Tab 1 - Quản lý Chart:** Hiển thị bảng dữ liệu toàn bộ mẫu chart, nút "Thêm Mới Chart" mở Modal nhập thông tin, nút Xóa chart khỏi DB.
   - **Tab 2 - Quản lý Phụ kiện:** Xem bảng sản phẩm, cập nhật giá tiền trực tiếp, nút chuyển đổi trạng thái nhanh Còn hàng / Hết hàng.
   - **Tab 3 - Quản lý Đơn hàng:** Xem danh sách toàn bộ đơn khách đặt từ mới nhất đến cũ nhất; nút xem chi tiết các món trong giỏ hàng; **Nút bấm 1-click Duyệt đơn hàng** chuyển trạng thái từ `Chờ xác nhận` $\rightarrow$ `Đang xử lý` $\rightarrow$ `Đã giao` hoặc `Hủy đơn`.
6. **Tối Ưu Hóa & Cấu Hình Máy Chủ Toàn Cục:**
   - Cấu hình Global `ValidationPipe` trong `server/src/main.ts` với các cờ `whitelist: true` (tự động loại bỏ các thuộc tính rác gửi lên) và `transform: true` (tự động ép kiểu dữ liệu theo DTO).
   - Cấu hình static assets server `app.useStaticAssets()` để phục vụ các hình ảnh tĩnh nội bộ từ thư mục `client/public`.

#### 2. Review Code Then Chốt (Code Walkthrough):
- **Đọc chi tiết Blog linh hoạt theo `slug` hoặc `_id` (`blogs.service.ts`):**
  ```typescript
  async findByIdOrSlug(idOrSlug: string): Promise<Blog> {
    const isObjectId = Types.ObjectId.isValid(idOrSlug);
    const filter = isObjectId
      ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
      : { slug: idOrSlug };

    const blog = await this.blogModel
      .findOneAndUpdate(filter, { $inc: { views: 1 } }, { new: true })
      .exec();
    if (!blog) throw new NotFoundException('Không tìm thấy bài viết!');
    return blog;
  }
  ```
- **API Thống kê thời gian thực đa luồng (`orders.service.ts`):**
  ```typescript
  async getStats() {
    const [totalOrders, totalRevenue, totalPatterns, totalProducts] =
      await Promise.all([
        this.orderModel.countDocuments(),
        this.orderModel.aggregate([
          { $match: { status: { $ne: 'Đã hủy' } } },
          { $group: { _id: null, total: { $sum: '$total_amount' } } },
        ]),
        this.patternModel.countDocuments(),
        this.productModel.countDocuments(),
      ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalPatterns,
      totalProducts,
    };
  }
  ```
- **Cấu hình Global ValidationPipe bảo vệ toàn bộ API (`server/src/main.ts`):**
  ```typescript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các trường không có trong DTO
      transform: true, // Tự động parse kiểu dữ liệu sang đúng kiểu DTO
    }),
  );
  ```

#### 3. Kịch Bản Demo Trực Tiếp Trên Web:
1. Vào trang Cẩm Nang [http://localhost:5173/blog](http://localhost:5173/blog): mở bài viết "Bí quyết móc len không bị đau tay" $\rightarrow$ chỉ cho giảng viên thấy đường link trên thanh địa chỉ là `/blog/bi-quyet-moc-len-khong-bi-dau-tay-cho-nguoi-moi` (chuẩn SEO bằng slug).
2. Click vào nút "Quản trị" trên thanh menu để chuyển đến trang [http://localhost:5173/admin](http://localhost:5173/admin):
   - Màn hình form đăng nhập hiện ra. Nhập thử mật khẩu sai $\rightarrow$ báo lỗi đỏ.
   - Nhập đúng `admin` / `admin123` $\rightarrow$ mở ra màn hình Admin Dashboard.
3. Chỉ vào 4 thẻ thống kê: Tổng doanh thu, Số đơn hàng, Số chart, Số phụ kiện.
4. Mở Tab "Quản lý Đơn hàng":
   - Tìm đơn hàng vừa được Thành viên 2 đặt ở bước trước (mã `ORD-XXXXXX`, khách "Trần Hoàng Yến", trạng thái "Chờ xác nhận").
   - Bấm nút icon "Xem chi tiết" $\rightarrow$ Modal hiển thị đúng 3 cuộn len Milk bò và 1 kim móc cán dẻo.
   - Bấm nút "Duyệt đơn" $\rightarrow$ trạng thái chuyển sang "Đang xử lý".
   - Quay lại trang tra cứu đơn hàng của khách bấm F5 $\rightarrow$ trạng thái đã đổi thành "Đang xử lý" đồng bộ tức thì.

---

## PHẦN 3: TỔNG KẾT & ĐÁNH GIÁ ĐỒ ÁN (CONCLUSION)
*(Thời lượng: 1 - 2 phút | Người trình bày: Trưởng nhóm)*

1. **Về mức độ hoàn thiện sản phẩm:**
   - Đồ án đã đạt **100% mục tiêu đề ra**: Giao diện hoàn chỉnh, ấm cúng phong cách đan len, phản hồi tức thì, không có trang trắng, không lỗi console.
   - **Cam kết chuẩn mực môn SDN302:** Không sử dụng bất kỳ mock data nào; toàn bộ danh mục, chart, phụ kiện, blog, đơn hàng đều là dữ liệu thực từ MongoDB; kịch bản `npm run seed` phục hồi toàn bộ dữ liệu chỉ trong 3 giây.
2. **Về tính cân bằng trong làm việc nhóm:**
   - Cả 3 thành viên đều gánh vác khối lượng công việc cân bằng tuyệt đối (~33% - 34%), mỗi bạn đều làm chủ trọn vẹn một luồng Full-Stack (Schema Mongoose, DTO Validation, Service xử lý logic, Controller định tuyến API và Giao diện React tương ứng).
   - Quá trình làm việc qua Git theo từng nhánh tính năng (`dev_trangdtt`, `dev_thamnt`, `dev_duc`) và merge vào `main` sạch sẽ, rõ ràng.
3. **Về hồ sơ tài liệu nộp đồ án:**
   - Nhóm đã hoàn thành file báo cáo tổng hợp chuẩn FPT University: `COURSE_PROJECT_REPORT_FINAL_CRAFTYARNHUB.docx` (dung lượng 3.3 MB) bao gồm đầy đủ **16 Use Cases đặc tả chuẩn 15 dòng Karl Wiegers** và **13 sơ đồ kiến trúc hệ thống nhúng hình ảnh độ nét cao**.

> *"Nhóm chúng em xin chân thành cảm ơn Thầy/Cô đã lắng nghe phần trình bày của nhóm! Rất mong nhận được những nhận xét và góp ý từ Thầy/Cô để dự án của chúng em được hoàn thiện hơn nữa ạ!"*
