import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isEmergency?: boolean;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card
      className={`flex flex-col h-full transition-all duration-200 hover:shadow-lg ${
        product.isEmergency
          ? "border-2 border-red-600 bg-red-50"
          : "hover:border-gray-300"
      }`}
    >
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {product.description}
            </CardDescription>
          </div>
          <div className="text-3xl flex-shrink-0">{product.icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => onSelect(product)}
          className={`w-full ${
            product.isEmergency
              ? "bg-red-600 hover:bg-red-700 text-white font-bold"
              : "bg-gray-900 hover:bg-gray-800 text-white"
          }`}
          size="sm"
        >
          {product.isEmergency ? "ENVIAR PEDIDO ESPECIAL" : "Selecionar"}
        </Button>
      </CardContent>
    </Card>
  );
}
