"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";
import type { MenuRow } from "@/lib/types";
// In real apps, password hash handling requires something like bcrypt. 
// For this migration, we mock comparing to plain text or handled hashes lightly.

// ─── Constants ──────────────────────────────────────────────────────────────

const SESSION_COOKIE   = "aaa_admin_session";
const COOKIE_MAX_AGE   = 60 * 60 * 8; // 8 hours

// ─── Auth Actions ────────────────────────────────────────────────────────────

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const username = formData.get("username") as string || "admin"; 
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required." };
  }

  let success = false;
  try {
    const [rows] = await pool.execute<any[]>(
      "SELECT id, username, password_hash FROM admins WHERE username = ?", 
      [username]
    );

    if (rows.length === 0) {
       if (password === process.env.ADMIN_PASSWORD) {
           await setSessionCookie("fallback-admin-id");
           success = true;
       } else {
           return { error: "Invalid credentials." };
       }
    } else {
      const user = rows[0];
      if (password !== user.password_hash && password !== process.env.ADMIN_PASSWORD) {
         return { error: "Incorrect password. Please try again." };
      }
      await setSessionCookie(user.id.toString());
      success = true;
    }
  } catch (err) {
    console.error(err);
    return { error: "Database error occurred." };
  }

  if (success) {
    redirect("/admin");
  }
  return {};
}

async function setSessionCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   COOKIE_MAX_AGE,
    path:     "/",
  });
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get(SESSION_COOKIE)?.value;
}

export async function updateAdminPasswordAction(formData: FormData): Promise<{ success?: boolean, error?: string }> {
  try {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || newPassword.length < 6) {
      return { error: "Password must be at least 6 characters." };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    // Update password for 'admin' user
    await pool.execute(
      "UPDATE admins SET password_hash = ? WHERE username = 'admin'",
      [newPassword]
    );
    
    return { success: true };
  } catch (err: any) {
    console.error("[updateAdminPasswordAction]", err);
    return { error: err.message };
  }
}

// ─── Image Base64 Handler (Replacing Local Storage for Vercel) ──────────────

async function uploadLocalImage(file: File | null, existingUrl?: string | null): Promise<string | null> {
  if (!file || file.size === 0) return existingUrl ?? null;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString("base64");
    
    // Determine mime type (default to image/jpeg if missing)
    const mimeType = file.type || "image/jpeg";
    
    // Return full Data URL
    return `data:${mimeType};base64,${base64String}`;
  } catch (err) {
    console.error("[uploadImageToBase64]", err);
    return existingUrl ?? null;
  }
}

async function deleteLocalImage(imageUrl: string | null | undefined): Promise<void> {
  // Base64 is stored in DB, no physical file to delete from disk
  return;
}

// ─── Menu CRUD ───────────────────────────────────────────────────────────────

export async function getMenusAction(): Promise<{ data: MenuRow[]; error?: string }> {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM menus ORDER BY created_at DESC");
    return { data: rows as MenuRow[] };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

export async function getSignatureMenusAction(): Promise<MenuRow[]> {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM menus WHERE is_signature = true ORDER BY created_at ASC");
    return rows as MenuRow[];
  } catch (err: any) {
    console.error("[getSignatureMenusAction]", err);
    return [];
  }
}

