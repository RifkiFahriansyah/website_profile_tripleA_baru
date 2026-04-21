// ─── Native MySQL Type Definitions ───
// These carefully represent the table structures in 001_initial_schema.sql

export interface AdminRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface PageRow {
  id: number;
  slug: string;
  title: string;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageSectionRow {
  id: number;
  page_id: number;
  section_identifier: string;
  content: any; // JSON object parsed by mysql2
  order: number;
  created_at: string;
}

export interface ServiceRow {
  id: number;
  title: string;
  description: string;
  icon_name: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface TeamMemberRow {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface TestimonialRow {
  id: number;
  author_name: string;
  content: string;
  author_title: string | null;
  rating: number;
  is_published: boolean;
  created_at: string;
}

export interface GalleryItemRow {
  id: number;
  title: string;
  image_url: string;
  alt_text: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface MenuRow {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  is_signature: boolean;
  category: string;
  created_at: string;
}

export interface BranchRow {
  id: number;
  name: string;
  address: string;
  google_maps_url: string;
  phone: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// ─── Extended Types via JOINs ───
// Represents a page retrieved with JSON_ARRAYAGG of all its sections
export interface PageWithSections extends PageRow {
  sections: PageSectionRow[];
}
