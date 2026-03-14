import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
       <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mercado Adri Pimentinha</h3>
            <p className="text-primary-foreground/80 mb-4">
              Qualidade e frescor há mais de 10 anos servindo sua família.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">Rua das Flores, 123 - Centro</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">(77) 991995640</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">amillynolasco@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>Segunda a Sábado: 7h às 22h</p>
                  <p>Domingo: 7h às 20h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2026 Mercado Adri Pimentinha. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
