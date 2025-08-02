export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  type: 'pix' | 'credit' | 'voucher' | 'cash';
  name: string;
  icon: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed' | 'completed';
}