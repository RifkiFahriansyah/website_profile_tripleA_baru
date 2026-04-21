"use client";

import { useState, useTransition, useCallback } from "react";
import Image from "next/image";

import toast, { Toaster } from "react-hot-toast";
import {
  Coffee,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Star,
  ImageOff,
  Loader2,
  UtensilsCrossed,
  MapPin,
  Settings,
  LayoutDashboard,
  Menu as MenuIcon,
} from "lucide-react";

import MenuFormModal, { type ModalMode } from "@/components/admin/MenuFormModal";
import BranchManagement from "@/components/admin/BranchManagement";
import {
  logoutAction,
  addMenuAction,
  updateMenuAction,
  deleteMenuAction,
  getMenusAction,
  getBranchesAction,
  updateAdminPasswordAction,
} from "@/app/admin/actions";
import type { MenuRow, BranchRow } from "@/lib/types";

// ─── Default Blank Object ────────────────────────────────────────────────────────────────────

interface AdminDashboardProps {
  initialMenus: MenuRow[];
  initialBranches: BranchRow[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard({ initialMenus, initialBranches }: AdminDashboardProps) {
  const [menus, setMenus]                 = useState<MenuRow[]>(initialMenus);
  const [branches, setBranches]           = useState<BranchRow[]>(initialBranches);
  const [activeTab, setActiveTab]         = useState<"menu" | "branches" | "settings">("menu");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPending, startTransition]      = useTransition();
  const [isLogoutPending, startLogout]    = useTransition();
  const [isSubmitting, setIsSubmitting]   = useState(false);

  // Modal state
  const [modalMode, setModalMode]         = useState<ModalMode>("add");
  const [editTarget, setEditTarget]       = useState<MenuRow | null>(null);
  const [modalOpen, setModalOpen]         = useState(false);

  // Confirm delete overlay
  const [deleteTarget, setDeleteTarget]   = useState<MenuRow | null>(null);
  const [isDeleting, setIsDeleting]       = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const refreshMenus = useCallback(() => {
    startTransition(async () => {
      const { data, error } = await getMenusAction();
      if (error) toast.error("Failed to refresh menu list.");
      else setMenus(data);
    });
  }, []);

  const refreshBranches = useCallback(() => {
    startTransition(async () => {
      const { data, error } = await getBranchesAction();
      if (error) toast.error("Failed to refresh branches list.");
      else setBranches(data);
    });
  }, []);

  // ── Open modal helpers ────────────────────────────────────────────────────

  function openAddModal() {
    setEditTarget(null);
    setModalMode("add");
    setModalOpen(true);
  }

  function openEditModal(item: MenuRow) {
    setEditTarget(item);
    setModalMode("edit");
    setModalOpen(true);
  }

  function closeModal() {
    if (isSubmitting) return;
    setModalOpen(false);
    setEditTarget(null);
  }

  // ── CRUD handlers ─────────────────────────────────────────────────────────

  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    const action   = modalMode === "add" ? addMenuAction : updateMenuAction;
    const label    = modalMode === "add" ? "Menu item added!" : "Menu item updated!";

    const toastId  = toast.loading(modalMode === "add" ? "Adding item…" : "Saving changes…");

    const result   = await action(formData);

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success(label, { id: toastId });
      closeModal();
      refreshMenus();
    }
    setIsSubmitting(false);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    const toastId = toast.loading("Deleting item…");
    const result  = await deleteMenuAction(deleteTarget.id, deleteTarget.image_url);

    if (result.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Menu item deleted.", { id: toastId });
      refreshMenus();
    }

