import { Tag } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
              <Tag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              DealFinder <span className="text-primary">LK</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Sri Lanka's leading platform for daily deals, discounts, and promotions.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/deals" className="hover:text-primary">All Deals</Link>
            <Link to="/categories" className="hover:text-primary">Categories</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold text-foreground">Categories</h4>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["Food", "Restaurants", "Hotels", "Fashion", "Electronics"].map((c) => (
              <Link key={c} to={`/deals?category=${c}`} className="hover:text-primary">{c}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-8">
        <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-white/20 bg-white/5 px-6 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-sm">🔒</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground/70">Disclaimer</span> — All product names, trademarks, and registered trademarks are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DealFinder LK. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
