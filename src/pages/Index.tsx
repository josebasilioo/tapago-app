import { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { ShoppingList } from '@/components/ShoppingList';
import { ScannerView } from '@/components/ScannerView';
import { ProductDetails } from '@/components/ProductDetails';
import { CartView } from '@/components/CartView';
import { PaymentView } from '@/components/PaymentView';
import { CheckoutSuccess } from '@/components/CheckoutSuccess';
import { Product, PaymentMethod, CartItem } from '@/types/grocery';
import { useToast } from '@/hooks/use-toast';

type AppView = 'shopping-list' | 'scanner' | 'product-details' | 'cart' | 'payment' | 'checkout-success';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('shopping-list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleScanProduct = () => {
    setCurrentView('scanner');
  };

  const handleProductFound = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    toast({
      title: "Produto encontrado!",
      description: `${product.name} foi escaneado com sucesso.`,
    });
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCartItems(items => 
        items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        product,
        quantity
      };
      setCartItems(items => [...items, newItem]);
    }

    toast({
      title: "Produto adicionado!",
      description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
    });
    
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    setCurrentView('payment');
  };

  const handleConfirmPayment = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setCurrentView('checkout-success');
    toast({
      title: "Pagamento confirmado!",
      description: "Seu pedido foi processado com sucesso.",
    });
  };

  const handleStartNewOrder = () => {
    setCartItems([]);
    setSelectedProduct(null);
    setSelectedPaymentMethod(null);
    setCurrentView('shopping-list');
  };

  const handleBack = () => {
    switch (currentView) {
      case 'scanner':
        setCurrentView('shopping-list');
        break;
      case 'product-details':
        setCurrentView('scanner');
        break;
      case 'cart':
        setCurrentView('shopping-list');
        break;
      case 'payment':
        setCurrentView('cart');
        break;
      case 'checkout-success':
        setCurrentView('payment');
        break;
      default:
        setCurrentView('shopping-list');
    }
  };

  const handleNavigate = (view: string) => {
    switch (view) {
      case 'shopping-list':
        setCurrentView('shopping-list');
        break;
      case 'scanner':
        setCurrentView('scanner');
        break;
      case 'cart':
        setCurrentView('cart');
        break;
      default:
        setCurrentView('shopping-list');
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'shopping-list': return 'Lista de Compras';
      case 'scanner': return 'Escanear';
      case 'product-details': return 'Detalhes do produto';
      case 'cart': return 'Tela de prom...';
      case 'payment': return 'Pagamento';
      case 'checkout-success': return 'Checkout';
      default: return 'Stitch Design';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'shopping-list':
        return <ShoppingList onScanProduct={handleScanProduct} />;
      case 'scanner':
        return <ScannerView onProductFound={handleProductFound} />;
      case 'product-details':
        return selectedProduct ? 
          <ProductDetails product={selectedProduct} onAddToCart={handleAddToCart} /> : 
          <div>Produto não encontrado</div>;
      case 'cart':
        return <CartView onCheckout={handleCheckout} />;
      case 'payment':
        return <PaymentView onConfirmPayment={handleConfirmPayment} />;
      case 'checkout-success':
        return selectedPaymentMethod ? 
          <CheckoutSuccess paymentMethod={selectedPaymentMethod} onStartNewOrder={handleStartNewOrder} /> :
          <div>Erro no pagamento</div>;
      default:
        return <ShoppingList onScanProduct={handleScanProduct} />;
    }
  };

  return (
    <MobileLayout
      title={getTitle()}
      showBack={currentView !== 'shopping-list'}
      onBack={handleBack}
      showBottomNav={['shopping-list', 'scanner', 'cart'].includes(currentView)}
      currentView={currentView}
      onNavigate={handleNavigate}
    >
      {renderContent()}
    </MobileLayout>
  );
};

export default Index;
