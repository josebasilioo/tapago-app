import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Home, Search, User } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showBottomNav?: boolean;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const MobileLayout = ({ 
  children, 
  title, 
  showBack = false, 
  onBack,
  showBottomNav = true,
  currentView = '',
  onNavigate
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-1 h-8 w-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold text-foreground flex-1">{title}</h1>
      </div>

      {/* Content */}
      <div className={`${showBottomNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && onNavigate && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
          <div className="flex items-center justify-around py-2">
            <Button 
              variant={currentView === 'shopping-list' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'shopping-list' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('shopping-list')}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Lista de compras</span>
            </Button>
            <Button 
              variant={currentView === 'scanner' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'scanner' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('scanner')}
            >
              <Search className="h-5 w-5" />
              <span className="text-xs">Escanear</span>
            </Button>
            <Button 
              variant={currentView === 'cart' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'cart' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">Carrinho</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};