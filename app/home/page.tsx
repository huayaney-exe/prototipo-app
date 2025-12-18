"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home as HomeIcon,
  AlertCircle,
  ChevronRight,
  PiggyBank,
  Zap,
  Send,
  Receipt,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Gift,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import BottomNav from "@/components/layout/BottomNav";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

// Mock data - en producción vendría de API
const userData = {
  userName: "María",
  // Cuenta de ahorros
  accountBalance: 1850000,
  // Movimientos del mes
  monthlyIncome: 3200000,
  monthlyExpenses: 1350000,
  // Crédito activo (null si no tiene)
  hasActiveCredit: true,
  credit: {
    type: "Casa",
    totalDebt: 2450000,
    nextPayment: 185000,
    dueDate: "15 Ene 2025",
    daysUntilDue: 3,
    currentMonth: 12,
    totalMonths: 24,
    creditNumber: "12345",
  },
  // Campaña activa (null si no hay)
  campaign: null as { title: string; description: string; cta: string } | null,
  // campaign: {
  //   title: "¡Tenemos algo para ti!",
  //   description: "Pre-aprobado: Crédito de $5.000.000",
  //   cta: "Ver oferta",
  // },
};

const recentMovements = [
  { description: "Transferencia recibida", date: "Hoy", amount: 500000, type: "income" },
  { description: "Pago Claro", date: "Ayer", amount: -85000, type: "expense" },
  { description: "Pago cuota crédito", date: "15 Dic", amount: -185000, type: "expense" },
];

// Quick actions estilo Nubank
const quickActions = [
  {
    id: "depositar",
    icon: PiggyBank,
    label: "Depositar",
    href: "/depositar",
  },
  {
    id: "breb",
    icon: Zap,
    label: "Bre-B",
    href: "/breb",
    highlight: true,
  },
  {
    id: "enviar",
    icon: Send,
    label: "Enviar",
    href: "/enviar",
  },
  {
    id: "servicios",
    icon: Receipt,
    label: "Pagar servicios",
    href: "/servicios",
  },
];

// Función para obtener saludo según hora
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

