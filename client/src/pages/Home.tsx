import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard, Product } from "@/components/ProductCard";
import { SetupPhoneDialog } from "@/components/SetupPhoneDialog";
import { useEmergencyAlert } from "@/hooks/useEmergencyAlert";
import { AlertTriangle, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS: Product[] = [
  {
    id: "pizza-emergency",
    name: "Pizza Especial",
    description: "Clique para enviar alerta de emergência com sua localização",
    icon: "🚨",
    isEmergency: true,
  },
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    description: "Tomate, mozzarela e manjericão",
    icon: "🍕",
  },
  {
    id: "pizza-pepperoni",
    name: "Pizza Pepperoni",
    description: "Queijo e pepperoni",
    icon: "🍕",
  },
  {
    id: "pizza-vegetariana",
    name: "Pizza Vegetariana",
    description: "Vegetais frescos variados",
    icon: "🥗",
  },
  {
    id: "refrigerante",
    name: "Refrigerante",
    description: "Bebidas variadas",
    icon: "🥤",
  },
  {
    id: "cerveja",
    name: "Cerveja",
    description: "Cervejas artesanais",
    icon: "🍺",
  },
  {
    id: "sobremesa",
    name: "Sobremesa",
    description: "Doces e sobremesas",
    icon: "🍰",
  },
  {
    id: "agua",
    name: "Água",
    description: "Água mineral",
    icon: "💧",
  },
];

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { sendAlert, isLoading } = useEmergencyAlert();

  // Load phone number from localStorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("emergencyPhone");
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    } else {
      // Show setup dialog on first visit
      setSetupDialogOpen(true);
    }
  }, []);

  const handleSavePhone = (phone: string) => {
    setPhoneNumber(phone);
    localStorage.setItem("emergencyPhone", phone);
  };

  const handleProductSelect = async (product: Product) => {
    if (product.isEmergency) {
      // Emergency alert
      if (!phoneNumber) {
        setSetupDialogOpen(true);
        toast.error("Configure um número de emergência primeiro");
        return;
      }

      const confirmed = window.confirm(
        "Você tem certeza que deseja enviar um alerta de emergência?\n\nSua localização será enviada para o número configurado."
      );

      if (!confirmed) return;

      await sendAlert(product.name, phoneNumber);
    } else {
      // Regular product selection
      setSelectedProduct(product);
      toast.success(`${product.name} adicionado ao carrinho`);
      setTimeout(() => setSelectedProduct(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍕</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pizza Delivery
              </h1>
              <p className="text-xs text-gray-500">Entrega rápida e segura</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSetupDialogOpen(true)}
            className="gap-2"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">
              {phoneNumber ? "Editar" : "Configurar"}
            </span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Bem-vinda ao Pizza Delivery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selecione seus produtos ou use a opção de especial se precisar de
              ajuda
            </p>
          </div>

          {/* Emergency Alert Banner */}
          {phoneNumber && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">
                  Número para contato configurado
                </p>
                <p className="text-sm text-red-800">
                  Ao clicar em "Pizza Especial", um alerta será enviado para{" "}
                  <span className="font-mono font-bold">{phoneNumber}</span>
                </p>
              </div>
            </div>
          )}

          {!phoneNumber && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">
                  Configure seu número de contato especial
                </p>
                <p className="text-sm text-blue-800">
                  Clique no botão "Configurar" no canto superior direito para
                  adicionar um número de contato de segurança, vizinho ou
                  parente.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Pizza Delivery</h3>
              <p className="text-sm text-gray-600">
                Seu serviço de entrega confiável
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button
                    onClick={() => setSetupDialogOpen(true)}
                    className="hover:text-gray-900 transition-colors"
                  >
                    Configurar Especial
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Histórico de Pedidos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Segurança</h4>
              <p className="text-sm text-gray-600">
                Seus dados são armazenados apenas localmente no seu navegador.
                Nunca compartilhamos informações com terceiros.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              © 2026 Pizza Delivery. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Setup Phone Dialog */}
      <SetupPhoneDialog
        open={setupDialogOpen}
        onOpenChange={setSetupDialogOpen}
        onSave={handleSavePhone}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin mb-4">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-900 font-semibold">
              Obtendo sua localização...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
