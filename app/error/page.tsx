"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, MessageCircle, Home } from "lucide-react";
import Button from "@/components/ui/Button";

// Mock data - error info
const errorInfo = {
  code: "ERR-PAGO-001",
  timestamp: new Date().toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  message: "No se pudo procesar la transacción",
};

export default function ErrorScreen() {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/credito");
  };

  const handleContactAdvisor = () => {
    const message = encodeURIComponent(
      `Hola, necesito ayuda con un pago que no se procesó.

Código de error: ${errorInfo.code}
Fecha: ${errorInfo.timestamp}

¿Me pueden ayudar?`
    );
    window.open(`https://wa.me/573143576553?text=${message}`, "_blank");
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Error animation area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* X animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <XCircle className="w-12 h-12 text-red-500" strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-2 text-center"
        >
          No pudimos procesar tu pago
        </motion.h1>

        {/* Reassurance message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[var(--mibanco-gray-500)] text-center mb-6"
        >
          No te preocupes, tu dinero no fue descontado
        </motion.p>

        {/* Error details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-[var(--mibanco-gray-50)] rounded-xl p-4 mb-6"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">¿Qué pasó?</span>
              <span className="font-medium text-[var(--mibanco-gray-900)] text-right">
                {errorInfo.message}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">Código</span>
              <span className="font-medium text-[var(--mibanco-gray-900)]">
                {errorInfo.code}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">Fecha</span>
              <span className="font-medium text-[var(--mibanco-gray-900)]">
                {errorInfo.timestamp}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Helpful tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[var(--mibanco-yellow-50)] rounded-xl p-4 mb-8 w-full"
        >
          <p className="text-sm text-[var(--mibanco-gray-700)]">
            💡 <strong>Consejo:</strong> Puedes intentarlo de nuevo o contactar a tu asesor si el problema persiste.
          </p>
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 pb-8 safe-bottom space-y-3"
      >
        {/* Retry button */}
        <Button onClick={handleRetry} size="full">
          <RefreshCw className="w-5 h-5" />
          Intentar de nuevo
        </Button>

        {/* Contact advisor */}
        <Button onClick={handleContactAdvisor} variant="outline" size="full">
          <MessageCircle className="w-5 h-5" />
          Hablar con mi asesor
        </Button>

        {/* Back to home */}
        <button
          onClick={handleGoHome}
          className="w-full text-center text-[var(--mibanco-gray-500)] py-3 font-medium flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
