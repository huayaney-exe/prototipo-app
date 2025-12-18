"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Wallet, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

// Mock data - Cuentas del cliente en Mibanco
const cuentas = [
  {
    id: "cuenta-001",
    tipo: "Cuenta de Ahorros",
    numero: "***4567",
    saldo: 450000,
    disponible: 450000,
  },
  {
    id: "cuenta-002",
    tipo: "Cuenta de Ahorros",
    numero: "***8901",
    saldo: 125000,
    disponible: 125000,
  },
];

// Monto de la cuota a pagar (en producción vendría del crédito seleccionado)
const cuotaAPagar = 185000;

function CuentaCargoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const creditoId = searchParams.get("credito") || "cred-001";

  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleContinue = () => {
    if (selectedCuenta) {
      router.push(`/confirmar?credito=${creditoId}&cuenta=${selectedCuenta}`);
    }
  };

  const cuentaSeleccionada = cuentas.find((c) => c.id === selectedCuenta);
  const saldoInsuficiente =
    cuentaSeleccionada && cuentaSeleccionada.disponible < cuotaAPagar;

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
        {/* Amount to pay */}
        <div className="text-center mb-6 pb-6 border-b border-[var(--mibanco-gray-100)]">
          <p className="text-[var(--mibanco-gray-500)] mb-1">Vas a pagar</p>
          <p className="text-3xl font-bold text-[var(--mibanco-gray-900)]">
            {formatCurrency(cuotaAPagar)}
          </p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--mibanco-gray-900)] mb-2">
          ¿Desde cuál cuenta?
        </h2>
        <p className="text-[var(--mibanco-gray-500)] mb-6">
          Selecciona la cuenta de donde se descontará el pago
        </p>

        {/* Account list */}
        <div className="space-y-3">
          {cuentas.map((cuenta, index) => {
            const isSelected = selectedCuenta === cuenta.id;
            const insuficiente = cuenta.disponible < cuotaAPagar;

            return (
              <motion.button
                key={cuenta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCuenta(cuenta.id)}
                disabled={insuficiente}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  insuficiente
                    ? "border-[var(--mibanco-gray-200)] bg-[var(--mibanco-gray-50)] opacity-60"
                    : isSelected
                    ? "border-[var(--mibanco-green)] bg-[var(--mibanco-green-50)]"
                    : "border-[var(--mibanco-gray-200)] bg-white hover:border-[var(--mibanco-gray-300)]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      insuficiente
                        ? "bg-[var(--mibanco-gray-200)]"
                        : isSelected
                        ? "bg-[var(--mibanco-green)]"
                        : "bg-[var(--mibanco-gray-100)]"
                    }`}
                  >
                    <Wallet
                      className={`w-6 h-6 ${
                        insuficiente
                          ? "text-[var(--mibanco-gray-400)]"
                          : isSelected
                          ? "text-white"
                          : "text-[var(--mibanco-gray-600)]"
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--mibanco-gray-900)]">
                      {cuenta.tipo}
                    </p>
                    <p className="text-sm text-[var(--mibanco-gray-500)]">
                      {cuenta.numero}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p
                        className={`text-sm font-medium ${
                          insuficiente
                            ? "text-red-500"
                            : "text-[var(--mibanco-green)]"
                        }`}
                      >
                        Disponible: {formatCurrency(cuenta.disponible)}
                      </p>
                      {insuficiente && (
                        <span className="text-xs text-red-500">
                          (Saldo insuficiente)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Check or Warning */}
                  {insuficiente ? (
                    <AlertTriangle className="w-5 h-5 text-[var(--mibanco-gray-400)]" />
                  ) : isSelected ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[var(--mibanco-green)] flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : null}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Warning if insufficient */}
        {saldoInsuficiente && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700">
                No tienes saldo suficiente
              </p>
              <p className="text-sm text-red-600 mt-1">
                Necesitas {formatCurrency(cuotaAPagar - cuentaSeleccionada.disponible)}{" "}
                más. Puedes depositar primero o usar otra cuenta.
              </p>
            </div>
          </motion.div>
        )}

        {/* Deposit CTA if no sufficient accounts */}
        {cuentas.every((c) => c.disponible < cuotaAPagar) && (
          <div className="mt-6 p-4 bg-[var(--mibanco-yellow-50)] border border-[var(--mibanco-yellow-500)] rounded-xl">
            <p className="text-sm text-[var(--mibanco-gray-700)] mb-3">
              Ninguna cuenta tiene saldo suficiente para esta cuota.
            </p>
            <button
              onClick={() => router.push("/depositar")}
              className="text-sm font-semibold text-[var(--mibanco-green)] hover:underline"
            >
              Depositar dinero →
            </button>
          </div>
        )}
      </motion.main>

      {/* Continue button */}
      <div className="px-6 pb-8 safe-bottom">
        <Button
          onClick={handleContinue}
          size="full"
          disabled={!selectedCuenta || saldoInsuficiente}
        >
          Continuar
        </Button>
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

export default function CuentaCargoScreen() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CuentaCargoContent />
    </Suspense>
  );
}
