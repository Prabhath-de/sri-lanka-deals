import { Tag, ArrowUpRight, Mail, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-border bg-foreground/[0.03] dark:bg-card">
    {/* Subtle background glow */}
    <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

    <div className="container relative mx-auto px-4 pb-8 pt-16">
      {/* Top section */}
      <div className="grid gap-12 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link to="/" className="mb-4 inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hero-gradient shadow-lg shadow-primary/20">
              <Tag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              DealFinder <span className="text-primary">LK</span>
            </span>
          </Link>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Sri Lanka's leading platform for discovering daily deals, exclusive discounts, and the best promotions across the island.
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              Submit a Deal <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-widest text-foreground">
            Quick Links
          </h4>
          <nav className="flex flex-col gap-3">
            {[
              { to: "/", label: "Home" },
              { to: "/deals", label: "All Deals" },
              { to: "/categories", label: "Categories" },
              { to: "/submit", label: "Submit Deal" },
              { to: "/auth", label: "Sign In" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="h-px w-3 bg-border transition-all group-hover:w-5 group-hover:bg-primary" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div className="md:col-span-4">
          <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-widest text-foreground">
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Food", "Restaurants", "Hotels", "Fashion", "Electronics", "Travel", "Supermarkets"].map((c) => (
              <Link
                key={c}
                to={`/deals?category=${c}`}
                className="rounded-lg border border-border/60 bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Disclaimer */}
      <div className="mx-auto mb-8 max-w-3xl rounded-xl border border-border/40 bg-card/30 px-5 py-4 backdrop-blur-lg">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/60">Disclaimer</span> — All product names, trademarks, and registered trademarks are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} DealFinder LK. All rights reserved.
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Made with <Heart className="h-3 w-3 fill-deal-badge text-deal-badge" /> in Sri Lanka
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
