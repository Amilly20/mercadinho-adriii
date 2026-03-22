import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCog, ShoppingBag, Store } from "lucide-react";

const MainSelection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("roleSelected");
    // Se não houver role selecionada, mostra a tela de seleção
    if (!role) {
      setIsVisible(true);
    }
  }, []);

  const handleClient = () => {
    localStorage.setItem("roleSelected", "client");
    setIsVisible(false);
  };

  const handleAdmin = () => {
    navigate("/admin-login");
  };

  const handleSeller = () => {
    navigate("/seller-login");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8 p-8 max-w-2xl w-full animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
            Mercadinho Adri
          </h1>
          <p className="text-xl text-muted-foreground">
            Selecione como deseja acessar a loja
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <Button 
            variant="outline" 
            className="h-48 flex flex-col items-center justify-center gap-4 border-2 hover:border-primary hover:bg-primary/5 transition-all text-lg"
            onClick={handleClient}
          >
            <div className="p-4 rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-primary" />
            </div>
            Sou Cliente
          </Button>

          <Button 
            variant="outline" 
            className="h-48 flex flex-col items-center justify-center gap-4 border-2 hover:border-primary hover:bg-primary/5 transition-all text-lg"
            onClick={handleSeller}
          >
            <div className="p-4 rounded-full bg-secondary">
              <Store className="h-12 w-12 text-primary" />
            </div>
            Sou Vendedor (Caixa)
          </Button>

          <Button 
            variant="outline" 
            className="h-48 flex flex-col items-center justify-center gap-4 border-2 hover:border-primary hover:bg-primary/5 transition-all text-lg"
            onClick={handleAdmin}
          >
            <div className="p-4 rounded-full bg-secondary">
              <UserCog className="h-12 w-12 text-primary" />
            </div>
            Sou Administrador
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainSelection;
