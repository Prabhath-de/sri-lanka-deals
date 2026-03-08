export interface Deal {
  id: string;
  title: string;
  business_name: string;
  description: string;
  discount_percentage: number;
  category: DealCategory;
  city: string;
  location: string;
  image_url: string;
  original_url: string;
  expiry_date: string;
  is_featured: boolean;
  is_archived: boolean;
  created_at: string;
}

export type DealCategory =
  | "Food"
  | "Restaurants"
  | "Hotels"
  | "Fashion"
  | "Electronics"
  | "Travel"
  | "Supermarkets";

export const CATEGORIES: DealCategory[] = [
  "Food",
  "Restaurants",
  "Hotels",
  "Fashion",
  "Electronics",
  "Travel",
  "Supermarkets",
];

export const CITIES = [
  "Colombo",
  "Kandy",
  "Galle",
  "Negombo",
  "Jaffna",
  "Matara",
  "Batticaloa",
  "Trincomalee",
  "Kurunegala",
  "Anuradhapura",
];
