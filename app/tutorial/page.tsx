"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CreditCard, MessageCircle, Share2, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const tutorialSteps = [
  {
    id: 1,
    icon: Home,
    title: "Así se ve tu crédito",
    description: "En la pantalla principal verás cuánto has pagado y cuánto te falta. La barra verde muestra tu progreso.",
    highlight: "Barra de progreso",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Así pagas tu cuota",
    description: "Con solo 2 toques puedes pagar tu cuota. Es rápido y seguro.",
    highlight: "Botón PAGAR",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "Así hablas con tu asesor",
    description: "El botón verde en la esquina te conecta directamente con tu asesor por WhatsApp. Siempre está ahí para ayudarte.",
    highlight: "Botón Mi Asesor",
  },
  {
    id: 4,
    icon: Share2,
    title: "Así compartes tu comprobante",
    description: "Después de pagar, puedes enviar el comprobante por WhatsApp a quien quieras. ¡Listo para compartir!",
    highlight: "Compartir por WhatsApp",
  },
];

export default function TutorialScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/home");
    }
  };

  const handleSkip = () => {
    router.push("/home");
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="safe-top" />

      {/* Skip button */}
      <header className="px-6 py-4 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-[var(--mibanco-gray-500)] text-sm font-medium hover:text-[var(--mibanco-gray-700)]"
        >
          Saltar
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-[var(--mibanco-green)] flex items-center justify-center mb-8">
              <Icon className="w-12 h-12 text-white" />
            </div>

            {/* Step indicator */}
            <p className="text-[var(--mibanco-gray-400)] text-sm mb-2">
              {currentStep + 1} de {tutorialSteps.length}
            </p>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[var(--mibanco-gray-900)] mb-4">
              {step.title}
            </h1>

            {/* Description */}
            <p className="text-[var(--mibanco-gray-600)] max-w-xs mb-6">
              {step.description}
            </p>

            {/* Highlight badge */}
            <div className="px-4 py-2 bg-[var(--mibanco-yellow-50)] rounded-full">
              <span className="text-[var(--mibanco-gray-700)] text-sm font-medium">
                {step.highlight}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {tutorialSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? "w-8 bg-[var(--mibanco-green)]"
                : "w-2 bg-[var(--mibanco-gray-300)]"
            }`}
          />
        ))}
      </div>

      {/* Next button */}
      <div className="px-6 pb-8 safe-bottom">
        <Button onClick={handleNext} size="full">
          {currentStep < tutorialSteps.length - 1 ? (
            <>
              Siguiente
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            "Empezar a usar la app"
          )}
        </Button>
      </div>
    </div>
  );
}
