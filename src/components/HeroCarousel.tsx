import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useFeaturedDeals } from "@/hooks/use-deals";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
  const { data: deals } = useFeaturedDeals();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const items = deals?.slice(0, 5) ?? [];

  const go = useCallback(
    (dir: 1 | -1) => {
      if (!items.length) return;
      setDirection(dir);
      setCurrent((p) => (p + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go, items.length]);

  if (!items.length) return null;

  const deal = items[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[480px] w-full md:h-[520px]">
        {/* Background image */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={deal.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {deal.image_url ? (
              <img
                src={deal.image_url}
                alt={deal.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-hero-gradient" />
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content — bottom-left aligned */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg pb-16 md:pb-20"
              >
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-deal-badge px-3.5 py-1.5 text-sm font-bold text-deal-badge-foreground shadow-lg">
                  -{deal.discount_percentage}% OFF
                </span>
                <h2 className="mb-2 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {deal.title}
                </h2>
                <p className="mb-1 text-base font-semibold text-secondary">
                  {deal.business_name}
                </p>
                <p className="mb-5 max-w-md text-sm leading-relaxed text-white/70">
                  {deal.description}
                </p>
                {deal.original_url && (
                  <a href={deal.original_url} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 bg-secondary text-secondary-foreground shadow-lg hover:opacity-90">
                      <ExternalLink className="h-4 w-4" /> View Deal
                    </Button>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Nav arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 md:left-6 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 md:right-6 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {items.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-secondary" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCarousel;
