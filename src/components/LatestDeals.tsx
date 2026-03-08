import { useDeals } from "@/hooks/use-deals";
import DealCard from "./DealCard";

const LatestDeals = () => {
  const { data: deals, isLoading } = useDeals(false);

  if (isLoading) {
    return (
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">Loading...</div>
      </section>
    );
  }

  const latest = deals?.filter((d) => !d.is_featured).slice(0, 4) || [];
  if (!latest.length) return null;

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-heading text-3xl font-bold text-foreground">
            Latest Promotions
          </h2>
          <p className="text-muted-foreground">
            Fresh deals added today from across Sri Lanka
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestDeals;
