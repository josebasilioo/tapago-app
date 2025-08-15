
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDetails } from '@/components/ProductDetails';
import { MobileLayout } from '@/components/MobileLayout';
import { Product, CartItem } from '@/types/grocery';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const ref = searchParams.get('ref');
  const code = searchParams.get('code');

  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Show special message if came from QR code
      if (ref === 'qr') {
        toast({
          title: "Produto escaneado!",
          description: `${foundProduct.name} encontrado via QR Code${code ? ` (${code})` : ''}`,
        });
      }
    } else {
      toast({
        title: "Produto não encontrado",
        description: "O produto solicitado não foi encontrado.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [id, ref, code, toast, navigate]);

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
    
    // Navigate back to main app with cart view
    navigate('/?view=cart');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!product) {
    return (
      <MobileLayout title="Carregando..." showBack onBack={handleBack}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando produto...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Detalhes do produto" showBack onBack={handleBack}>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </MobileLayout>
  );
};

export default ProductPage;