    setIsDeleting(false);
    setDeleteTarget(null);
  }

  function handleLogout() {
    startLogout(async () => {
      await logoutAction();
    });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-[#FDFCF8] flex overflow-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* ── Toast Container ── */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-inter), sans-serif",
            fontSize:   "13px",
            borderRadius: "12px",
            color:      "#1B3022",
          },
          success: { iconTheme: { primary: "#1B3022", secondary: "#F5F5DC" } },
          error:   { iconTheme: { primary: "#8B0000", secondary: "#F5F5DC" } },
        }}
      />

      {/* ── Mobile Sidebar Overlay ── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside 
        className={`bg-forest-green text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 z-50 fixed inset-y-0 left-0 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
            <Image 
              src="/images/logo/logobaru.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-[13px] font-black tracking-wider uppercase leading-none" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Triple A Coffee
            </h1>
            <span className="text-[9px] text-white/50 font-bold tracking-widest uppercase mt-1 block">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "menu" 
                ? "bg-deep-red text-white shadow-lg" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <MenuIcon size={18} />
            <span>Menu Items</span>
          </button>
          <button
            onClick={() => setActiveTab("branches")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "branches" 
                ? "bg-deep-red text-white shadow-lg" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin size={18} />
            <span>Cabang</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "settings" 
                ? "bg-deep-red text-white shadow-lg" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={isLogoutPending}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header (Top Bar) */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
            >
              <MenuIcon size={20} />
            </button>
            <h2 className="text-lg font-bold text-forest-green capitalize">
              {activeTab === 'menu' ? 'Menu Management' : activeTab === 'branches' ? 'Branch Management' : 'Settings'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {isPending && (
              <div className="flex items-center gap-2 text-forest-green/30 text-xs text-right">
                <Loader2 size={12} className="animate-spin" />
                Updating...
              </div>
            )}
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-forest-green">Administrator</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Triple A Coffee Admin</p>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-6xl mx-auto w-full flex-1">
          {activeTab === "menu" ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-black text-forest-green"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Inventory
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-forest-green/50 text-xs sm:text-sm">
                      {menus.length} total items in registry
                    </p>
                  </div>
                </div>

                <button 
                  onClick={openAddModal}
                  className="flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2.5 bg-deep-red text-white rounded-xl font-bold text-sm hover:bg-deep-red/90 transition-all shadow-md active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Add New Item</span>
                </button>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                {menus.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                    <div className="w-16 h-16 rounded-3xl bg-cream flex items-center justify-center mb-5">
                      <UtensilsCrossed size={28} className="text-forest-green/30" />
                    </div>
                    <h4 className="text-xl font-bold text-forest-green mb-2">No menu items found</h4>
                    <button
                      onClick={openAddModal}
                      className="mt-4 px-6 py-2 bg-deep-red text-white rounded-xl font-bold text-sm hover:bg-deep-red/90 transition-colors"
                    >
                      Add First Item
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Item</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {menus.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/5 transition group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 overflow-hidden relative border border-gray-100">
                                  {item.image_url ? (
                                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ImageOff size={16} className="text-gray-300" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-forest-green text-sm">{item.name}</h5>
                                    {item.is_signature && <Star size={10} className="text-amber-500" fill="currentColor" />}
                                  </div>
                                  <p className="text-[12px] text-gray-400 line-clamp-1">{item.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-lg bg-cream/50 text-forest-green text-[11px] font-bold capitalize">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-forest-green text-sm">
                              Rp {Number(item.price).toLocaleString('id-ID')}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"><Pencil size={15} /></button>
                                <button onClick={() => setDeleteTarget(item)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"><Trash2 size={15} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === "branches" ? (
            <BranchManagement 
              initialBranches={branches} 
              onRefresh={refreshBranches} 
            />
          ) : (
            <div className="max-w-md">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-forest-green" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Settings
                </h3>
                <p className="text-forest-green/50 text-xs sm:text-sm mt-1">
                  Update your administrative security credentials
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <form 
                  action={async (fd) => {
                    const res = await updateAdminPasswordAction(fd);
                    if (res.error) toast.error(res.error);
                    else {
                      toast.success("Password updated successfully!");
                      (document.getElementById("settings-form") as HTMLFormElement)?.reset();
                    }
                  }} 
                  id="settings-form"
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">New Password</label>
                    <input 
                      name="newPassword" 
                      type="password" 
                      required
                      placeholder="Min. 6 characters"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 outline-none focus:border-deep-red focus:ring-4 focus:ring-deep-red/5 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Confirm New Password</label>
                    <input 
                      name="confirmPassword" 
                      type="password" 
                      required
                      placeholder="Repeat new password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 outline-none focus:border-deep-red focus:ring-4 focus:ring-deep-red/5 transition-all" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-forest-green text-white rounded-xl font-bold hover:bg-forest-green/90 transition-all shadow-md active:scale-[0.98]"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <MenuFormModal
          mode={modalMode}
          initial={editTarget}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ── Delete Confirm Overlay ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-deep-red/10 flex items-center justify-center mx-auto mb-5">
              <Trash2 size={24} className="text-deep-red" />
            </div>
            <h3
              className="text-xl font-black text-forest-green mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Delete Menu Item?
            </h3>
            <p className="text-forest-green/60 text-sm mb-6">
              <strong className="text-forest-green">&ldquo;{deleteTarget.name}&rdquo;</strong> will be
              permanently removed from the database. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-xl border border-forest-green/20 text-forest-green text-sm font-semibold hover:bg-forest-green/5 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl bg-deep-red text-white text-sm font-bold hover:bg-deep-red/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                {isDeleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const thCx =
  "px-4 py-3.5 text-left text-[10px] font-bold text-forest-green/40 tracking-widest uppercase bg-cream/60";
