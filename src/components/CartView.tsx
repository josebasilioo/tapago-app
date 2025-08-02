import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/grocery';
import { mockCartItems } from '@/data/mockData';

interface CartViewProps {
  onCheckout: () => void;
}

export const CartView = ({ onCheckout }: CartViewProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Cart Items */}
      <div className="space-y-3">
        {cartItems.map((item, index) => (
          <Card 
            key={item.id} 
            className="p-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              {/* Product Icon */}
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                🍿
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {item.product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  R$ {item.product.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Promocode section */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Tela Promocional para sua próxima compra
            </p>
            <p className="text-xs text-muted-foreground">
              Ganhe R$10.00 em cada R$50.00 de compra
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            PROMO50
          </Badge>
        </div>
      </Card>

      {/* Order Summary */}
      <Card className="p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Desconto</span>
          <span className="text-foreground">R$ {discount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-lg text-foreground">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Checkout Button */}
      <Button 
        onClick={onCheckout}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        size="lg"
      >
        Finalizar pedido
      </Button>
    </div>
  );
};