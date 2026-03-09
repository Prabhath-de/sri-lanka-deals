import { Tag, ArrowUpRight, Shield, Heart, Facebook, Instagram, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative overflow-hidden bg-foreground dark:bg-card">
    {/* Decorative gradient orbs */}
    <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
    <div className="pointer-events-none absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-secondary/10 blur-[80px]" />

    <div className="container relative mx-auto px-4 pb-6 pt-16">
      {/* Main grid */}
      <div className="grid gap-10 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link to="/" className="mb-5 inline-flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-hero-gradient shadow-lg shadow-primary/30">
              <Tag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-primary-foreground dark:text-foreground">
              DealFinder <span className="text-primary dark:text-primary">LK</span>
            </span>
          </Link>
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-primary-foreground/60 dark:text-muted-foreground">
            Sri Lanka's leading platform for discovering daily deals, exclusive discounts, and the best promotions across the island.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, label: "Facebook", href: "#" },
              { icon: Instagram, label: "Instagram", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/60 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:border-border dark:bg-card/50 dark:text-muted-foreground dark:hover:border-primary/40 dark:hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            {/* WhatsApp */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/60 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:border-border dark:bg-card/50 dark:text-muted-foreground dark:hover:border-primary/40 dark:hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/60 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:border-border dark:bg-card/50 dark:text-muted-foreground dark:hover:border-primary/40 dark:hover:text-primary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.78V6.69h3.77z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="mb-5 font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground/40 dark:text-muted-foreground">
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
                className="group flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
              >
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div className="md:col-span-2">
          <h4 className="mb-5 font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground/40 dark:text-muted-foreground">
            Categories
          </h4>
          <nav className="flex flex-col gap-3">
            {["Food", "Restaurants", "Hotels", "Fashion", "Electronics", "Travel", "Supermarkets"].map((c) => (
              <Link
                key={c}
                to={`/deals?category=${c}`}
                className="text-sm text-primary-foreground/60 transition-colors hover:text-primary dark:text-muted-foreground dark:hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>

        {/* Get the App */}
        <div className="md:col-span-3">
          <h4 className="mb-5 font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground/40 dark:text-muted-foreground">
            Get the App
          </h4>
          <p className="mb-4 text-sm text-primary-foreground/50 dark:text-muted-foreground">
            Never miss a deal! Download our app.
          </p>
          <div className="flex flex-col gap-3">
            {/* Google Play */}
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5 transition-all hover:border-primary/30 hover:bg-primary/10 dark:border-border dark:bg-card/50 dark:hover:border-primary/30"
            >
              <svg className="h-6 w-6 text-primary-foreground/80 dark:text-foreground/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 8.991l-2.302 2.302L5.864 2.658z"/>
              </svg>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50 dark:text-muted-foreground">Get it on</p>
                <p className="text-sm font-semibold text-primary-foreground/90 dark:text-foreground">Google Play</p>
              </div>
            </a>
            {/* App Store */}
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2.5 transition-all hover:border-primary/30 hover:bg-primary/10 dark:border-border dark:bg-card/50 dark:hover:border-primary/30"
            >
              <Smartphone className="h-6 w-6 text-primary-foreground/80 dark:text-foreground/80" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50 dark:text-muted-foreground">Download on the</p>
                <p className="text-sm font-semibold text-primary-foreground/90 dark:text-foreground">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent dark:via-border" />

      {/* Disclaimer */}
      <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-5 py-4 dark:border-border/40 dark:bg-card/30">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <Shield className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-[11px] leading-relaxed text-primary-foreground/50 dark:text-muted-foreground">
            <span className="font-semibold text-primary-foreground/70 dark:text-foreground/60">Disclaimer</span> — All product names, trademarks, and registered trademarks are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-primary-foreground/40 dark:text-muted-foreground">
          © {new Date().getFullYear()} DealFinder LK. All rights reserved.
        </p>
        <p className="flex items-center gap-1 text-xs text-primary-foreground/40 dark:text-muted-foreground">
          Made with <Heart className="h-3 w-3 fill-deal-badge text-deal-badge" /> in Sri Lanka
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
