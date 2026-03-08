import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/deals?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            🇱🇰 Sri Lanka's #1 Deal Finder
          </span>
          <h1 className="mx-auto mb-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Discover the Best <br />
            <span className="text-secondary">Deals & Discounts</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
            Find daily promotions from top brands across Sri Lanka. Save money on food, travel, fashion, electronics, and more.
          </p>

          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-lg items-center overflow-hidden rounded-xl bg-primary-foreground/10 p-1.5 backdrop-blur-sm"
          >
            <Search className="ml-3 h-5 w-5 text-primary-foreground/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deals, restaurants, brands..."
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-primary-foreground/70">
            <span>Popular:</span>
            {["Restaurants", "Hotels", "Electronics", "Fashion"].map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/deals?category=${cat}`)}
                className="rounded-full border border-primary-foreground/20 px-3 py-1 transition-colors hover:bg-primary-foreground/10"
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