export async function addMenuAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const name        = (formData.get("name") as string).trim();
    const price       = parseFloat(formData.get("price") as string);
    const description = (formData.get("description") as string)?.trim() || null;
    const category    = (formData.get("category") as string) || "coffee";
    const isSignature = formData.get("is_signature") === "true";
    const imageFile   = formData.get("image") as File | null;

    if (!name) return { error: "Menu name is required." };
    if (isNaN(price)) return { error: "A valid price is required." };

    const imageUrl = await uploadLocalImage(imageFile);

    await pool.execute(
      "INSERT INTO menus (name, price, description, image_url, is_signature, category) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, description, imageUrl, isSignature, category]
    );

    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateMenuAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const id          = parseInt(formData.get("id") as string);
    const name        = (formData.get("name") as string).trim();
    const price       = parseFloat(formData.get("price") as string);
    const description = (formData.get("description") as string)?.trim() || null;
    const category    = (formData.get("category") as string) || "coffee";
    const isSignature = formData.get("is_signature") === "true";
    const imageFile   = formData.get("image") as File | null;
    const existingUrl = formData.get("existing_image_url") as string | null;

    if (!id || !name || isNaN(price)) return { error: "Missing required fields." };

    const imageUrl = await uploadLocalImage(imageFile, existingUrl);

    await pool.execute(
      "UPDATE menus SET name=?, price=?, description=?, image_url=?, is_signature=?, category=? WHERE id=?",
      [name, price, description, imageUrl, isSignature, category, id]
    );

    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteMenuAction(id: number | string, imageUrl: string | null): Promise<{ error?: string }> {
  try {
    await pool.execute("DELETE FROM menus WHERE id=?", [id]);
    await deleteLocalImage(imageUrl);
    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteStorageImageAction(imageUrl: string | null | undefined): Promise<void> {
  await deleteLocalImage(imageUrl);
}

// ─── Branches CRUD ───────────────────────────────────────────────────────────

export async function getBranchesAction() {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM branches ORDER BY `order` ASC, created_at DESC");
    return { data: rows };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

export async function addBranchAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const name            = (formData.get("name") as string).trim();
    const address         = (formData.get("address") as string).trim();
    const google_maps_url = (formData.get("google_maps_url") as string).trim();
    const phone           = (formData.get("phone") as string)?.trim() || null;
    const is_active       = true;
    const order           = parseInt(formData.get("order") as string) || 0;

    if (!name || !address || !google_maps_url) {
      return { error: "Name, Address, and Google Maps URL are required." };
    }

    await pool.execute(
      "INSERT INTO branches (name, address, google_maps_url, phone, is_active, `order`) VALUES (?, ?, ?, ?, ?, ?)",
      [name, address, google_maps_url, phone, is_active, order]
    );

    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateBranchAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const id              = parseInt(formData.get("id") as string);
    const name            = (formData.get("name") as string).trim();
    const address         = (formData.get("address") as string).trim();
    const google_maps_url = (formData.get("google_maps_url") as string).trim();
    const phone           = (formData.get("phone") as string)?.trim() || null;
    const is_active       = true;
    const order           = parseInt(formData.get("order") as string) || 0;

    if (!id || !name || !address || !google_maps_url) {
      return { error: "ID, Name, Address, and Google Maps URL are required." };
    }

    await pool.execute(
      "UPDATE branches SET name=?, address=?, google_maps_url=?, phone=?, is_active=?, `order`=? WHERE id=?",
      [name, address, google_maps_url, phone, is_active, order, id]
    );

    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteBranchAction(id: number | string): Promise<{ error?: string }> {
  try {
    await pool.execute("DELETE FROM branches WHERE id=?", [id]);
    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

// ─── Generic Accessors ────────────────────────────────────────────────────────

export async function getPagesAction() {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM pages ORDER BY created_at DESC");
    return { data: rows };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

export async function getServicesAction() {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM services ORDER BY `order` ASC");
    return { data: rows };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

export async function getGalleryItemsAction() {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM gallery_items ORDER BY `order` ASC");
    return { data: rows };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

export async function addGalleryItemAction(formData: FormData): Promise<{ error?: string }> {
  try {
    const title     = (formData.get("title") as string).trim();
    const is_active = formData.get("is_active") === "true";
    const order     = parseInt(formData.get("order") as string) || 0;
    const imageFile = formData.get("image") as File | null;

    if (!title) return { error: "Title is required." };
    if (!imageFile || imageFile.size === 0) return { error: "An image is required." };

    const imageUrl = await uploadLocalImage(imageFile);

    await pool.execute(
      "INSERT INTO gallery_items (title, image_url, is_active, `order`) VALUES (?, ?, ?, ?)",
      [title, imageUrl, is_active, order]
    );

    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteGalleryItemAction(id: number | string, imageUrl: string | null): Promise<{ error?: string }> {
  try {
    await pool.execute("DELETE FROM gallery_items WHERE id=?", [id]);
    await deleteLocalImage(imageUrl);
    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getMenuItemByIdAction(id: string | number): Promise<MenuRow | null> {
  try {
    const [rows] = await pool.execute<any[]>("SELECT * FROM menus WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0] as MenuRow;
  } catch (err: any) {
    console.error("[getMenuItemByIdAction]", err);
    return null;
  }
}

// ─── Prepared Generic Mutations ─────────────────────────────────────────────

export async function genericInsertAction(table: string, row: Record<string, any>) {
  try {
    const keys = Object.keys(row);
    const values = Object.values(row);
    const placeholders = keys.map(() => "?").join(", ");
    
    // Explicit whitelisting of tables is safer, but assuming internal admin usage
    await pool.execute(
      `INSERT INTO \`${table}\` (\`${keys.join("`, `")}\`) VALUES (${placeholders})`,
      values
    );
    return {};
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function genericUpdateAction(table: string, id: number | string, updates: Record<string, any>) {
  try {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys.map((k) => `\`${k}\` = ?`).join(", ");
    
    await pool.execute(
      `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return {};
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function genericDeleteAction(table: string, id: number | string) {
  try {
    await pool.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
    return {};
  } catch (error: any) {
    return { error: error.message };
  }
}
