import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const allProducts = [
  { id: 1, name: "Tomate", category: "Verduras" },
  { id: 2, name: "Banana", category: "Frutas" },
  { id: 3, name: "Pão Francês", category: "Padaria" },
  { id: 4, name: "Leite Integral", category: "Laticínios" },
  { id: 5, name: "Alface", category: "Verduras" },
  { id: 6, name: "Queijo Minas", category: "Laticínios" },
  { id: 7, name: "Maçã", category: "Frutas" },
  { id: 8, name: "Iogurte Natural", category: "Laticínios" },
];

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchBar = ({ value, onChange, className = "" }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<typeof allProducts>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.trim().length > 0) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar produtos..."
        className="pl-10 pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value && setShowSuggestions(true)}
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            setShowSuggestions(false);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}

      {showSuggestions && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-64 overflow-y-auto shadow-lg">
          <div className="p-2">
            {suggestions.map((product) => (
              <button
                key={product.id}
                className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors"
                onClick={() => {
                  onChange(product.name);
                  setShowSuggestions(false);
                }}
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
