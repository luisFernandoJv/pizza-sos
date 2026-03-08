import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface AlertData {
  product: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  mapUrl: string;
}

/**
 * Abre uma URL de forma confiável em qualquer dispositivo.
 * - Em mobile: usa window.location.href (evita bloqueio de popup)
 * - Em desktop: cria um <a> e clica programaticamente (mais confiável que window.open)
 */
function openWhatsApp(url: string) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // No mobile, redireciona direto — abre o app do WhatsApp nativamente
    window.location.href = url;
  } else {
    // No desktop, cria link temporário e clica — evita bloqueio de popup
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * Normaliza o número para o formato internacional do WhatsApp (wa.me).
 * Exemplos aceitos:
 *   "(11) 99999-9999"  → "5511999999999"
 *   "5511999999999"    → "5511999999999"  (já correto)
 *   "+5511999999999"   → "5511999999999"
 */
function normalizeWhatsAppNumber(phoneNumber: string): string {
  // Remove tudo que não for dígito
  const digits = phoneNumber.replace(/\D/g, "");

  // Se já começa com 55 e tem tamanho de número brasileiro completo (12 ou 13 dígitos)
  if (
    digits.startsWith("55") &&
    (digits.length === 12 || digits.length === 13)
  ) {
    return digits;
  }

  // Se tem 10 ou 11 dígitos, é número brasileiro sem DDI → adiciona 55
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  // Qualquer outro caso, retorna como está (número internacional já formatado)
  return digits;
}

export function useEmergencyAlert() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);

  const getLocation = useCallback((): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não disponível"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          setHasLocation(true);
          resolve(position.coords);
        },
        error => {
          console.error("Erro ao obter localização:", error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  const sendAlert = useCallback(
    async (
      productName: string,
      phoneNumber: string
    ): Promise<AlertData | null> => {
      if (!phoneNumber) {
        toast.error("Por favor, configure um número de emergência primeiro");
        return null;
      }

      setIsLoading(true);

      try {
        // Obtém localização do usuário
        const coords = await getLocation();
        const { latitude, longitude } = coords;

        // URL do Google Maps
        const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

        // Mensagem de alerta
        const message = encodeURIComponent(
          `🚨 ALERTA DE EMERGÊNCIA 🚨\n\n` +
            `Produto: ${productName}\n` +
            `Localização: ${mapUrl}\n` +
            `Hora: ${new Date().toLocaleString("pt-BR")}\n\n` +
            `⚠️ Esta é uma mensagem de emergência. Por favor, responda imediatamente.`
        );

        // Normaliza o número para o formato correto do WhatsApp (com DDI 55)
        const whatsappPhone = normalizeWhatsAppNumber(phoneNumber);
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`;

        // Abre o WhatsApp de forma compatível com qualquer dispositivo
        openWhatsApp(whatsappUrl);

        const alertData: AlertData = {
          product: productName,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
          mapUrl,
        };

        // Salva no histórico local
        try {
          const alerts = JSON.parse(
            localStorage.getItem("emergencyAlerts") || "[]"
          );
          alerts.push(alertData);
          localStorage.setItem("emergencyAlerts", JSON.stringify(alerts));
        } catch {
          // Falha silenciosa no histórico — não impede o alerta
        }

        toast.success("Alerta enviado! WhatsApp aberto.");
        return alertData;
      } catch (error) {
        console.error("Erro ao enviar alerta:", error);

        if (error instanceof GeolocationPositionError) {
          if (error.code === 1) {
            toast.error(
              "Permissão de localização negada. Por favor, ative a localização."
            );
          } else if (error.code === 2) {
            toast.error(
              "Não foi possível obter a localização. Tente novamente."
            );
          } else {
            toast.error("Erro ao obter localização. Tente novamente.");
          }
        } else {
          toast.error("Erro ao enviar alerta. Tente novamente.");
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getLocation]
  );

  return {
    sendAlert,
    isLoading,
    hasLocation,
  };
}
