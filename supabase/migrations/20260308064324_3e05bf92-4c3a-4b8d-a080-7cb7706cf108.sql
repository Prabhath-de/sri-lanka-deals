
-- Create deals table
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  business_name TEXT NOT NULL,
  description TEXT,
  discount_percentage INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  location TEXT,
  image_url TEXT,
  original_url TEXT,
  expiry_date DATE NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Everyone can read active deals
CREATE POLICY "Anyone can view active deals"
  ON public.deals FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete (admin check will be app-level for now)
CREATE POLICY "Authenticated users can insert deals"
  ON public.deals FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update deals"
  ON public.deals FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete deals"
  ON public.deals FOR DELETE
  TO authenticated
  USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for deal images
INSERT INTO storage.buckets (id, name, public) VALUES ('deal-images', 'deal-images', true);

CREATE POLICY "Anyone can view deal images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'deal-images');

CREATE POLICY "Authenticated users can upload deal images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'deal-images');

CREATE POLICY "Authenticated users can update deal images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'deal-images');

CREATE POLICY "Authenticated users can delete deal images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'deal-images');
