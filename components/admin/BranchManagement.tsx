"use client";

import { useState } from "react";
import { Loader2, X, MapPin, Globe, Phone, Plus, Trash2, Pencil, ExternalLink, Activity } from "lucide-react";
import toast from "react-hot-toast";
import type { BranchRow } from "@/lib/types";
import { addBranchAction, updateBranchAction, deleteBranchAction } from "@/app/admin/actions";

interface BranchManagementProps {
  initialBranches: BranchRow[];
  onRefresh: () => void;
}

type ModalMode = "add" | "edit";

export default function BranchManagement({ initialBranches, onRefresh }: BranchManagementProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [editTarget, setEditTarget] = useState<BranchRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm delete
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const inputCx = "w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-deep-red/20 focus:border-deep-red outline-none transition-all";
  const labelCx = "block text-sm font-medium text-gray-700 mb-1";

  function openAddModal() {
    setEditTarget(null);
    setModalMode("add");
    setModalOpen(true);
  }

  function openEditModal(branch: BranchRow) {
    setEditTarget(branch);
    setModalMode("edit");
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    if (modalMode === "edit" && editTarget) {
      formData.append("id", editTarget.id.toString());
    }

    const action = modalMode === "add" ? addBranchAction : updateBranchAction;
    const result = await action(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(modalMode === "add" ? "Branch added!" : "Branch updated!");
      setModalOpen(false);
      onRefresh();
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: number) {
    const loadingId = toast.loading("Deleting branch...");
    const result = await deleteBranchAction(id);
    if (result.error) {
      toast.error(result.error, { id: loadingId });
    } else {
      toast.success("Branch deleted", { id: loadingId });
      setDeleteId(null);
      onRefresh();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-forest-green" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Branch Management
          </h2>
          <p className="text-forest-green/50 text-xs sm:text-sm mt-1">
            Manage store locations and Google Maps links
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2.5 bg-deep-red text-white rounded-xl font-bold text-sm hover:bg-deep-red/90 transition-all shadow-md active:scale-95 w-full sm:w-auto cursor-pointer"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Add Branch</span>
        </button>
      </div>

      {/* Branch List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialBranches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="p-5 space-y-4 flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2 min-h-[56px] leading-tight">
                    {branch.name}
                  </h3>
                </div>
                <div className="flex gap-1 shrink-0 ml-2">
                  <button onClick={() => openEditModal(branch)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeleteId(branch.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 flex-1">
                <div className="flex gap-2 items-start min-h-[40px]">
                  <MapPin size={16} className="text-deep-red shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{branch.address}</span>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Phone size={16} className="text-deep-red shrink-0" />
                  <span className={branch.phone ? "" : "text-gray-300 italic text-xs"}>
                    {branch.phone || "No phone number"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 mt-auto">
                <ExternalLink size={16} className="text-blue-500 shrink-0" />
                <a 
                  href={branch.google_maps_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate font-medium"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 text-xs text-gray-400">
              ID: {branch.id} • Order: {branch.order}
            </div>
          </div>
        ))}

        {initialBranches.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No branches found. Add your first location!</p>
          </div>
        )}
      </div>

      {/* Upsert Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                {modalMode === "add" ? "Add New Branch" : "Edit Branch"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCx}>Branch Name *</label>
                  <input name="name" required defaultValue={editTarget?.name} className={inputCx} placeholder="Triple A Coffee - Center" />
                </div>
                <div>
                  <label className={labelCx}>Address *</label>
                  <textarea name="address" required defaultValue={editTarget?.address} rows={3} className={`${inputCx} resize-none`} placeholder="Full address details..." />
                </div>
                <div>
                  <label className={labelCx}>Google Maps URL *</label>
                  <input name="google_maps_url" required defaultValue={editTarget?.google_maps_url} className={inputCx} placeholder="https://goo.gl/maps/..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCx}>Phone (Optional)</label>
                    <input name="phone" defaultValue={editTarget?.phone ?? ""} className={inputCx} placeholder="+62..." />
                  </div>
                  <div>
                    <label className={labelCx}>Display Order</label>
                    <input name="order" type="number" defaultValue={editTarget?.order ?? 0} className={inputCx} />
                  </div>
                </div>
                <input type="hidden" name="is_active" value="true" />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] px-4 py-2 bg-deep-red text-white font-semibold rounded-lg hover:bg-deep-red/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                  {modalMode === "add" ? "Add Branch" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Confirm Delete</h3>
            <p className="text-gray-500">Are you sure you want to delete this branch? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
