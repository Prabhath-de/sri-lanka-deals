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
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DealFinder LK. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
