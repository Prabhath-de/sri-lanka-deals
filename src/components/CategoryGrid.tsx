import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/types";

const categoryConfig: Record<string, { emoji: string; gradient: string }> = {
  Food: { emoji: "🍕", gradient: "from-orange-400 to-red-400" },
  Restaurants: { emoji: "🍽️", gradient: "from-rose-400 to-pink-500" },
  Hotels: { emoji: "🏨", gradient: "from-blue-400 to-cyan-400" },
  Fashion: { emoji: "👗", gradient: "from-pink-400 to-fuchsia-500" },
  Electronics: { emoji: "📱", gradient: "from-violet-400 to-purple-500" },
  Travel: { emoji: "✈️", gradient: "from-emerald-400 to-teal-500" },
  Supermarkets: { emoji: "🛒", gradient: "from-amber-400 to-orange-500" },
};

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-heading text-3xl font-bold text-foreground">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Find the best deals in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((cat, i) => {
            const config = categoryConfig[cat];
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/deals?category=${cat}`)}
                className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 backdrop-blur-sm transition-shadow hover:shadow-deal-card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]`} />
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} text-3xl shadow-lg ring-4 ring-background transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110`}
                >
                  {config.emoji}
                </div>
                <span className="relative text-sm font-semibold tracking-wide text-foreground">{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
