"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HuellaScreen() {
  const router = useRouter();

  const handleActivar = () => {
    // Simular activación biométrica
    router.push("/tutorial");
  };

  const handleSkip = () => {
    router.push("/tutorial");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-6 pt-16 flex flex-col items-center"
      >
        {/* Fingerprint Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-32 h-32 rounded-full bg-[var(--mibanco-green-50)] flex items-center justify-center mb-8"
        >
          <Fingerprint className="w-16 h-16 text-[var(--mibanco-green)]" />
        </motion.div>

        {/* Title - Lenguaje simple (NO "Biométrico") */}
        <h1 className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-3 text-center">
          Activa tu huella digital
        </h1>
        <p className="text-[var(--mibanco-gray-500)] text-center max-w-xs mb-12">
          Ingresa más rápido la próxima vez usando tu huella o tu rostro
        </p>

        {/* Benefits */}
        <div className="w-full space-y-4 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--mibanco-green-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[var(--mibanco-green)] text-sm">✓</span>
            </div>
            <p className="text-[var(--mibanco-gray-700)]">
              Ingresa en segundos, sin escribir contraseñas
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--mibanco-green-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[var(--mibanco-green)] text-sm">✓</span>
            </div>
            <p className="text-[var(--mibanco-gray-700)]">
              Solo tú puedes acceder a tu cuenta
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--mibanco-green-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[var(--mibanco-green)] text-sm">✓</span>
            </div>
            <p className="text-[var(--mibanco-gray-700)]">
              Tus datos están protegidos en tu celular
            </p>
          </div>
        </div>
      </motion.main>

      {/* Buttons at bottom */}
      <div className="px-6 pb-8 safe-bottom space-y-3">
        <Button onClick={handleActivar} size="full">
          Activar
        </Button>
        <Button onClick={handleSkip} variant="ghost" size="full">
          Ahora no
        </Button>
      </div>
    </div>
  );
}
