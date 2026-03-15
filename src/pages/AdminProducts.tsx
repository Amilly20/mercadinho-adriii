import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, ArrowLeft, Save, Pencil, X, Search, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  image?: string;
  category?: string;
}

const defaultProducts = [
  { id: 1, name: "Tomate", price: "R$ 6,99", unit: "kg", category: "verduras", image: "/src/Ativos/produtos/tomate.jpg" },
  { id: 2, name: "Banana", price: "R$ 4,99", unit: "kg", category: "frutas", image: "/src/Ativos/produtos/banana.jpg" },
  { id: 3, name: "Pão Francês", price: "R$ 12,99", unit: "kg", category: "padaria", image: "/src/Ativos/produtos/pao-frances.jpg" },
  { id: 4, name: "Leite Integral", price: "R$ 5,49", unit: "L", category: "laticinios", image: "/src/Ativos/produtos/leite.jpg" },
  { id: 5, name: "Alface", price: "R$ 3,99", unit: "unid", category: "verduras", image: "/src/Ativos/produtos/alface.jpg" },
  { id: 6, name: "Queijo Minas", price: "R$ 38,90", unit: "kg", category: "laticinios", image: "/src/Ativos/produtos/queijo-minas.jpg" },
  { id: 7, name: "Maçã", price: "R$ 8,99", unit: "kg", category: "frutas", image: "/src/Ativos/produtos/maca.jpg" },
  { id: 8, name: "Iogurte Natural", price: "R$ 4,99", unit: "unid", category: "laticinios", image: "/src/Ativos/produtos/iogurte.jpg" },
];

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", unit: "", category: "", image: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.unit) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    let updatedProducts: Product[];

    if (editingId) {
      // Atualizar produto existente
      updatedProducts = products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: newProduct.name,
              price: newProduct.price.startsWith("R$") ? newProduct.price : `R$ ${newProduct.price}`,
              unit: newProduct.unit,
              image: newProduct.image,
              category: newProduct.category,
            }
          : p
      );
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso.",
      });
      setEditingId(null);
    } else {
      // Adicionar novo produto
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price.startsWith("R$") ? newProduct.price : `R$ ${newProduct.price}`,
        unit: newProduct.unit,
        image: newProduct.image,
        category: newProduct.category,
      };
      updatedProducts = [...products, product];
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso.",
      });
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({ name: "", price: "", unit: "", category: "", image: "" });
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct({ name: product.name, price: product.price, unit: product.unit, image: product.image || "", category: product.category || "" });
    setEditingId(product.id);
    // Rolar suavemente até o formulário
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setNewProduct({ name: "", price: "", unit: "", image: "", category: "" });
    setEditingId(null);
  };

  const handleRemoveProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    
    if (editingId === id) {
      handleCancelEdit();
    }

    toast({
      title: "Removido",
      description: "Produto removido da lista.",
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div ref={formRef} className="md:col-span-1 h-fit">
                <Card className={editingId ? "border-primary shadow-md" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {editingId ? <Pencil className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5" />}
                      {editingId ? "Editar Produto" : "Adicionar Novo Produto"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <Input 
                        value={newProduct.name} 
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="Ex: Arroz"
                      />
                    </div>
                  
                  <div>
                    <label className="text-sm font-medium">URL da Imagem</label>
                    <div className="flex gap-2">
                      <Input 
                        value={newProduct.image} 
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                      {newProduct.image && (
                        <div className="h-10 w-10 rounded border overflow-hidden flex-shrink-0 bg-muted">
                          <img src={newProduct.image} alt="Preview" className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>
                      )}
                    </div>
                  </div>

                    <div>
                      <label className="text-sm font-medium">Preço</label>
                      <Input 
                        value={newProduct.price} 
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="Ex: 25,90"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Unidade</label>
                      <Input 
                        value={newProduct.unit} 
                        onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                        placeholder="Ex: kg, un, L"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={handleSaveProduct}>
                        {editingId ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                        {editingId ? "Salvar Alterações" : "Adicionar"}
                      </Button>
                      {editingId && (
                        <Button variant="outline" size="icon" onClick={handleCancelEdit} title="Cancelar Edição">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Lista de Produtos ({filteredProducts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium">
                      <div className="col-span-5">Nome</div>
                      <div className="col-span-3">Preço</div>
                      <div className="col-span-2">Unidade</div>
                      <div className="col-span-2 text-right">Ações</div>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className={`grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center hover:bg-muted/20 transition-colors ${editingId === product.id ? "bg-primary/10 border-l-4 border-l-primary" : ""}`}>
                          <div className="col-span-5 font-medium">{product.name}</div>
                          <div className="col-span-3">{product.price}</div>
                          <div className="col-span-2 text-muted-foreground">{product.unit}</div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button 
                              variant={editingId === product.id ? "default" : "ghost"}
                              size="icon" 
                              onClick={() => handleEditProduct(product)}
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleRemoveProduct(product.id)}
                              title="Remover"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                          {searchTerm ? "Nenhum produto encontrado para a busca." : "Nenhum produto cadastrado."}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminProducts;
