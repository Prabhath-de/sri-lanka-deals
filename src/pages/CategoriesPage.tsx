import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/types";
import { useDeals } from "@/hooks/use-deals";
import { motion } from "framer-motion";

const categoryConfig: Record<string, { emoji: string; gradient: string }> = {
  Food: { emoji: "🍕", gradient: "from-orange-400 to-red-400" },
  Restaurants: { emoji: "🍽️", gradient: "from-rose-400 to-pink-500" },
  Hotels: { emoji: "🏨", gradient: "from-blue-400 to-cyan-400" },
  Fashion: { emoji: "👗", gradient: "from-pink-400 to-fuchsia-500" },
  Electronics: { emoji: "📱", gradient: "from-violet-400 to-purple-500" },
  Travel: { emoji: "✈️", gradient: "from-emerald-400 to-teal-500" },
  Supermarkets: { emoji: "🛒", gradient: "from-amber-400 to-orange-500" },
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data: deals } = useDeals(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 font-heading text-3xl font-bold text-foreground">Deal Categories</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const config = categoryConfig[cat];
            const count = deals?.filter((d) => d.category === cat).length || 0;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => navigate(`/deals?category=${cat}`)}
                className="group flex items-center gap-5 rounded-xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:shadow-deal-card-hover"
              >
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} text-3xl shadow-md transition-transform group-hover:scale-110`}>
                  {config.emoji}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{cat}</h3>
                  <p className="text-sm text-muted-foreground">{count} active deal{count !== 1 ? "s" : ""}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
