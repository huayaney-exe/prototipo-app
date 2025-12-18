"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Share2 } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

// Mock data - historial de pagos
const payments = [
  {
    id: 1,
    date: "15 Dic 2024",
    amount: 185000,
    status: "confirmed",
    month: 12,
    reference: "PSE-2024-1215-3421",
  },
  {
    id: 2,
    date: "15 Nov 2024",
    amount: 185000,
    status: "confirmed",
    month: 11,
    reference: "PSE-2024-1115-2198",
  },
  {
    id: 3,
    date: "15 Oct 2024",
    amount: 185000,
    status: "confirmed",
    month: 10,
    reference: "PSE-2024-1015-7654",
  },
  {
    id: 4,
    date: "15 Sep 2024",
    amount: 185000,
    status: "confirmed",
    month: 9,
    reference: "PSE-2024-0915-4321",
  },
  {
    id: 5,
    date: "15 Ago 2024",
    amount: 185000,
    status: "confirmed",
    month: 8,
    reference: "PSE-2024-0815-8765",
  },
  {
    id: 6,
    date: "15 Jul 2024",
    amount: 185000,
    status: "confirmed",
    month: 7,
    reference: "PSE-2024-0715-1234",
  },
];

const tabs = [
  { id: "recent", label: "Últimos 3 meses" },
  { id: "all", label: "Todos" },
];

export default function HistorialScreen() {
  const [activeTab, setActiveTab] = useState("recent");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSharePayment = (payment: (typeof payments)[0]) => {
    const remainingMonths = 24 - payment.month;
    const message = encodeURIComponent(
      `✅ Comprobante de pago Mibanco
Monto: ${formatCurrency(payment.amount)}
Fecha: ${payment.date}
Cuota: ${payment.month} de 24
Referencia: ${payment.reference}

${remainingMonths > 0 ? `¡Me faltan ${remainingMonths} cuotas! 🏠` : "¡Crédito pagado! 🎉"}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const filteredPayments =
    activeTab === "recent" ? payments.slice(0, 3) : payments;

  return (
    <div className="min-h-screen bg-[var(--mibanco-gray-50)] pb-24">
      <div className="safe-top" />

      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-[var(--mibanco-gray-100)]">
        <h1 className="text-xl font-bold text-[var(--mibanco-gray-900)]">
          Historial de pagos
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--mibanco-green)] text-white"
                  : "bg-[var(--mibanco-gray-100)] text-[var(--mibanco-gray-600)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Payment list */}
      <main className="px-4 py-4">
        <div className="bg-white rounded-2xl overflow-hidden">
          {filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="payment-item"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-medium text-[var(--mibanco-gray-900)]">
                    {payment.date}
                  </p>
                  <span className="px-2 py-0.5 bg-[var(--mibanco-green-50)] text-[var(--mibanco-green)] text-xs rounded-full font-medium">
                    Cuota {payment.month} de 24
                  </span>
                </div>
                <p className="text-sm text-[var(--mibanco-gray-500)] truncate">
                  Ref: {payment.reference}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-[var(--mibanco-gray-900)]">
                    {formatCurrency(payment.amount)}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {payment.status === "confirmed" ? (
                      <>
                        <Check className="w-4 h-4 text-[var(--mibanco-green)]" />
                        <span className="text-xs text-[var(--mibanco-green)]">
                          Confirmado
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-[var(--mibanco-yellow-600)]" />
                        <span className="text-xs text-[var(--mibanco-yellow-600)]">
                          Pendiente
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Share button */}
                {payment.status === "confirmed" && (
                  <button
                    onClick={() => handleSharePayment(payment)}
                    className="p-2 rounded-full bg-[var(--mibanco-green-50)] hover:bg-[var(--mibanco-green-100)] transition-colors"
                    aria-label="Compartir comprobante"
                  >
                    <Share2 className="w-5 h-5 text-[var(--mibanco-green)]" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 bg-[var(--mibanco-green-50)] rounded-xl p-4">
          <p className="text-sm text-[var(--mibanco-green-700)]">
            Has pagado{" "}
            <span className="font-bold">
              {formatCurrency(payments.length * 185000)}
            </span>{" "}
            en total
          </p>
          <p className="text-sm text-[var(--mibanco-green-600)] mt-1">
            {payments.length} cuotas de 24 completadas
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
