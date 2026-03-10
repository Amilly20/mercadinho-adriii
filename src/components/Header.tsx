import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Cabeçalho from "../componentes/Cabeçalho";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("roleSelected");
    setIsAdmin(role === "admin");
  }, [location.pathname]);

  return (
    <div className="relative">
      <Cabeçalho />
      {isAdmin && !location.pathname.startsWith("/admin") && (
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-auto md:right-48 z-50">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin")}
            className="gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
