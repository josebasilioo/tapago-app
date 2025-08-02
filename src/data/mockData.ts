import { ShoppingItem, Product, PaymentMethod, CartItem } from '@/types/grocery';

export const mockShoppingList: ShoppingItem[] = [
  { id: '1', name: 'Arroz', checked: false },
  { id: '2', name: 'Macarrão', checked: true },
  { id: '3', name: 'Molho de tomate', checked: false },
  { id: '4', name: 'Refrigerante', checked: false },
  { id: '5', name: 'Frango', checked: false },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Coca-Cola Zero',
    price: 5.99,
    image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
    description: 'Refrigerante Coca-Cola Zero açúcares 350ml',
    category: 'Bebidas'
  },
  {
    id: '2',
    name: 'Arroz Branco',
    price: 4.50,
    image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
    description: 'Arroz branco tipo 1, pacote 1kg',
    category: 'Grãos'
  },
  {
    id: '3',
    name: 'Macarrão Espaguete',
    price: 3.20,
    image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
    description: 'Macarrão espaguete 500g',
    category: 'Massas'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'pix', name: 'PIX', icon: '💳' },
  { id: '2', type: 'credit', name: 'Cartão de Crédito', icon: '💳' },
  { id: '3', type: 'voucher', name: 'Voucher', icon: '🎫' },
  { id: '4', type: 'cash', name: 'Cartão Presente', icon: '🎁' },
];

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Doritos Nacho Queijo',
      price: 7.50,
      image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
      description: 'Salgadinho Doritos sabor nacho queijo 150g',
      category: 'Snacks'
    },
    quantity: 2
  },
  {
    id: '2',
    product: {
      id: '2',
      name: 'Nescafé 3 in One',
      price: 12.00,
      image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
      description: 'Café solúvel Nescafé 3 em 1',
      category: 'Bebidas'
    },
    quantity: 6
  },
  {
    id: '3',
    product: {
      id: '3',
      name: "Lay's Classic Picado",
      price: 8.50,
      image: '/lovable-uploads/ff7bf24e-f900-4b61-b7f5-6b40fe768464.png',
      description: "Batata chips Lay's sabor original 140g",
      category: 'Snacks'
    },
    quantity: 1
  }
];