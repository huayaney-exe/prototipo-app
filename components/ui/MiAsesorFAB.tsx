"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface MiAsesorFABProps {
  onClick?: () => void;
}

export default function MiAsesorFAB({ onClick }: MiAsesorFABProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default: Open WhatsApp with Mibanco advisor
      const phoneNumber = "573143576553"; // Número de ejemplo
      const message = encodeURIComponent(
        "Hola, necesito ayuda con mi crédito Mibanco."
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fab-mi-asesor"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      aria-label="Hablar con Mi Asesor por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  );
}
