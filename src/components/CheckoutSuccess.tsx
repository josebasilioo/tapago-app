import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, QrCode } from 'lucide-react';
import { PaymentMethod } from '@/types/grocery';
import { mockCartItems } from '@/data/mockData';

interface CheckoutSuccessProps {
  paymentMethod: PaymentMethod;
  onStartNewOrder: () => void;
}

export const CheckoutSuccess = ({ paymentMethod, onStartNewOrder }: CheckoutSuccessProps) => {
  const total = mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Success Header */}
      <div className="text-center space-y-4 animate-scale-in">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-10 w-10 text-success-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pagamento confirmado</h1>
          <p className="text-muted-foreground">Seu pedido foi processado com sucesso</p>
        </div>
      </div>

      {/* QR Code for pickup/receipt */}
      <Card className="p-6 text-center">
        <div className="w-32 h-32 bg-black mx-auto mb-4 rounded-lg flex items-center justify-center">
          <QrCode className="h-24 w-24 text-white" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Código QR</h3>
        <p className="text-sm text-muted-foreground">
          Apresente este código no caixa para retirar seus produtos
        </p>
      </Card>

      {/* Order Summary */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Resumo do pedido</h2>
        
        {/* Order ID */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">Pedido</span>
          <Badge variant="outline">#2024-001</Badge>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">Pagamento</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{paymentMethod.icon}</span>
            <span className="text-sm text-foreground">{paymentMethod.name}</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-xl text-foreground">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Status Info */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-green-800">Aguardando retirada</p>
            <p className="text-xs text-green-600">Seus produtos estão sendo preparados</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onStartNewOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Nova compra
        </Button>
        <Button 
          variant="outline"
          className="w-full"
          size="lg"
        >
          Ver compras anteriores
        </Button>
      </div>
    </div>
  );
};