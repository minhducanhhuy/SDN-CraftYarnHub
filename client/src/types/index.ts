export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: 'pattern' | 'product';
  description?: string;
  icon?: string;
}

export interface Pattern {
  _id: string;
  name: string;
  category: Category;
  difficulty: 'Dễ' | 'Vừa' | 'Khó';
  difficulty_stars: number;
  image_url: string;
  img?: string;
  description: string;
  materials: string[];
  tools: string[];
  content: Record<string, string[]>;
  is_free: boolean;
  view_count: number;
  likes: number;
  author: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  category: Category;
  price: number;
  original_price?: number;
  image_url: string;
  stock_status: 'Còn hàng' | 'Sắp hết' | 'Hết hàng';
  description?: string;
  short_desc?: string;
  rating?: number;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  read_time: string;
  category: string;
  views: number;
  createdAt: string;
}

export interface CommentItem {
  _id: string;
  pattern_id: string;
  author_name: string;
  avatar: string;
  rating: number;
  content: string;
  verified: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Order {
  _id: string;
  order_code: string;
  customer_name: string;
  phone: string;
  address: string;
  note?: string;
  items: OrderItem[];
  total_amount: number;
  status: 'Chờ xác nhận' | 'Đang xử lý' | 'Đã giao' | 'Đã hủy';
  createdAt: string;
  updatedAt: string;
}


