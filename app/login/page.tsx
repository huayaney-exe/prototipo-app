"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

export default function LoginScreen() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cedula.length < 6) {
      setError("Ingresa un número de cédula válido");
      return;
    }

    // Simular validación y avanzar
    router.push("/verificacion");
  };

  const formatCedula = (value: string) => {
    // Solo números
    const numbers = value.replace(/\D/g, "");
    // Formato con puntos: 1.234.567.890
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCedula(e.target.value);
    setCedula(formatted);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="safe-top" />
      <header className="px-6 py-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-[var(--mibanco-gray-700)]" />
        </button>
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-6 pt-8"
      >
        {/* Title - Lenguaje simple */}
        <h1 className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-2">
          Ingresa a tu cuenta
        </h1>
        <p className="text-[var(--mibanco-gray-500)] mb-8">
          Escribe tu número de cédula para continuar
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cédula input */}
          <div>
            <label
              htmlFor="cedula"
              className="block text-sm font-medium text-[var(--mibanco-gray-700)] mb-2"
            >
              Cédula de ciudadanía
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {/* Colombian flag indicator */}
                <span className="text-lg">🇨🇴</span>
              </div>
              <input
                id="cedula"
                type="text"
                inputMode="numeric"
                value={cedula}
                onChange={handleChange}
                placeholder="1.234.567.890"
                className={`w-full pl-14 pr-4 py-4 text-lg border-2 rounded-xl transition-colors
                  ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--mibanco-gray-300)] focus:border-[var(--mibanco-green)]"
                  }`}
                autoComplete="off"
                maxLength={14}
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" size="full" disabled={cedula.length < 6}>
            Continuar
          </Button>
        </form>

        {/* First time user */}
        <div className="mt-8 text-center">
          <p className="text-[var(--mibanco-gray-500)] text-sm">
            ¿Primera vez?{" "}
            <button className="text-[var(--mibanco-green)] font-semibold hover:underline">
              Tu asesor te ayuda
            </button>
          </p>
        </div>
      </motion.main>

      {/* Help link at bottom */}
      <div className="px-6 pb-8 safe-bottom">
        <button className="w-full flex items-center justify-center gap-2 py-3 text-[var(--mibanco-green)]">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">¿Necesitas ayuda?</span>
        </button>
      </div>

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
