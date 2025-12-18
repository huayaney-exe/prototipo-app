"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown, Lock, AlertTriangle, Wallet, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

// Mock data - En producción vendría del contexto/API
const cuentasData: Record<string, { tipo: string; numero: string; saldo: number }> = {
  "cuenta-001": { tipo: "Cuenta de Ahorros", numero: "***4567", saldo: 450000 },
  "cuenta-002": { tipo: "Cuenta de Ahorros", numero: "***8901", saldo: 125000 },
};

const creditosData: Record<string, { nombre: string; cuotaMensual: number; cuotaActual: number; totalCuotas: number; numero: string }> = {
  "cred-001": { nombre: "Crédito Casa", cuotaMensual: 185000, cuotaActual: 13, totalCuotas: 24, numero: "12345" },
  "cred-002": { nombre: "Crédito Negocio", cuotaMensual: 95000, cuotaActual: 8, totalCuotas: 18, numero: "67890" },
};

function ConfirmarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const creditoId = searchParams.get("credito") || "cred-001";
  const cuentaId = searchParams.get("cuenta") || "cuenta-001";

  const credito = creditosData[creditoId] || creditosData["cred-001"];
  const cuenta = cuentasData[cuentaId] || cuentasData["cuenta-001"];

  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check for error simulation (via query param or 10% random chance for demo)
    const simulateError = searchParams.get("error") === "true" || Math.random() < 0.1;

    if (simulateError) {
      router.push("/error");
    } else {
      router.push("/exitoso");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Header */}
      <header className="px-6 py-4 flex items-center border-b border-[var(--mibanco-gray-100)]">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Volver"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-6 h-6 text-[var(--mibanco-gray-700)]" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-[var(--mibanco-gray-900)]">
          Confirmar pago
        </h1>
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-6 py-6"
      >
        {/* Warning banner - Ultra clear confirmation */}
        <div className="bg-[var(--mibanco-yellow-50)] border border-[var(--mibanco-yellow-500)] rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--mibanco-yellow-600)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--mibanco-gray-700)] font-medium">
            Revisa bien antes de pagar
          </p>
        </div>

        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-[var(--mibanco-gray-500)] mb-2">Vas a pagar:</p>
          <p className="text-4xl font-bold text-[var(--mibanco-gray-900)]">
            {formatCurrency(credito.cuotaMensual)}
          </p>
          <p className="text-[var(--mibanco-gray-500)] mt-1">pesos</p>
        </div>

        {/* From/To Cards */}
        <div className="space-y-4">
          {/* From - Cuenta Mibanco */}
          <div className="bg-[var(--mibanco-gray-50)] rounded-xl p-4">
            <p className="text-sm text-[var(--mibanco-gray-500)] mb-2">
              Desde tu cuenta Mibanco:
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--mibanco-green-50)] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[var(--mibanco-green)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--mibanco-gray-900)]">
                  {cuenta.tipo}
                </p>
                <p className="text-sm text-[var(--mibanco-gray-500)]">
                  {cuenta.numero}
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-[var(--mibanco-green-50)] flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-[var(--mibanco-green)]" />
            </div>
          </div>

          {/* To - Crédito Mibanco */}
          <div className="bg-[var(--mibanco-gray-50)] rounded-xl p-4">
            <p className="text-sm text-[var(--mibanco-gray-500)] mb-2">
              Para tu crédito:
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--mibanco-yellow-50)] flex items-center justify-center">
                <Home className="w-5 h-5 text-[var(--mibanco-yellow-600)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--mibanco-gray-900)]">
                  {credito.nombre} - Cuota {credito.cuotaActual} de{" "}
                  {credito.totalCuotas}
                </p>
                <p className="text-sm text-[var(--mibanco-gray-500)]">
                  Crédito #{credito.numero}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Bottom section */}
      <div className="px-6 pb-8 safe-bottom space-y-4">
        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[var(--mibanco-gray-500)]">
          <Lock className="w-4 h-4" />
          <span className="text-sm">Pago seguro</span>
        </div>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          size="full"
          disabled={isProcessing}
          className={isProcessing ? "animate-pulse" : ""}
        >
          {isProcessing ? "Procesando..." : "SÍ, PAGAR AHORA"}
        </Button>

        {/* Cancel link */}
        <button
          onClick={() => router.back()}
          disabled={isProcessing}
          className="w-full text-center text-[var(--mibanco-gray-500)] py-2 text-sm"
        >
          ← Cancelar y revisar
        </button>
      </div>

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-[var(--mibanco-gray-500)]">
        Cargando...
      </div>
    </div>
  );
}

export default function ConfirmarScreen() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmarContent />
    </Suspense>
  );
}
