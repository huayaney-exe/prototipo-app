"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Share2, Download, Home } from "lucide-react";
import Button from "@/components/ui/Button";

// Mock data
const paymentResult = {
  amount: 185000,
  date: "12 Ene 2025",
  time: "14:32",
  reference: "PSE-2025-0112-4567",
  remainingMonths: 11,
  currentMonth: 13,
  totalMonths: 24,
};

export default function ExitosoScreen() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `✅ Pagué mi cuota de Mibanco
Monto: ${formatCurrency(paymentResult.amount)}
Fecha: ${paymentResult.date}
Referencia: ${paymentResult.reference}

¡Ya me faltan solo ${paymentResult.remainingMonths} cuotas! 🏠`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleDownloadPDF = () => {
    // En producción, esto generaría un PDF
    alert("PDF descargado (simulación)");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Success animation area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Check animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-24 h-24 rounded-full bg-[var(--mibanco-green)] flex items-center justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-2"
        >
          ¡Pago exitoso!
        </motion.h1>

        {/* Amount */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-[var(--mibanco-green)] mb-6"
        >
          {formatCurrency(paymentResult.amount)}
        </motion.p>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-[var(--mibanco-gray-50)] rounded-xl p-4 mb-6"
        >
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">Fecha</span>
              <span className="font-medium text-[var(--mibanco-gray-900)]">
                {paymentResult.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">Hora</span>
              <span className="font-medium text-[var(--mibanco-gray-900)]">
                {paymentResult.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mibanco-gray-500)]">Referencia</span>
              <span className="font-medium text-[var(--mibanco-gray-900)]">
                {paymentResult.reference}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-[var(--mibanco-gray-600)]">
            Te faltan{" "}
            <span className="font-bold text-[var(--mibanco-green)]">
              {paymentResult.remainingMonths} cuotas
            </span>{" "}
            para terminar 🎉
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
        {/* WhatsApp share - DIFERENCIADOR PRINCIPAL */}
        <Button onClick={handleShareWhatsApp} size="full">
          <Share2 className="w-5 h-5" />
          Compartir por WhatsApp
        </Button>

        {/* Download PDF */}
        <Button onClick={handleDownloadPDF} variant="outline" size="full">
          <Download className="w-5 h-5" />
          Descargar PDF
        </Button>

        {/* Back to home */}
        <button
          onClick={() => router.push("/home")}
          className="w-full text-center text-[var(--mibanco-green)] py-3 font-medium flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
