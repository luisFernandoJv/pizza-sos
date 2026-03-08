import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SetupPhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (phoneNumber: string) => void;
}

export function SetupPhoneDialog({
  open,
  onOpenChange,
  onSave,
}: SetupPhoneDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    // Remove non-numeric characters
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      toast.error("Por favor, insira um número de telefone válido");
      return;
    }

    setIsLoading(true);
    // Simulate save
    setTimeout(() => {
      onSave(phoneNumber);
      setPhoneNumber("");
      setIsLoading(false);
      onOpenChange(false);
      toast.success("Número de emergência configurado com sucesso!");
    }, 500);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    // Format as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
    }

    setPhoneNumber(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Configurar Número de Contato
          </DialogTitle>
          <DialogDescription>
            Este número receberá seus alertas de segurança. Pode ser um amigo,
            familiar ou organização de apoio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número de Telefone (WhatsApp)</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={phoneNumber}
              onChange={handlePhoneChange}
              type="tel"
              className="text-base"
            />
            <p className="text-xs text-gray-500">
              Formato: (XX) XXXXX-XXXX (com DDD)
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <strong>Privacidade:</strong> Este número é armazenado apenas no
              seu navegador e nunca é enviado para nossos servidores.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || phoneNumber.replace(/\D/g, "").length < 10}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
