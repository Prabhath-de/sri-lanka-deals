import { useFeaturedDeals } from "@/hooks/use-deals";
import DealCard from "./DealCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedDeals = () => {
  const { data: featured, isLoading } = useFeaturedDeals();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">Loading deals...</div>
      </section>
    );
  }

  if (!featured?.length) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              🔥 Hot Right Now
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Today's Best Deals
            </h2>
          </div>
          <Link to="/deals">
            <Button variant="ghost" className="gap-1 text-primary">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
