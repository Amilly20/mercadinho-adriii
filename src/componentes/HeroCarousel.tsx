import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroBanner from "@/Ativos/hero-banner.jpg";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "🔥 Promoções do Dia!",
    description: "Confira as melhores ofertas e descontos separados especialmente para você hoje.",
    buttonText: "Ver Promoções do Dia",
    link: "/?categoria=ofertas",
  },
  {
    title: "Qualidade e Frescor Direto para Você",
    description: "Produtos selecionados com o maior carinho para a sua família.",
    buttonText: "Comprar Agora",
    link: "/",
  },
  {
    title: "Frutas e Verduras Fresquinhas",
    description: "Colhidos hoje, na sua mesa amanhã.",
    buttonText: "Ver Hortifruti",
    link: "/?categoria=hortifruti",
  },
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
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
                        {slide.title}
                      </h2>
                      <p
                        className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in"
                        style={{ animationDelay: "0.1s" }}
                      >
                        {slide.description}
                      </p>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg animate-fade-in hover:scale-105 transition-transform"
                        style={{ animationDelay: "0.2s" }}
                        onClick={() => navigate(slide.link)}
                      >
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110 flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110 flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-primary-foreground"
                  : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
