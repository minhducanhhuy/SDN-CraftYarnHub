import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chart_crochet_db';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    type: { type: String, enum: ['pattern', 'product'], required: true },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

const patternSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Dễ', 'Vừa', 'Khó'],
      default: 'Dễ',
    },
    difficulty_stars: { type: Number, default: 2 },
    image_url: { type: String, required: true },
    img: String,
    description: String,
    materials: [String],
    tools: [String],
    content: mongoose.Schema.Types.Mixed,
    is_free: { type: Boolean, default: true },
    view_count: { type: Number, default: 120 },
    likes: { type: Number, default: 45 },
    author: { type: String, default: 'Tiệm Len Xinh' },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: { type: Number, required: true },
    original_price: { type: Number, default: 0 },
    image_url: { type: String, required: true },
    stock_status: {
      type: String,
      enum: ['Còn hàng', 'Sắp hết', 'Hết hàng'],
      default: 'Còn hàng',
    },
    description: String,
    short_desc: String,
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: String, required: true },
    author: { type: String, default: 'Bảo Vy - Tiệm Len Nhỏ' },
    read_time: { type: String, default: '5 phút đọc' },
    category: { type: String, default: 'Mẹo hay' },
    views: { type: Number, default: 350 },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    pattern_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pattern',
      required: true,
    },
    author_name: { type: String, required: true, trim: true },
    avatar: { type: String, default: 'https://api.dicebear.com/7.x/adventurer/svg?seed=rose' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true, trim: true },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    order_code: { type: String, required: true, unique: true },
    customer_name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String, default: '' },
    items: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        image_url: String,
      },
    ],
    total_amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Chờ xác nhận', 'Đang xử lý', 'Đã giao', 'Đã hủy'],
      default: 'Chờ xác nhận',
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model('Category', categorySchema);
const PatternModel = mongoose.model('Pattern', patternSchema);
const ProductModel = mongoose.model('Product', productSchema);
const BlogModel = mongoose.model('Blog', blogSchema);
const CommentModel = mongoose.model('Comment', commentSchema);
const OrderModel = mongoose.model('Order', orderSchema);

