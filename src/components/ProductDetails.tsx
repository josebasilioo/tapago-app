import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/grocery';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetails = ({ product, onAddToCart }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
        <div className="text-6xl">🥤</div>
        <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
          Em estoque
        </Badge>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-foreground">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </div>

      {/* Quantity Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Quantidade</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Add to Cart Button */}
      <div className="sticky bottom-4">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
};