"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Home, Briefcase, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

// Mock data - Créditos del cliente en Mibanco
const creditos = [
  {
    id: "cred-001",
    tipo: "casa",
    nombre: "Crédito Casa",
    icon: Home,
    cuotaMensual: 185000,
    saldoPendiente: 2450000,
    proximaFecha: "15 Ene 2025",
    diasParaVencer: 3,
    cuotaActual: 13,
    totalCuotas: 24,
  },
  {
    id: "cred-002",
    tipo: "negocio",
    nombre: "Crédito Negocio",
    icon: Briefcase,
    cuotaMensual: 320000,
    saldoPendiente: 4800000,
    proximaFecha: "20 Ene 2025",
    diasParaVencer: 8,
    cuotaActual: 6,
    totalCuotas: 18,
  },
];

export default function CreditoScreen() {
  const router = useRouter();
  const [selectedCredito, setSelectedCredito] = useState<string | null>(
    // Si solo hay un crédito, seleccionarlo automáticamente
    creditos.length === 1 ? creditos[0].id : null
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleContinue = () => {
    if (selectedCredito) {
      router.push(`/cuenta-cargo?credito=${selectedCredito}`);
    }
  };

  // Si solo hay un crédito, ir directo a cuenta cargo
  // (comentado para mostrar la UI en el prototipo)
  // useEffect(() => {
  //   if (creditos.length === 1) {
  //     router.replace(`/cuenta-cargo?credito=${creditos[0].id}`);
  //   }
  // }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Header */}
      <header className="px-6 py-4 flex items-center border-b border-[var(--mibanco-gray-100)]">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-[var(--mibanco-gray-700)]" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-[var(--mibanco-gray-900)]">
          Pagar cuota
        </h1>
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-6 py-6"
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--mibanco-gray-900)] mb-2">
          ¿Cuál crédito vas a pagar?
        </h2>
        <p className="text-[var(--mibanco-gray-500)] mb-6">
          Selecciona el crédito para pagar tu cuota
        </p>

        {/* Credit list */}
        <div className="space-y-4">
          {creditos.map((credito, index) => {
            const Icon = credito.icon;
            const isSelected = selectedCredito === credito.id;
            const isUrgent = credito.diasParaVencer <= 5;

            return (
              <motion.button
                key={credito.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCredito(credito.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-[var(--mibanco-green)] bg-[var(--mibanco-green-50)]"
                    : "border-[var(--mibanco-gray-200)] bg-white hover:border-[var(--mibanco-gray-300)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? "bg-[var(--mibanco-green)]"
                        : "bg-[var(--mibanco-gray-100)]"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? "text-white" : "text-[var(--mibanco-gray-600)]"
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[var(--mibanco-gray-900)]">
                        {credito.nombre}
                      </span>
                      {isUrgent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-[var(--mibanco-yellow)] text-[var(--mibanco-gray-900)] rounded-full text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          {credito.diasParaVencer} días
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--mibanco-gray-500)]">
                      Cuota {credito.cuotaActual} de {credito.totalCuotas} • Vence{" "}
                      {credito.proximaFecha}
                    </p>
                    <p className="text-lg font-bold text-[var(--mibanco-gray-900)] mt-2">
                      {formatCurrency(credito.cuotaMensual)}
                    </p>
                  </div>

                  {/* Check */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[var(--mibanco-green)] flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Info helper */}
        <div className="mt-6 p-4 bg-[var(--mibanco-gray-50)] rounded-xl">
          <p className="text-sm text-[var(--mibanco-gray-600)]">
            💡 El pago se descontará de tu cuenta Mibanco. Si no tienes saldo
            suficiente, puedes depositar primero.
          </p>
        </div>
      </motion.main>

      {/* Continue button */}
      <div className="px-6 pb-8 safe-bottom">
        <Button onClick={handleContinue} size="full" disabled={!selectedCredito}>
          Continuar
        </Button>
      </div>

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
