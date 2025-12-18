"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  CreditCard,
  Calendar,
  Lock,
  Fingerprint,
  MessageCircle,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

const menuSections = [
  {
    title: "Mi perfil",
    items: [
      { icon: User, label: "Datos personales", href: "#" },
      { icon: Bell, label: "Notificaciones", href: "#" },
    ],
  },
  {
    title: "Mi crédito",
    items: [
      { icon: CreditCard, label: "Detalles del crédito", href: "#" },
      { icon: Calendar, label: "Calendario de pagos", href: "#" },
    ],
  },
  {
    title: "Seguridad",
    items: [
      { icon: Lock, label: "Cambiar PIN", href: "#" },
      { icon: Fingerprint, label: "Configurar huella", href: "#" },
    ],
  },
  {
    title: "Ayuda",
    items: [
      {
        icon: MessageCircle,
        label: "Mi Asesor",
        href: "#",
        highlight: true,
        action: "whatsapp",
      },
      { icon: HelpCircle, label: "Preguntas frecuentes", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { icon: FileText, label: "Términos y condiciones", href: "#" },
      { icon: Shield, label: "Política de privacidad", href: "#" },
    ],
  },
];

export default function CuentaScreen() {
  const router = useRouter();

  const handleItemClick = (item: (typeof menuSections)[0]["items"][0]) => {
    if (item.action === "whatsapp") {
      const phoneNumber = "573143576553";
      const message = encodeURIComponent(
        "Hola, necesito ayuda con mi crédito Mibanco."
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    } else {
      // En producción, navegaría a la ruta correspondiente
      alert(`Navegando a: ${item.label}`);
    }
  };

  const handleLogout = () => {
    if (confirm("¿Estás seguro que quieres cerrar sesión?")) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--mibanco-gray-50)] pb-24">
      <div className="safe-top" />

      {/* Header with profile */}
      <header className="bg-[var(--mibanco-green)] px-6 py-8 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl font-bold text-[var(--mibanco-green)]">
              M
            </span>
          </div>
          <div className="text-white">
            <h1 className="text-xl font-bold">María García</h1>
            <p className="text-white/80 text-sm">C.C. 1.234.567.890</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm"
        >
          {menuSections.map((section, sectionIndex) => (
            <div
              key={section.title}
              className={
                sectionIndex > 0
                  ? "border-t border-[var(--mibanco-gray-100)]"
                  : ""
              }
            >
              {/* Section title */}
              <p className="px-4 pt-4 pb-2 text-xs font-semibold text-[var(--mibanco-gray-400)] uppercase tracking-wide">
                {section.title}
              </p>

              {/* Items */}
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: (sectionIndex * 2 + itemIndex) * 0.03,
                    }}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-[var(--mibanco-gray-50)] transition-colors ${
                      item.highlight ? "bg-[var(--mibanco-green-50)]" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.highlight
                          ? "bg-[var(--mibanco-green)]"
                          : "bg-[var(--mibanco-gray-100)]"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          item.highlight
                            ? "text-white"
                            : "text-[var(--mibanco-gray-600)]"
                        }`}
                      />
                    </div>
                    <span
                      className={`flex-1 text-left ${
                        item.highlight
                          ? "font-semibold text-[var(--mibanco-green)]"
                          : "text-[var(--mibanco-gray-900)]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[var(--mibanco-gray-400)]" />
                  </motion.button>
                );
              })}
            </div>
          ))}

          {/* Logout */}
          <div className="border-t border-[var(--mibanco-gray-100)] p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </motion.div>

        {/* App version */}
        <p className="text-center text-[var(--mibanco-gray-400)] text-xs mt-6">
          Mibanco App v1.0.0
        </p>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
