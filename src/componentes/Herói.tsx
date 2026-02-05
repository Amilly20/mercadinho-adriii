import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/Ativos/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Qualidade e Frescor
              <br />
              Direto para Você
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Ofertas especiais toda semana em produtos selecionados
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg animate-fade-in hover:scale-105 transition-transform"
              style={{ animationDelay: "0.2s" }}
            >
              Ver Ofertas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
