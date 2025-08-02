import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PaymentMethod } from '@/types/grocery';
import { mockPaymentMethods, mockCartItems } from '@/data/mockData';

interface PaymentViewProps {
  onConfirmPayment: (paymentMethod: PaymentMethod) => void;
}

export const PaymentView = ({ onConfirmPayment }: PaymentViewProps) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('1');

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

  const handleConfirmPayment = () => {
    const paymentMethod = mockPaymentMethods.find(method => method.id === selectedPayment);
    if (paymentMethod) {
      onConfirmPayment(paymentMethod);
    }
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Payment Methods */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Método de pagamento</h2>
        <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
          {mockPaymentMethods.map((method, index) => (
            <div 
              key={method.id} 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RadioGroupItem 
                value={method.id} 
                id={method.id}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              <Label htmlFor={method.id} className="flex-1 flex items-center gap-3 cursor-pointer">
                <span className="text-lg">{method.icon}</span>
                <span className="text-foreground">{method.name}</span>
              </Label>
              {method.type === 'pix' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Instantâneo
                </Badge>
              )}
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Order Summary */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Resumo do pedido</h2>
        <div className="space-y-3">
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
              <span className="font-bold text-xl text-foreground">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Promotional Message */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              <strong>Tela Promocional</strong> para sua próxima compra garante desconto personalizado
            </p>
          </div>
        </div>
      </Card>

      {/* Confirm Payment Button */}
      <Button 
        onClick={handleConfirmPayment}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        size="lg"
      >
        Pagar R$ {total.toFixed(2)}
      </Button>
    </div>
  );
};