"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import MiAsesorFAB from "@/components/ui/MiAsesorFAB";

export default function VerificacionScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (index === 5 && value) {
      const fullCode = newCode.join("");
      if (fullCode.length === 6) {
        handleSubmit(fullCode);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (fullCode?: string) => {
    const codeToSubmit = fullCode || code.join("");
    if (codeToSubmit.length === 6) {
      // Simular verificación exitosa
      router.push("/huella");
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
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
        {/* Title - Lenguaje simple (NO "OTP") */}
        <h1 className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-2">
          Te enviamos un código
        </h1>
        <p className="text-[var(--mibanco-gray-500)] mb-8">
          Ingresa el código de 6 dígitos que enviamos a tu celular{" "}
          <span className="font-medium">***-***-4567</span>
        </p>

        {/* OTP Input Cells */}
        <div className="flex justify-center gap-3 mb-8">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div className="text-center mb-8">
          {!canResend ? (
            <p className="text-[var(--mibanco-gray-500)]">
              Reenviar código en{" "}
              <span className="font-semibold text-[var(--mibanco-gray-700)]">
                0:{timeLeft.toString().padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[var(--mibanco-green)] font-semibold hover:underline"
            >
              Reenviar código
            </button>
          )}
        </div>

        {/* Verify button */}
        <Button
          onClick={() => handleSubmit()}
          size="full"
          disabled={code.join("").length !== 6}
        >
          Verificar
        </Button>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-[var(--mibanco-gray-500)] text-sm">
            ¿No recibiste el código?{" "}
            <button className="text-[var(--mibanco-green)] font-semibold hover:underline">
              Habla con tu asesor
            </button>
          </p>
        </div>
      </motion.main>

      {/* Mi Asesor FAB */}
      <MiAsesorFAB />
    </div>
  );
}
