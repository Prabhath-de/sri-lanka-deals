import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, CITIES } from "@/lib/types";
import { uploadDealImage, DbDealInsert, DbDeal } from "@/lib/deals-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const dealSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  business_name: z.string().min(1, "Business name is required").max(200),
  description: z.string().max(1000).optional(),
  discount_percentage: z.coerce.number().min(0).max(100),
  category: z.string().min(1, "Category is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().max(300).optional(),
  original_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  expiry_date: z.date({ required_error: "Expiry date is required" }),
  is_featured: z.boolean().default(false),
});

type DealFormValues = z.infer<typeof dealSchema>;

interface DealFormProps {
  deal?: DbDeal;
  onSubmit: (data: DbDealInsert) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const DealForm = ({ deal, onSubmit, onCancel, isSubmitting }: DealFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(deal?.image_url || null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: deal?.title || "",
      business_name: deal?.business_name || "",
      description: deal?.description || "",
      discount_percentage: deal?.discount_percentage || 0,
      category: deal?.category || "",
      city: deal?.city || "",
      location: deal?.location || "",
      original_url: deal?.original_url || "",
      expiry_date: deal?.expiry_date ? new Date(deal.expiry_date) : undefined,
      is_featured: deal?.is_featured || false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: DealFormValues) => {
    try {
      let image_url = deal?.image_url || null;

      if (imageFile) {
        setUploading(true);
        image_url = await uploadDealImage(imageFile);
        setUploading(false);
      }

      await onSubmit({
        title: values.title,
        business_name: values.business_name,
        category: values.category,
        city: values.city,
        discount_percentage: values.discount_percentage,
        description: values.description || null,
        location: values.location || null,
        original_url: values.original_url || null,
        image_url,
        expiry_date: format(values.expiry_date, "yyyy-MM-dd"),
        is_featured: values.is_featured,
      });
    } catch (err) {
      setUploading(false);
      throw err;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deal Title</FormLabel>
                <FormControl><Input placeholder="50% Off Lunch Buffet" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl><Input placeholder="Cinnamon Grand" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Describe the deal..." rows={3} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="discount_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount %</FormLabel>
                <FormControl><Input type="number" min={0} max={100} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location / Address</FormLabel>
                <FormControl><Input placeholder="77 Galle Rd, Colombo 03" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="original_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Promotion Link</FormLabel>
                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="expiry_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <Label>Deal Image</Label>
            <div className="flex items-center gap-3">
              {imagePreview ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute right-0.5 top-0.5 rounded-full bg-destructive p-0.5"
                  >
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </button>
                </div>
              ) : (
                <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted transition-colors hover:border-primary">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
              <span className="text-xs text-muted-foreground">Max 5MB. JPG, PNG, WebP.</span>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="cursor-pointer">Mark as Featured Deal</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting || uploading} className="bg-hero-gradient text-primary-foreground">
            {isSubmitting || uploading ? "Saving..." : deal ? "Update Deal" : "Add Deal"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
};

export default DealForm;
