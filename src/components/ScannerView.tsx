import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Flashlight } from 'lucide-react';
import { Product } from '@/types/grocery';
import { mockProducts } from '@/data/mockData';

interface ScannerViewProps {
  onProductFound: (product: Product) => void;
}

export const ScannerView = ({ onProductFound }: ScannerViewProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false);
      // Return the first mock product (Coca-Cola)
      onProductFound(mockProducts[0]);
    }, 2000);
  };

  return (
    <div className="relative h-[calc(100vh-8rem)] bg-black animate-fade-in">
      {/* Camera view simulation */}
      <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 bg-black/20">
          <div className="relative w-full h-full">
            {/* Scanning frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 border-2 border-white/50 rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                
                {/* Scanning line animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-success animate-pulse">
                    <div className="h-full bg-gradient-to-r from-transparent via-success to-transparent animate-ping"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-32 left-0 right-0 text-center">
          <p className="text-white text-lg mb-4">
            {isScanning ? 'Escaneando produto...' : 'Aponte para o código de barras'}
          </p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
          {/* Flash toggle */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setFlashOn(!flashOn)}
            className={`text-white hover:bg-white/20 ${flashOn ? 'bg-white/20' : ''}`}
          >
            <Flashlight className="h-6 w-6" />
          </Button>

          {/* Capture button */}
          <Button
            size="lg"
            onClick={simulateScan}
            disabled={isScanning}
            className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-black disabled:opacity-50"
          >
            <Camera className="h-8 w-8" />
          </Button>

          {/* Placeholder for symmetry */}
          <div className="w-12 h-12"></div>
        </div>
      </div>

      {/* Scanning feedback */}
      {isScanning && (
        <div className="absolute inset-0 bg-success/20 flex items-center justify-center animate-pulse">
          <div className="bg-card p-6 rounded-lg shadow-lg animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-success border-t-transparent rounded-full animate-spin"></div>
              <span className="text-foreground font-medium">Processando...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};