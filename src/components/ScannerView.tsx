import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Flashlight, RotateCcw } from 'lucide-react';
import { Product } from '@/types/grocery';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

interface ScannerViewProps {
  onProductFound: (product: Product) => void;
}

export const ScannerView = ({ onProductFound }: ScannerViewProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();

  // Start camera and QR scanner when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup: stop camera and QR scanner when component unmounts
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Stop existing QR scanner and stream
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Initialize QR Scanner
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => handleQrResult(result.data),
          {
            preferredCamera: facingMode,
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );
        
        // Start QR scanning
        await qrScannerRef.current.start();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Não foi possível acessar a câmera. Verifique as permissões.');
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
        variant: "destructive"
      });
    }
  };

  const toggleCamera = () => {
    setFacingMode(current => current === 'user' ? 'environment' : 'user');
  };

  const toggleFlash = async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && 'torch' in videoTrack.getCapabilities()) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ torch: !flashOn } as any]
          });
          setFlashOn(!flashOn);
        } catch (error) {
          console.error('Error toggling flash:', error);
          toast({
            title: "Flash não disponível",
            description: "Este dispositivo não suporta controle de flash.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Flash não disponível",
          description: "Este dispositivo não suporta controle de flash.",
          variant: "destructive"
        });
      }
    }
  };

  const handleQrResult = (data: string) => {
    setIsScanning(true);
    
    // Check if the result is a URL (QR code with link)
    const urlPattern = /^(https?:\/\/|www\.)/i;
    
    if (urlPattern.test(data)) {
      // It's a URL - redirect to it
      toast({
        title: "QR Code detectado!",
        description: `Redirecionando para: ${data}`,
      });
      
      setTimeout(() => {
        window.open(data, '_blank');
        setIsScanning(false);
      }, 1000);
    } else {
      // Treat as product barcode - simulate finding a product
      setTimeout(() => {
        setIsScanning(false);
        const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        onProductFound(randomProduct);
        toast({
          title: "Produto encontrado!",
          description: `${randomProduct.name} foi escaneado com sucesso.`,
        });
      }, 1000);
    }
  };

  const simulateScan = () => {
    // Trigger a manual scan attempt
    if (qrScannerRef.current) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        toast({
          title: "Nenhum código detectado",
          description: "Tente posicionar o código dentro do quadrado.",
          variant: "destructive"
        });
      }, 2000);
    }
  };

  if (cameraError) {
    return (
      <div className="relative h-[calc(100vh-8rem)] bg-black animate-fade-in flex items-center justify-center">
        <div className="text-center text-white p-6">
          <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">Erro na Câmera</h2>
          <p className="text-white/80 mb-4">{cameraError}</p>
          <Button 
            onClick={startCamera}
            variant="outline"
            className="text-black bg-white hover:bg-white/90"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-8rem)] bg-black animate-fade-in overflow-hidden">
      {/* Camera video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Scanning overlay */}
      <div className="absolute inset-0 bg-black/20">
        <div className="relative w-full h-full">
          {/* Scanning frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64 border-2 border-white/70 rounded-lg">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              
              {/* Scanning line animation */}
              {isScanning && (
                <div className="absolute inset-x-0 top-1/2 h-1 bg-success animate-pulse">
                  <div className="h-full bg-gradient-to-r from-transparent via-success to-transparent animate-ping"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-32 left-0 right-0 text-center px-4">
        <p className="text-white text-lg mb-2 drop-shadow-lg">
          {isScanning ? 'Escaneando produto...' : 'Aponte para o código de barras'}
        </p>
        <p className="text-white/80 text-sm drop-shadow-lg">
          Posicione o código dentro do quadrado
        </p>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
        {/* Flash toggle */}
        <Button
          variant="ghost"
          size="lg"
          onClick={toggleFlash}
          className={`text-white hover:bg-white/20 ${flashOn ? 'bg-white/20' : ''}`}
        >
          <Flashlight className={`h-6 w-6 ${flashOn ? 'text-yellow-300' : ''}`} />
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

        {/* Camera flip button */}
        <Button
          variant="ghost"
          size="lg"
          onClick={toggleCamera}
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Scanning feedback */}
      {isScanning && (
        <div className="absolute inset-0 bg-success/20 flex items-center justify-center animate-pulse">
          <div className="bg-card p-6 rounded-lg shadow-lg animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-success border-t-transparent rounded-full animate-spin"></div>
              <span className="text-foreground font-medium">Processando código...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};