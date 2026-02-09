"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/mock-data";

const heroItems = products.slice(0, 6);

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => heroItems, []);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % items.length),
      4500
    );
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[index]?.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={items[index].imageUrl}
            alt="Kiddoverse hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
