import { Card } from "@/components/ui/card";
import categoryVegetables from "@/Ativos/category-vegetables.jpg";
import categoryFruits from "@/Ativos/category-fruits.jpg";
import categoryBakery from "@/Ativos/categoria-padaria.jpg";
import categoryDairy from "@/Ativos/category-dairy.jpg";

import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Hortifruti", slug: "verduras", image: categoryVegetables },
  { id: 2, name: "Frutas", slug: "frutas", image: categoryFruits },
  { id: 3, name: "Padaria", slug: "padaria", image: categoryBakery },
  { id: 4, name: "Laticínios", slug: "laticinios", image: categoryDairy },
];

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/?categoria=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-2 hover:border-primary hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