async function seed() {
  console.log('🌱 Kết nối MongoDB để nạp dữ liệu seed:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);

  console.log('🧹 Dọn dẹp dữ liệu cũ trong database...');
  await CategoryModel.deleteMany({});
  await PatternModel.deleteMany({});
  await ProductModel.deleteMany({});
  await BlogModel.deleteMany({});
  await CommentModel.deleteMany({});
  await OrderModel.deleteMany({});

  console.log('📁 Tạo Danh mục (Categories)...');
  const catRauCu = await CategoryModel.create({
    name: 'Rau Củ',
    slug: 'rau-cu',
    type: 'pattern',
    description: 'Các mẫu móc củ quả siêu dễ thương, tươi mới mỗi ngày',
    icon: '🥦',
  });

  const catConVat = await CategoryModel.create({
    name: 'Con Vật',
    slug: 'con-vat',
    type: 'pattern',
    description: 'Mẫu thú bông amigurumi đáng yêu, chân thực',
    icon: '🐱',
  });

  const catHoaLa = await CategoryModel.create({
    name: 'Hoa Lá',
    slug: 'hoa-la',
    type: 'pattern',
    description: 'Mẫu hoa để bàn và móc cành trang trí không tàn',
    icon: '🌻',
  });

  const catLenSoi = await CategoryModel.create({
    name: 'Len Sợi',
    slug: 'len-soi',
    type: 'product',
    description: 'Len Milk Cotton, Len Baby Yarn, Len xù cừu cao cấp',
    icon: '🧶',
  });

  const catKimMoc = await CategoryModel.create({
    name: 'Kim Móc & Que Đan',
    slug: 'kim-moc',
    type: 'product',
    description: 'Kim móc cán dẻo, kim nhôm 2 đầu đủ size 2.0 - 5.0mm',
    icon: '🪡',
  });

  const catPhuKien = await CategoryModel.create({
    name: 'Phụ Kiện Thủ Công',
    slug: 'phu-kien',
    type: 'product',
    description: 'Bông gòn bi, mắt thú an toàn, kẽm cành, móc khóa',
    icon: '✨',
  });

  console.log('🧶 Tạo Mẫu Chart Móc Len (Patterns)...');
  const patternSupLo = await PatternModel.create({
    name: 'Súp Lơ Xanh Siêu Dễ Thương',
    category: catRauCu._id,
    difficulty: 'Dễ',
    difficulty_stars: 2,
    image_url: 'https://i.pinimg.com/736x/80/9a/9b/809a9bd4563e18ae0be88e6ca165ac5f.jpg',
    img: 'https://i.pinimg.com/736x/4e/37/c6/4e37c6aecd96ec79c1be335e8c41fe7d.jpg',
    description: 'Bé súp lơ xanh mướt không hề xa lánh, bé xíu nằm gọn trong lòng bàn tay, thích hợp làm móc khóa.',
    materials: ['Len Milk Cotton 50g màu xanh lá & trắng kem', 'Bông gòn bi loại 1', 'Mắt thú chốt an toàn 6mm'],
    tools: ['Kim móc 2.5mm', 'Kim khâu len đầu tù', 'Kéo cắt chỉ'],
    content: {
      'Thân': [
        'R1: MR 6X (6 mũi)',
        'R2: 6V (12 mũi)',
        'R3: (X, V) * 6 (18 mũi)',
        'R4: (2X, V) * 6 (24 mũi)',
        'R5-7: 24X (24 mũi)',
        'R8: 7X, BO, 8X, BO, 7X (24 mũi - tạo má lúm)',
        'R9-11: 24X (24 mũi)',
      ],
      'Đầu Xù': [
        'R12: (X, BO) * 12 (24 mũi tạo cụm xù)',
        'R13: (BO, X) * 12 (24 mũi)',
        'R14: (A, BO) * 8 (16 mũi)',
        'R15: X, (A, BO) * 5 (12 mũi) - Nhồi bông chặt tay',
        'R16: 5A, X (6 mũi), Trượt mũi (Sl st), Chốt chỉ kết thúc (FO)',
      ],
    },
    is_free: true,
    view_count: 540,
    likes: 128,
  });

  const patternMeoDen = await PatternModel.create({
    name: 'Mèo Đen Tinh Nghịch (Black Cat)',
    category: catConVat._id,
    difficulty: 'Vừa',
    difficulty_stars: 3,
    image_url: 'https://i.pinimg.com/736x/0a/ac/0e/0aac0e241908e89ddc4e38c9578b643c.jpg',
    img: 'https://i.pinimg.com/736x/4a/97/94/4a97948a82dd44799efa0166dfb22ea9.jpg',
    description: 'Chú mèo đen huyền bí nhưng vô cùng may mắn, đôi mắt to tròn long lanh và cái đuôi cong vút.',
    materials: ['Len Milk Cotton màu đen tuyền & hồng nhạt làm tai', 'Bông gòn bi', 'Mắt thú mắt mèo xanh lá 8mm'],
    tools: ['Kim móc 2.0mm', 'Kim khâu len', 'Kéo bấm chỉ'],
    content: {
      'Đầu & Thân': [
        'R1: MR 6X (6 mũi)',
        'R2: 6V (12 mũi)',
        'R3: (X, V) * 6 (18 mũi)',
        'R4: (2X, V) * 6 (24 mũi)',
        'R5: (3X, V) * 6 (30 mũi)',
        'R6-10: 30X (30 mũi)',
        'R11: (3X, A) * 6 (24 mũi)',
        'R12: (2X, A) * 6 (18 mũi) - Gắn mắt giữa R8-9 cách nhau 5 mũi',
        'R13: (X, A) * 6 (12 mũi)',
        'R14: 12X (12 mũi) - Chuyển sang phần thân',
        'R15: (X, V) * 6 (18 mũi)',
        'R16-18: 18X (18 mũi)',
        'R19: (X, A) * 6 (12 mũi) - Nhồi bông đều',
        'R20: 6A (6 mũi), Giấu chỉ khâu kín đáy',
      ],
      'Tai (Làm 2 cái)': [
        'R1: MR 4X (4 mũi)',
        'R2: (X, V) * 2 (6 mũi)',
        'R3: (2X, V) * 2 (8 mũi)',
        'Khâu ráp vào 2 bên đỉnh đầu',
      ],
      'Đuôi mèo': [
        'Móc dây bính 16CH, quay lại móc 15X tạo đuôi cong tự nhiên',
      ],
    },
    is_free: true,
    view_count: 820,
    likes: 215,
  });

  const patternHoaMatTroi = await PatternModel.create({
    name: 'Hoa Mặt Trời Rạng Rỡ',
    category: catHoaLa._id,
    difficulty: 'Dễ',
    difficulty_stars: 2,
    image_url: 'https://i.pinimg.com/736x/8a/36/c9/8a36c968b077942a132ef2166f3249d8.jpg',
    img: 'https://i.pinimg.com/736x/3f/f4/d1/3ff4d1a424c5d50fd4dd4d5f71810ad2.jpg',
    description: 'Bông hoa hy vọng nhỏ xinh, sưởi ấm góc bàn học và đem lại năng lượng tích cực.',
    materials: ['Len Milk Cotton vàng rực rỡ, nâu đậm và xanh lá', 'Kẽm cành 2mm'],
    tools: ['Kim móc 2.5mm', 'Keo nến', 'Kéo'],
    content: {
      'Nhụy hoa (Làm 2 mảnh nâu)': [
        'R1: MR 6X (6 mũi)',
        'R2: 6V (12 mũi)',
        'R3: (X, V) * 6 (18 mũi)',
        'R4: (2X, V) * 6 (24 mũi)',
        'Áp 2 mặt trái vào nhau, móc viền X để ráp tạo độ phồng nhẹ',
      ],
      'Cánh hoa (Màu vàng)': [
        'Móc trực tiếp vào mép nhụy: *(1 mũi T, 1 mũi F, 1 mũi chốt picot, 1 mũi F, 1 mũi T vào cùng chân), trượt mũi sang chân tiếp theo* lặp lại 12 cánh',
      ],
    },
    is_free: true,
    view_count: 670,
    likes: 190,
  });

  const patternChauHoa = await PatternModel.create({
    name: 'Chậu Cây Hướng Dương Bàn Học',
    category: catHoaLa._id,
    difficulty: 'Khó',
    difficulty_stars: 4,
    image_url: 'https://images.unsplash.com/photo-1584839818816-1f6920f666f7?q=80&w=600&auto=format&fit=crop',
    img: 'https://images.unsplash.com/photo-1584839818816-1f6920f666f7?q=80&w=600&auto=format&fit=crop',
    description: 'Chậu hoa để bàn học bền bỉ không bao giờ tàn, món quà ý nghĩa tặng bạn bè dịp tốt nghiệp.',
    materials: ['Len Cotton loang màu nâu, vàng hoa cúc, xanh rêu', 'Kẽm uốn cành & kẽm bọc cánh hoa', 'Bông nhồi & đế gỗ nhỏ'],
    tools: ['Kim móc 2.5mm', 'Súng bắn keo nến', 'Kìm cắt kẽm'],
    content: {
      'Chậu hoa': [
        'R1: MR 7X (7 mũi)',
        'R2: 7V (14 mũi)',
        'R3: (X, V) * 7 (21 mũi)',
        'R4: (2X, V) * 7 (28 mũi)',
        'R5: Móc BLO 28X (28 mũi) để dựng thành chậu',
        'R6-12: 28X (28 mũi)',
        'R13: Móc viền bèo lật miệng chậu',
      ],
      'Đất chậu': [
        'Móc hình tròn 28 mũi màu nâu đất, nhồi bông vào chậu rồi khâu mép với chậu',
      ],
    },
    is_free: true,
    view_count: 980,
    likes: 310,
  });

  console.log('🛍️ Tạo Sản phẩm Phụ kiện & Len (Products)...');
  const createdProducts = await ProductModel.create([
    {
      name: 'Set len Milk Bò 50g - Palette Màu Pastel',
      category: catLenSoi._id,
      price: 15000,
      original_price: 18000,
      image_url: 'https://images.unsplash.com/photo-1584839818816-1f6920f666f7?q=80&w=400&auto=format&fit=crop',
      stock_status: 'Còn hàng',
      short_desc: 'Sợi len mềm mịn không xù lông, an toàn cho bé.',
      description: 'Len Milk Bò chuyên dụng đan móc thú bông amigurumi, khăn, mũ. Bảng màu phong phú hơn 60 sắc độ.',
      rating: 5,
    },
    {
      name: 'Set Len Xù Lông Cừu Siêu Mềm',
      category: catLenSoi._id,
      price: 35000,
      original_price: 42000,
      image_url: 'https://images.unsplash.com/photo-1596489381678-75899990b79e?q=80&w=400&auto=format&fit=crop',
      stock_status: 'Còn hàng',
      short_desc: 'Len xù bông tơi xốp, giữ ấm cực tốt.',
      description: 'Chất liệu len cừu nhân tạo siêu bồng bềnh, dùng để móc áo len mùa đông hoặc làm đầu xù thú bông.',
      rating: 5,
    },
    {
      name: 'Kim Móc Cán Dẻo Nhựa ABS Cao Cấp',
      category: catKimMoc._id,
      price: 45000,
      original_price: 55000,
      image_url: 'https://images.unsplash.com/photo-1616788258356-0eaeb3f67554?q=80&w=400&auto=format&fit=crop',
      stock_status: 'Còn hàng',
      short_desc: 'Cán đệm êm tay, móc lâu không mỏi khớp ngón tay.',
      description: 'Đầu kim mạ niken trơn bóng lướt sợi siêu êm, thân dẻo thiết kế công thái học chống chai tay.',
      rating: 5,
    },
    {
      name: 'Set Kim Móc 2 Đầu Nhôm Tiện Lợi',
      category: catKimMoc._id,
      price: 15000,
      original_price: 20000,
      image_url: 'https://images.unsplash.com/photo-1590422744383-8a3dcb1437fd?q=80&w=800&auto=format&fit=crop',
      stock_status: 'Sắp hết',
      short_desc: 'Bộ kim kim loại 2 đầu đa năng giá học sinh sinh viên.',
      description: 'Mỗi kim có 2 kích cỡ đầu móc (ví dụ 2/0 - 3/0), siêu nhẹ và bền bỉ theo thời gian.',
      rating: 4,
    },
    {
      name: 'Mắt Thú Chốt An Toàn Đen 8mm - 10mm (10 Đôi)',
      category: catPhuKien._id,
      price: 25000,
      original_price: 30000,
      image_url: 'https://images.unsplash.com/photo-1620021660143-690240d99a32?q=80&w=400&auto=format&fit=crop',
      stock_status: 'Còn hàng',
      short_desc: 'Chốt khóa chắc chắn, không lo rơi rớt khi trẻ nhỏ chơi.',
      description: 'Mắt nhựa bóng sâu màu đen tuyền kèm chốt hãm phía sau, giúp thú len có hồn và an toàn tuyệt đối.',
      rating: 5,
    },
    {
      name: 'Bông Gòn Bi Nhồi Thú Loại 1 Siêu Phồng (500g)',
      category: catPhuKien._id,
      price: 40000,
      original_price: 50000,
      image_url: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop',
      stock_status: 'Còn hàng',
      short_desc: 'Bông dạng hạt bi đàn hồi cao, không vón cục khi giặt.',
      description: 'Bông polyester tinh khiết màu trắng tinh, đàn hồi cực tốt, giữ form dáng thú bông luôn căng tròn đều.',
      rating: 5,
    },
  ]);

  console.log('📖 Tạo Bài Viết Blog (Blogs)...');
  await BlogModel.create([
    {
      title: 'Hành Trình Đan Móc Chiếc Khăn Choàng Đầu Mùa Ấm Áp',
      slug: 'hanh-trinh-dan-moc-chiec-khan-choang-dau-mua',
      excerpt: 'Khi những đợt gió lạnh đầu mùa khẽ chạm từng kẽ lá, cũng là lúc các tín đồ thủ công rục rịch chọn cho mình những cuộn len mềm mại...',
      content: 'Một chiếc khăn choàng handmade không đơn giản chỉ để giữ ấm, nó chứa đựng cả sự nâng niu, tỉ mỉ đan dệt qua từng vòng xoáy chỉ. Bài viết này chia sẻ trọn vẹn hành trình từ khâu chọn len tới những phối màu tuyệt đối giúp bạn sở hữu một siêu phẩm độc bản mang đậm dấu ấn cá nhân.',
      image_url: '/featured_blog.png',
      author: 'Bảo Vy - Tiệm Len Nhỏ',
      read_time: '8 phút đọc',
      category: 'Nhật ký',
      views: 720,
    },
    {
      title: 'Mẹo Giấu Sạch Đầu Sợi Len Thừa Gọn Gàng Không Bị Tuột',
      slug: 'meo-giau-sach-dau-soi-len-thua',
      excerpt: 'Sợi len thừa sau khi thắt nút ráp thú luôn làm giảm nét thẩm mỹ của thành phẩm amigurumi. Bỏ túi ngay 3 mẹo lách kim giấu mối siêu mượt.',
      content: 'Kỹ thuật dùng kim khâu len luồn sâu vào giữa lớp bông gòn bi bên trong thân thú sẽ giúp triệt tiêu hoàn toàn dấu vết mối nối. Hãy luồn kim qua lại ít nhất 2 lần đổi hướng trước khi cắt sát chân sợi len.',
      image_url: '/hide_yarn_ends.png',
      author: 'Vy An',
      read_time: '4 phút đọc',
      category: 'Mẹo hay',
      views: 450,
    },
    {
      title: 'Bảo Quản Các Cuộn Len Đan Móc Không Bị Ẩm Mốc Hay Xù Lông',
      slug: 'bao-quan-cac-cuon-len-dan-moc-khong-xu-long',
      excerpt: 'Làm sao để các sợi bông luôn tơi xốp mềm mại sau thời gian dài cất trữ? Khám phá cách sắp xếp tủ len khoa học.',
      content: 'Bảo quản len ở nơi khô ráo, tránh ánh nắng trực tiếp gay gắt vì nhiệt độ cao có thể làm biến tính sợi acrylic hoặc co rút sợi len tự nhiên. Bạn nên để túi hạt hút ẩm nhỏ trong hộp cất trữ len.',
      image_url: '/yarn_balls_care.png',
      author: 'Thu Trang',
      read_time: '5 phút đọc',
      category: 'Thiết yếu',
      views: 380,
    },
    {
      title: 'Kỹ Thuật Nhồi Bông Đều Tăm Tắp Cho Thú Amigurumi Căng Tròn',
      slug: 'ky-thuat-nhoi-bong-deu-tam-tap-amigurumi',
      excerpt: 'Thú bông bị méo hay vón cục thường do kỹ thuật nhồi của bạn chưa chuẩn xác. Hướng dẫn chi tiết cách dàn bông từ các khe hẹp.',
      content: 'Quy tắc vàng khi nhồi bông thú len: Xé tơi bông thành từng nhúm nhỏ, nhồi dần từ các góc nhọn (chân, tai, mỏ) trước rồi mới nhồi tới phần bụng và đầu. Không nên nhét một cục bông to vào giữa vì sẽ để lại các khoảng rỗng ở mép biên.',
      image_url: '/amigurumi_stuffing.png',
      author: 'Hà My',
      read_time: '6 phút đọc',
      category: 'Kỹ thuật',
      views: 510,
    },
  ]);

  console.log('💬 Tạo Bình Luận Mẫu (Comments)...');
  await CommentModel.create([
    {
      pattern_id: patternSupLo._id,
      author_name: 'Rose Nguyễn',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=rose',
      rating: 5,
      content: 'Chart viết siêu chi tiết và dễ hiểu luôn ạ! Mình là người mới tập móc 2 ngày mà làm ra bé súp lơ xinh xỉu!',
      verified: true,
    },
    {
      pattern_id: patternSupLo._id,
      author_name: 'Bún Handmade',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bun',
      rating: 5,
      content: 'Các hàng mũi móc đếm rất chuẩn, tính năng đếm dòng kèm tiếng bíp của web dùng tiện dã man.',
      verified: true,
    },
    {
      pattern_id: patternMeoDen._id,
      author_name: 'Linh Đan',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=linh',
      rating: 5,
      content: 'Mèo đen cưng lắm mọi người ơi, mình gắn thêm chiếc lục lạc nhỏ ở cổ kêu leng keng cưng xỉu.',
      verified: true,
    },
    {
      pattern_id: patternHoaMatTroi._id,
      author_name: 'Minh Thư',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=thu',
      rating: 5,
      content: 'Hoa mặt trời móc nhanh và làm quà tặng 20/11 hay 8/3 cực kỳ ý nghĩa.',
      verified: true,
    },
  ]);

  console.log('📦 Tạo Đơn hàng mẫu (Orders)...');
  await OrderModel.create([
    {
      order_code: 'ORD-882194',
      customer_name: 'Nguyễn Thảo Ly',
      phone: '0987654321',
      address: 'Số 12 ngõ 45 Cầu Giấy, Hà Nội',
      note: 'Giao giờ hành chính giúp mình nha shop',
      items: [
        {
          product_id: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: createdProducts[0].price,
          quantity: 3,
          image_url: createdProducts[0].image_url,
        },
        {
          product_id: createdProducts[2]._id,
          name: createdProducts[2].name,
          price: createdProducts[2].price,
          quantity: 1,
          image_url: createdProducts[2].image_url,
        },
      ],
      total_amount: createdProducts[0].price * 3 + createdProducts[2].price * 1,
      status: 'Chờ xác nhận',
    },
    {
      order_code: 'ORD-914283',
      customer_name: 'Trần Hoàng Yến',
      phone: '0912345678',
      address: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      note: 'Gói hàng cẩn thận giúp em nhé',
      items: [
        {
          product_id: createdProducts[1]._id,
          name: createdProducts[1].name,
          price: createdProducts[1].price,
          quantity: 2,
          image_url: createdProducts[1].image_url,
        },
      ],
      total_amount: createdProducts[1].price * 2,
      status: 'Đang xử lý',
    },
    {
      order_code: 'ORD-763910',
      customer_name: 'Lê Thanh Hương',
      phone: '0933221144',
      address: 'Đường Hùng Vương, TP. Đà Nẵng',
      note: '',
      items: [
        {
          product_id: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: createdProducts[0].price,
          quantity: 5,
          image_url: createdProducts[0].image_url,
        },
      ],
      total_amount: createdProducts[0].price * 5,
      status: 'Đã giao',
    },
  ]);

  console.log('✅ SEED DỮ LIỆU THÀNH CÔNG VÀO MONGODB!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Lỗi khi seed database:', err);
  process.exit(1);
});

