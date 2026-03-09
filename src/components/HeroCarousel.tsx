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

  // Auto-advance every 5s
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
    <section className="relative overflow-hidden bg-foreground dark:bg-card">
      <div className="container relative mx-auto px-4 py-0">
        <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-none md:min-h-[480px]">
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
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent dark:from-background/90 dark:via-background/70" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 max-w-xl px-6 py-12 md:px-12 md:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-deal-badge px-3 py-1 text-xs font-bold text-deal-badge-foreground shadow-lg">
                  -{deal.discount_percentage}% OFF
                </span>
                <h2 className="mb-2 font-heading text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
                  {deal.title}
                </h2>
                <p className="mb-1 text-lg font-medium text-primary/80 dark:text-primary">
                  {deal.business_name}
                </p>
                <p className="mb-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
                  {deal.description}
                </p>
                {deal.original_url && (
                  <a href={deal.original_url} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 bg-secondary text-secondary-foreground shadow-lg hover:opacity-90">
                      <ExternalLink className="h-4 w-4" /> View Deal
                    </Button>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:left-5 md:h-12 md:w-12"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:right-5 md:h-12 md:w-12"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dots */}
          {items.length > 1 && (
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-secondary" : "w-2 bg-white/40 hover:bg-white/60"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
