/**
 * SignatureMenuSection — Server Component
 *
 * Fetches signature menu items from Supabase at request time and passes
 * them to the <SignatureMenu> client component.
 *
 * If the Supabase env variables are not configured yet (local dev without
 * a DB), the component gracefully falls back to the static hardcoded items
 * defined in lib/data.ts — no runtime error, no blank section.
 */

import SignatureMenu from "@/components/SignatureMenu";
import { menuRowToDisplay, type DisplayMenuItem } from "@/lib/menu-utils";
import { getSignatureMenusAction } from "@/app/admin/actions";

export default async function SignatureMenuSection() {
  let items: DisplayMenuItem[] | undefined;

  const rows = await getSignatureMenusAction();
  if (rows.length > 0) {
    items = rows.map(menuRowToDisplay);
  }

  // Pass items only when we have real DB data; otherwise let SignatureMenu
  // render its built-in static fallback (MENU_ITEMS from data.ts).
  return <SignatureMenu items={items} />;
}
