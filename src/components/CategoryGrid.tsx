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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((cat, i) => {
            const config = categoryConfig[cat];
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                onClick={() => navigate(`/deals?category=${cat}`)}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-deal-card-hover"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} text-2xl shadow-md transition-transform group-hover:scale-110`}
                >
                  {config.emoji}
                </div>
                <span className="text-sm font-medium text-foreground">{cat}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
