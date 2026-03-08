import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type DbDeal = Database["public"]["Tables"]["deals"]["Row"];
export type DbDealInsert = Database["public"]["Tables"]["deals"]["Insert"];
export type DbDealUpdate = Database["public"]["Tables"]["deals"]["Update"];

export const fetchDeals = async (archived = false) => {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("is_archived", archived)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as DbDeal[];
};

export const fetchFeaturedDeals = async () => {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("is_featured", true)
    .eq("is_archived", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as DbDeal[];
};

export const insertDeal = async (deal: DbDealInsert) => {
  const { data, error } = await supabase.from("deals").insert(deal).select().single();
  if (error) throw error;
  return data;
};

export const updateDeal = async (id: string, deal: DbDealUpdate) => {
  const { data, error } = await supabase.from("deals").update(deal).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteDeal = async (id: string) => {
  const { error } = await supabase.from("deals").delete().eq("id", id);
  if (error) throw error;
};

export const uploadDealImage = async (file: File): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("deal-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("deal-images").getPublicUrl(path);
  return data.publicUrl;
};
