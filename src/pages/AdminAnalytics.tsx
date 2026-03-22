import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowLeft, ArrowDown, ArrowUp, Database } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const ordersRaw = localStorage.getItem("orders");
  const orders = ordersRaw ? JSON.parse(ordersRaw) : [];

  const totalRevenue = orders.reduce((acc: number, order: any) => acc + parseFloat(order.total), 0);
  const totalOrders = orders.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const uniqueCustomers = new Set(orders.map((o: any) => o.customer?.email)).size;

  // Dados de Produtos (Top 5)
  const productRevenue: Record<string, number> = {};
  orders.forEach((order: any) => {
    (order.items || []).forEach((item: any) => {
      const price = parseFloat(String(item.price).replace("R$", "").replace(",", ".")) || 0;
      const revenue = price * (item.quantity || 0);
      if (productRevenue[item.name]) {
        productRevenue[item.name] += revenue;
      } else {
        productRevenue[item.name] = revenue;
      }
    });
  });

  const chartData = Object.entries(productRevenue)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Dados de Categoria (Pizza)
  const getCategory = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("tomate") || lower.includes("banana") || lower.includes("alface") || lower.includes("maçã")) return "Hortifruti";
    if (lower.includes("pão")) return "Padaria";
    if (lower.includes("leite") || lower.includes("queijo") || lower.includes("iogurte")) return "Laticínios";
    return "Outros";
  };

  const categoryRevenue: Record<string, number> = {};
  orders.forEach((order: any) => {
    (order.items || []).forEach((item: any) => {
      const price = parseFloat(String(item.price).replace("R$", "").replace(",", ".")) || 0;
      const revenue = price * (item.quantity || 0);
      const cat = getCategory(item.name);
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + revenue;
    });
  });

  const pieData = Object.entries(categoryRevenue).map(([name, value]) => ({ name, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Dados de Vendedores (Reais)
  const sellerStats: Record<string, number> = {};
  orders.forEach((order: any) => {
    const seller = order.sellerName || "Online/Cliente";
    const total = parseFloat(order.total) || 0;
    sellerStats[seller] = (sellerStats[seller] || 0) + total;
  });

  const sellers = Object.entries(sellerStats).map(([name, sales]) => ({ name, sales }));

  // Dados de Fluxo (Simulado)
  const cashFlow = [
    { name: "Seg", entrada: 4000, saida: 2400 },
    { name: "Ter", entrada: 3000, saida: 1398 },
    { name: "Qua", entrada: 2000, saida: 9800 },
    { name: "Qui", entrada: 2780, saida: 3908 },
    { name: "Sex", entrada: 1890, saida: 4800 },
    { name: "Sab", entrada: 2390, saida: 3800 },
    { name: "Dom", entrada: 3490, saida: 4300 },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate("/")}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Dashboard Completo</h1>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => navigate("/admin/data")} className="gap-2">
                  <Database className="h-4 w-4" />
                  Ver Banco de Dados
                </Button>
                <Button onClick={() => navigate("/admin/products")}>
                  Gerenciar Produtos
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground text-green-500 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> +20.1% este mês
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Despesas (Est.)</CardTitle>
                  <ArrowDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {(totalRevenue * 0.6).toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Custo operacional estimado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {(totalRevenue * 0.4).toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Fluxo de Caixa (Entradas vs Saídas)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cashFlow}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="entrada" stroke="#10b981" strokeWidth={2} name="Entradas" />
                        <Line type="monotone" dataKey="saida" stroke="#ef4444" strokeWidth={2} name="Saídas" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Vendas por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {pieData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">Sem dados de vendas</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho de Vendedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sellers.map((seller, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{seller.name}</span>
                        </div>
                        <span className="font-bold">R$ {seller.sales.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Produtos Mais Vendidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                          <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                          <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        Sem dados suficientes
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes (Em Aberto)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">Nenhum pedido registrado.</p>
                    ) : (
                      orders.slice().reverse().map((order: any) => (
                        <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-0 last:pb-0 gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4 text-primary" />
                              <span className="font-bold">Pedido #{order.id}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Cliente: {order.customer?.name || "Anônimo"} • {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Data desconhecida"} às {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : ""}
                            </p>
                            <p className="text-sm mt-1">{order.items?.length || 0} itens</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-lg text-green-600">R$ {parseFloat(order.total).toFixed(2)}</span>
                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium border border-yellow-200">
                              Pendente
                            </span>
                          </div>
                        </div>
                      ))
                    )}
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

export default AdminAnalytics;
