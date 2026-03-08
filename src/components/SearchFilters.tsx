import { Search } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { CATEGORIES, CITIES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchFiltersProps {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  minDiscount: string;
  setMinDiscount: (v: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (v: Date | undefined) => void;
}

const SearchFilters = ({
  query, setQuery, category, setCategory, city, setCity, minDiscount, setMinDiscount,
  selectedDate, setSelectedDate,
}: SearchFiltersProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-deal-card">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by business name or keyword..."
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal md:w-44",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City */}
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full md:w-36">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {CITIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Min Discount */}
        <Select value={minDiscount} onValueChange={setMinDiscount}>
          <SelectTrigger className="w-full md:w-36">
            <SelectValue placeholder="Discount %" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Discount</SelectItem>
            <SelectItem value="10">10%+</SelectItem>
            <SelectItem value="20">20%+</SelectItem>
            <SelectItem value="30">30%+</SelectItem>
            <SelectItem value="50">50%+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active date filter indicator */}
      {selectedDate && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing deals active on <span className="font-medium text-foreground">{format(selectedDate, "MMMM d, yyyy")}</span>
          </span>
          <button
            onClick={() => setSelectedDate(undefined)}
            className="rounded-md px-2 py-0.5 text-xs font-medium text-primary hover:bg-accent"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
