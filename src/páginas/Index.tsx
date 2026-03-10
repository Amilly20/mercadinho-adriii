import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoriesGrid from "@/components/CategoriesGrid";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSelection from "@/components/MainSelection";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <MainSelection />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-6">
              <HeroCarousel />
            </div>
            <CategoriesGrid />
            <ProductsGrid />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
