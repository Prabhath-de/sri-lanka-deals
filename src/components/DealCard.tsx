import { MapPin, Calendar, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  Food: "bg-orange-100 text-orange-700",
  Restaurants: "bg-rose-100 text-rose-700",
  Hotels: "bg-blue-100 text-blue-700",
  Fashion: "bg-pink-100 text-pink-700",
  Electronics: "bg-violet-100 text-violet-700",
  Travel: "bg-emerald-100 text-emerald-700",
  Supermarkets: "bg-amber-100 text-amber-700",
};

const getCategoryEmoji = (cat: string) => {
  const map: Record<string, string> = {
    Food: "🍕", Restaurants: "🍽️", Hotels: "🏨", Fashion: "👗",
    Electronics: "📱", Travel: "✈️", Supermarkets: "🛒",
  };
  return map[cat] || "🏷️";
};

interface DealCardProps {
  deal: {
    id: string;
    title: string;
    business_name: string;
    description: string | null;
    discount_percentage: number;
    category: string;
    city: string;
    location: string | null;
    image_url: string | null;
    original_url: string | null;
    expiry_date: string;
    is_featured: boolean;
  };
  index?: number;
}

const DealCard = ({ deal, index = 0 }: DealCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(deal.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-deal-card transition-all duration-300 hover:shadow-deal-card-hover"
    >
      <div className="relative h-44 overflow-hidden bg-muted">
        {deal.image_url ? (
          <img src={deal.image_url} alt={deal.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            {getCategoryEmoji(deal.category)}
          </div>
        )}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-deal-badge px-3 py-1 text-sm font-bold text-deal-badge-foreground shadow-lg">
            -{deal.discount_percentage}%
          </span>
        </div>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart className={`h-4 w-4 transition-colors ${isSaved ? "fill-deal-badge text-deal-badge" : "text-muted-foreground"}`} />
        </button>
        {daysLeft <= 3 && daysLeft > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center rounded-full bg-gold-gradient px-2.5 py-1 text-xs font-semibold text-gold-foreground">
              {daysLeft}d left
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className={`text-xs ${categoryColors[deal.category] || ""}`}>
            {deal.category}
          </Badge>
          {deal.is_featured && (
            <Badge variant="secondary" className="bg-gold/10 text-xs text-gold">⭐ Featured</Badge>
          )}
        </div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-foreground line-clamp-1">{deal.title}</h3>
        <p className="mb-1 text-sm font-medium text-primary">{deal.business_name}</p>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
        <div className="mb-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {deal.city}{deal.location ? ` · ${deal.location}` : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Expires {new Date(deal.expiry_date).toLocaleDateString("en-LK", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        {deal.original_url && (
          <a href={deal.original_url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full gap-2 bg-hero-gradient text-primary-foreground hover:opacity-90">
              <ExternalLink className="h-4 w-4" /> View Deal
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default DealCard;
