import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import SearchFilters from "@/components/SearchFilters";
import { MOCK_DEALS } from "@/lib/mock-data";

const DealsPage = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [city, setCity] = useState("all");
  const [minDiscount, setMinDiscount] = useState("0");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredDeals = useMemo(() => {
    return MOCK_DEALS.filter((deal) => {
      if (deal.is_archived) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !deal.title.toLowerCase().includes(q) &&
          !deal.business_name.toLowerCase().includes(q) &&
          !deal.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (category !== "all" && deal.category !== category) return false;
      if (city !== "all" && deal.city !== city) return false;
      if (deal.discount_percentage < Number(minDiscount)) return false;

      // Date filter: show deals that are active on the selected date
      if (selectedDate) {
        const created = new Date(deal.created_at);
        const expiry = new Date(deal.expiry_date);
        const selected = new Date(selectedDate);
        // Reset times to compare dates only
        created.setHours(0, 0, 0, 0);
        expiry.setHours(23, 59, 59, 999);
        selected.setHours(12, 0, 0, 0);
        if (selected < created || selected > expiry) return false;
      }

      return true;
    });
  }, [query, category, city, minDiscount, selectedDate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">
          All Deals & Promotions
        </h1>

        <div className="mb-8">
          <SearchFilters
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            city={city}
            setCity={setCity}
            minDiscount={minDiscount}
            setMinDiscount={setMinDiscount}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {filteredDeals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDeals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-4 text-5xl">🔍</span>
            <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
              No deals found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DealsPage;
