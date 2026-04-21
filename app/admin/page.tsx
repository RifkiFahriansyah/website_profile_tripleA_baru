import { redirect } from "next/navigation";
import { 
  checkSession, 
  getMenusAction, 
  getBranchesAction 
} from "@/app/admin/actions";
import AdminDashboard from "@/components/admin/AdminDashboard";

/**
 * /admin — Server Component
 *
 * 1. Checks for a valid session cookie (set by loginAction).
 *    → Redirects to /admin/login if the session is missing.
 * 2. Fetches all menu items and branches server-side (no client waterfall).
 * 3. Renders the AdminDashboard client component with initial data.
 */
export const dynamic = "force-dynamic"; // always fetch fresh data on each request

export default async function AdminPage() {
  // ── Auth guard ────────────────────────────────────────────────────────────
  const isAuthenticated = await checkSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  // ── Server-side data fetch ────────────────────────────────────────────────
  const [
    { data: initialMenus },
    { data: initialBranches }
  ] = await Promise.all([
    getMenusAction(),
    getBranchesAction()
  ]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminDashboard 
      initialMenus={initialMenus || []} 
      initialBranches={initialBranches || []} 
    />
  );
}