export default function HomeScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    router.push(action.href);
  };

  return (
    <div className="min-h-screen bg-[var(--mibanco-gray-50)] pb-24">
      <div className="safe-top" />

      {/* Header con saldo principal */}
      <header className="bg-[var(--mibanco-green)] px-6 pt-4 pb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm">{getGreeting()},</p>
            <h1 className="text-xl font-bold">Hola, {userData.userName}</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-semibold">
              {userData.userName.charAt(0)}
            </span>
          </div>
        </div>

        {/* Saldo disponible */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white/80 text-sm">Saldo disponible</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:text-white"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-3xl font-bold">
            {showBalance ? formatCurrency(userData.accountBalance) : "$ ••••••"}
          </p>
        </div>

        {/* Ingresos y Egresos del mes */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-1">
            <TrendingUp className="w-4 h-4 text-[var(--mibanco-yellow)]" />
            <div>
              <p className="text-white/70 text-xs">Entradas</p>
              <p className="text-sm font-semibold">
                {showBalance ? formatCurrency(userData.monthlyIncome) : "••••"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-1">
            <TrendingDown className="w-4 h-4 text-red-300" />
            <div>
              <p className="text-white/70 text-xs">Salidas</p>
              <p className="text-sm font-semibold">
                {showBalance ? formatCurrency(userData.monthlyExpenses) : "••••"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-4 space-y-4 -mt-2">
        {/* Quick Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex justify-between items-start">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleQuickAction(action)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                      action.highlight
                        ? "bg-[var(--mibanco-green)] text-white"
                        : "bg-[var(--mibanco-gray-100)] text-[var(--mibanco-gray-600)] group-hover:bg-[var(--mibanco-gray-200)]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs text-center leading-tight ${
                      action.highlight
                        ? "text-[var(--mibanco-green)] font-semibold"
                        : "text-[var(--mibanco-gray-600)]"
                    }`}
                  >
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Campaña personalizada (si existe) */}
        {userData.campaign && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => router.push("/ofertas")}
            className="w-full bg-gradient-to-r from-[var(--mibanco-yellow)] to-[var(--mibanco-yellow-400)] rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
              <Gift className="w-6 h-6 text-[var(--mibanco-gray-900)]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--mibanco-gray-900)]">
                {userData.campaign.title}
              </p>
              <p className="text-sm text-[var(--mibanco-gray-700)]">
                {userData.campaign.description}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--mibanco-gray-700)]" />
          </motion.button>
        )}

        {/* Crédito activo o CTA para solicitar */}
        {userData.hasActiveCredit && userData.credit ? (
          <>
            {/* Próxima cuota card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card-credit"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-white/80 text-sm">Mi Crédito</p>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full">
                      <HomeIcon className="w-3 h-3 text-white" />
                      <span className="text-xs text-white font-medium">
                        {userData.credit.type}
                      </span>
                    </div>
                  </div>
                  {userData.credit.daysUntilDue <= 5 && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-[var(--mibanco-yellow)] text-[var(--mibanco-gray-900)] rounded-full text-xs font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      {userData.credit.daysUntilDue} días
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Próxima cuota</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(userData.credit.nextPayment)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs mb-1">Vence</p>
                    <p className="text-white font-medium">{userData.credit.dueDate}</p>
                  </div>
                </div>

                {/* Progress */}
                <ProgressBar
                  current={userData.credit.currentMonth}
                  total={userData.credit.totalMonths}
                />

                {/* CTA Pagar */}
                <button
                  onClick={() => router.push("/credito")}
                  className="w-full mt-4 py-3 bg-white text-[var(--mibanco-green)] font-semibold rounded-xl hover:bg-white/90 transition-colors"
                >
                  Pagar cuota
                </button>
              </div>
            </motion.div>

            {/* Saldo pendiente del crédito */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => router.push("/cuenta")}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 text-left shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--mibanco-green-50)] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[var(--mibanco-green)]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[var(--mibanco-gray-900)]">
                  Saldo pendiente
                </p>
                <p className="text-sm text-[var(--mibanco-gray-500)]">
                  {formatCurrency(userData.credit.totalDebt)}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--mibanco-gray-400)]" />
            </motion.button>
          </>
        ) : (
          /* Sin crédito - CTA para solicitar */
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => router.push("/solicitar-credito")}
            className="w-full bg-white rounded-2xl p-6 text-center shadow-sm border-2 border-dashed border-[var(--mibanco-gray-200)]"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--mibanco-green-50)] flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-[var(--mibanco-green)]" />
            </div>
            <h3 className="font-bold text-[var(--mibanco-gray-900)] mb-2">
              ¿Necesitas un crédito?
            </h3>
            <p className="text-sm text-[var(--mibanco-gray-500)] mb-4">
              Solicita tu crédito y te evaluamos en minutos
            </p>
            <span className="inline-flex items-center gap-1 text-[var(--mibanco-green)] font-semibold">
              Solicitar crédito
              <ChevronRight className="w-4 h-4" />
            </span>
          </motion.button>
        )}

        {/* Últimos movimientos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[var(--mibanco-gray-900)]">
              Últimos movimientos
            </h2>
            <button
              onClick={() => router.push("/historial")}
              className="text-[var(--mibanco-green)] text-sm font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentMovements.map((movement, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-[var(--mibanco-gray-100)] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    movement.type === "income"
                      ? "bg-green-100"
                      : "bg-red-50"
                  }`}>
                    {movement.type === "income" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--mibanco-gray-900)]">
                      {movement.description}
                    </p>
                    <p className="text-sm text-[var(--mibanco-gray-500)]">
                      {movement.date}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  movement.type === "income"
                    ? "text-green-600"
                    : "text-[var(--mibanco-gray-900)]"
                }`}>
                  {movement.type === "income" ? "+" : ""}{formatCurrency(movement.amount)}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
