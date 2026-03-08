import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface AlertData {
  product: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  mapUrl: string;
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
        // Get localização do usuário
        const coords = await getLocation();
        const { latitude, longitude } = coords;

        // Create Google Maps URL
        const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

        // Create WhatsApp message
        const message = encodeURIComponent(
          `🚨 ALERTA DE EMERGÊNCIA 🚨\n\n` +
            `Produto: ${productName}\n` +
            `Localização: https://maps.google.com/?q=${latitude},${longitude}\n` +
            `Hora: ${new Date().toLocaleString("pt-BR")}\n\n` +
            `⚠️ Esta é uma mensagem de emergência. Por favor, responda imediatamente.`
        );

        // Limpar o número WhatsApp
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

        // abrir WhatsApp
        window.open(whatsappUrl, "_blank");

        const alertData: AlertData = {
          product: productName,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
          mapUrl,
        };

        // Histórico
        const alerts = JSON.parse(
          localStorage.getItem("emergencyAlerts") || "[]"
        );
        alerts.push(alertData);
        localStorage.setItem("emergencyAlerts", JSON.stringify(alerts));

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
