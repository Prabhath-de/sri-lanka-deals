import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Tag, LogIn, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupaUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/deals", label: "All Deals" },
    { to: "/categories", label: "Categories" },
    { to: "/submit", label: "Submit Deal" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Tag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            DealFinder <span className="text-primary">LK</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/deals">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Search Deals
            </Button>
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="gap-2 bg-hero-gradient text-primary-foreground">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-foreground md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/deals" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="sm" className="mt-2 w-full gap-2">
              <Search className="h-4 w-4" />
              Search Deals
            </Button>
          </Link>
          {user ? (
            <Button variant="ghost" size="sm" className="mt-2 w-full gap-2" onClick={() => { handleSignOut(); setIsOpen(false); }}>
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          ) : (
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="mt-2 w-full gap-2 bg-hero-gradient text-primary-foreground">
                <LogIn className="h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
