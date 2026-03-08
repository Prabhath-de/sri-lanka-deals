import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, X, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, CITIES } from "@/lib/types";
import { uploadDealImage } from "@/lib/deals-api";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const submitSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  business_name: z.string().min(1, "Business name is required").max(200),
  description: z.string().max(1000).optional(),
  discount_percentage: z.coerce.number().min(0).max(100),
  category: z.string().min(1, "Category is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().max(300).optional(),
  original_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  expiry_date: z.date({ required_error: "Expiry date is required" }),
  submitter_name: z.string().min(1, "Your name is required").max(100),
  submitter_email: z.string().email("Valid email required").max(255),
  submitter_phone: z.string().max(20).optional(),
});

type SubmitFormValues = z.infer<typeof submitSchema>;

const SubmitDealPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SubmitFormValues>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      title: "", business_name: "", description: "", discount_percentage: 0,
      category: "", city: "", location: "", original_url: "",
      submitter_name: "", submitter_email: "", submitter_phone: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast.error("Image must be less than 5MB"); return; }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values: SubmitFormValues) => {
    try {
      setIsSubmitting(true);
      let image_url: string | null = null;
      if (imageFile) {
        image_url = await uploadDealImage(imageFile);
      }

      const { error } = await supabase.from("deals").insert({
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
        is_featured: false,
        status: "pending",
        submitter_name: values.submitter_name,
        submitter_email: values.submitter_email,
        submitter_phone: values.submitter_phone || null,
      } as any);

      if (error) throw error;

      // Try to send notification email (non-blocking)
      try {
        await supabase.functions.invoke("notify-new-deal", {
          body: { title: values.title, business_name: values.business_name, submitter_name: values.submitter_name, submitter_email: values.submitter_email },
        });
      } catch { /* notification is non-critical */ }

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit deal");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-3 font-heading text-3xl font-bold text-foreground">Deal Submitted!</h1>
          <p className="mb-6 max-w-md text-muted-foreground">
            Thank you for sharing this deal! Our team will review it and once approved, it will appear on the website. We'll notify you by email.
          </p>
          <Button onClick={() => { setSubmitted(false); form.reset(); setImageFile(null); setImagePreview(null); }} className="bg-hero-gradient text-primary-foreground">
            Submit Another Deal
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">Submit a Deal</h1>
            <p className="text-muted-foreground">
              Know a great deal or promotion? Share it with the community! Your submission will be reviewed before publishing.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-deal-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                {/* Submitter info */}
                <div className="rounded-lg bg-accent/50 p-4">
                  <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">Your Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField control={form.control} name="submitter_name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="submitter_email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email *</FormLabel>
                        <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="mt-4">
                    <FormField control={form.control} name="submitter_phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl><Input placeholder="+94 77 123 4567" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Deal info */}
                <h3 className="font-heading text-sm font-semibold text-foreground">Deal Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Title *</FormLabel>
                      <FormControl><Input placeholder="50% Off Lunch Buffet" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="business_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl><Input placeholder="Cinnamon Grand" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the deal..." rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField control={form.control} name="discount_percentage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount %</FormLabel>
                      <FormControl><Input type="number" min={0} max={100} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location / Address</FormLabel>
                      <FormControl><Input placeholder="77 Galle Rd, Colombo 03" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="original_url" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotion Link</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField control={form.control} name="expiry_date" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-3">
                    <Label>Deal Image</Label>
                    <div className="flex items-center gap-3">
                      {imagePreview ? (
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                          <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute right-0.5 top-0.5 rounded-full bg-destructive p-0.5">
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

                <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                  📋 Your submission will be reviewed by our team before being published. We'll notify you by email once it's approved.
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full gap-2 bg-hero-gradient text-primary-foreground">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Deal for Review"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitDealPage;
