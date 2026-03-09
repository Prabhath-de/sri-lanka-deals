import { MapPin, Calendar, ExternalLink, Heart, Share2, Facebook, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
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
          <div className="flex gap-2">
            <a href={deal.original_url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full gap-2 bg-hero-gradient text-primary-foreground hover:opacity-90">
                <ExternalLink className="h-4 w-4" /> View Deal
              </Button>
            </a>
            {/* Share dropdown */}
            <div className="relative group/share">
              <Button size="sm" variant="outline" className="px-2.5">
                <Share2 className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-full right-0 mb-2 hidden min-w-[140px] rounded-lg border border-border bg-card p-1.5 shadow-lg group-hover/share:block">
                <button
                  onClick={() => {
                    window.open(`https://wa.me/?text=${encodeURIComponent(deal.title + " - " + deal.discount_percentage + "% OFF! " + deal.original_url)}`, "_blank");
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-foreground hover:bg-muted"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(deal.original_url!)}`, "_blank");
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-foreground hover:bg-muted"
                >
                  <Facebook className="h-3.5 w-3.5" /> Facebook
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(deal.original_url!);
                    toast.success("Link copied!");
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-foreground hover:bg-muted"
                >
                  <LinkIcon className="h-3.5 w-3.5" /> Copy Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DealCard;
