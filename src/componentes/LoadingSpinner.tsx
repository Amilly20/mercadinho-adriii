import { ShoppingCart } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <ShoppingCart className="h-16 w-16 text-primary animate-bounce" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
        <p className="text-lg font-semibold text-foreground animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
