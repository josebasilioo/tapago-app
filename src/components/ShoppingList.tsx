import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { ShoppingItem } from '@/types/grocery';
import { mockShoppingList } from '@/data/mockData';

interface ShoppingListProps {
  onScanProduct: () => void;
}

export const ShoppingList = ({ onScanProduct }: ShoppingListProps) => {
  const [items, setItems] = useState<ShoppingItem[]>(mockShoppingList);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addNewItem = () => {
    if (newItemName.trim()) {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        checked: false
      };
      setItems([...items, newItem]);
      setNewItemName('');
      setIsAddingItem(false);
    }
  };

  const cancelAddItem = () => {
    setNewItemName('');
    setIsAddingItem(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addNewItem();
    } else if (e.key === 'Escape') {
      cancelAddItem();
    }
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Add new item section */}
      {!isAddingItem ? (
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={() => setIsAddingItem(true)}
        >
          <Plus className="h-4 w-4" />
          Adicionar item
        </Button>
      ) : (
        <div className="flex gap-2 animate-scale-in">
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Nome do item..."
            onKeyDown={handleKeyPress}
            autoFocus
            className="flex-1"
          />
          <Button
            onClick={addNewItem}
            disabled={!newItemName.trim()}
            size="sm"
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            onClick={cancelAddItem}
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Shopping list items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Checkbox
              checked={item.checked}
              onCheckedChange={() => toggleItem(item.id)}
              className="data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            <span 
              className={`flex-1 ${
                item.checked 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              } transition-all duration-200`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Scan product button */}
      <div className="pt-4">
        <Button 
          onClick={onScanProduct}
          className="w-full bg-success hover:bg-success/90 text-success-foreground"
          size="lg"
        >
          Escanear Produto
        </Button>
      </div>
    </div>
  );
};