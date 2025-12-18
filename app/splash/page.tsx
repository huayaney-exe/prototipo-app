"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8">
      {/* Logo Mibanco */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Logo real de Mibanco */}
        <Image
          src="/images/logomibanco.svg"
          alt="Mibanco"
          width={280}
          height={80}
          priority
          className="mb-8"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[var(--mibanco-gray-600)] text-lg text-center"
        >
          Simple. Seguro. Suyo.
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-32"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[var(--mibanco-green)] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Superfinanciera badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-12 text-center px-6"
      >
        <p className="text-[var(--mibanco-gray-400)] text-xs">
          Vigilado por la Superintendencia Financiera de Colombia
        </p>
      </motion.div>
    </div>
  );
}
