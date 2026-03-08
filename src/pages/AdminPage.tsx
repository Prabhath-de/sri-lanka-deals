import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Archive, CheckCircle, XCircle, Clock, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DealForm from "@/components/DealForm";
import { useAdminDeals, usePendingDeals, useInsertDeal, useUpdateDeal, useDeleteDeal } from "@/hooks/use-deals";
import { DbDeal, DbDealInsert } from "@/lib/deals-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const statusBadge = (status: string) => {
  switch (status) {
    case "approved": return <Badge className="bg-primary/10 text-primary border-primary/20">✅ Approved</Badge>;
    case "rejected": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">❌ Rejected</Badge>;
    default: return <Badge className="bg-gold/10 text-gold border-gold/20">⏳ Pending</Badge>;
  }
};

const AdminPage = () => {
  const { data: allDeals, isLoading } = useAdminDeals();
  const { data: pendingDeals } = usePendingDeals();
  const insertDeal = useInsertDeal();
  const updateDealMut = useUpdateDeal();
  const deleteDealMut = useDeleteDeal();

  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<DbDeal | undefined>();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = async (data: DbDealInsert) => {
    await insertDeal.mutateAsync({ ...data, status: "approved" } as any);
    toast.success("Deal added and approved!");
    setShowForm(false);
  };

  const handleEdit = async (data: DbDealInsert) => {
    if (!editingDeal) return;
    await updateDealMut.mutateAsync({ id: editingDeal.id, deal: data });
    toast.success("Deal updated!");
    setEditingDeal(undefined);
    setShowForm(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteDealMut.mutateAsync(deleteId);
    toast.success("Deal deleted");
    setDeleteId(null);
  };

  const handleApprove = async (deal: DbDeal) => {
    await updateDealMut.mutateAsync({ id: deal.id, deal: { status: "approved" } as any });
    toast.success("Deal approved and now visible!");
  };

  const handleReject = async (deal: DbDeal) => {
    await updateDealMut.mutateAsync({ id: deal.id, deal: { status: "rejected" } as any });
    toast.success("Deal rejected");
  };

  const handleArchive = async (deal: DbDeal) => {
    await updateDealMut.mutateAsync({ id: deal.id, deal: { is_archived: true } });
    toast.success("Deal archived");
  };

  const pendingCount = pendingDeals?.length || 0;

  const renderTable = (deals: DbDeal[] | undefined, showApproval = false) => {
    if (!deals?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="mb-4 text-5xl">{showApproval ? "📬" : "📋"}</span>
          <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
            {showApproval ? "No pending submissions" : "No deals yet"}
          </h3>
          <p className="text-muted-foreground">
            {showApproval ? "All submissions have been reviewed" : "Add your first deal to get started"}
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Deal</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Status</th>
              <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Discount</th>
              {showApproval && <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Submitted By</th>}
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {deal.image_url ? (
                      <img src={deal.image_url} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">🏷️</div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{deal.title}</p>
                      <p className="text-xs text-muted-foreground">{deal.business_name} · {deal.city}</p>
                    </div>
                    {deal.is_featured && <Star className="h-4 w-4 fill-gold text-gold" />}
                  </div>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  {statusBadge((deal as any).status || "pending")}
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className="font-semibold text-deal-badge">-{deal.discount_percentage}%</span>
                </td>
                {showApproval && (
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="text-xs">
                      <p className="text-foreground">{(deal as any).submitter_name || "—"}</p>
                      <p className="text-muted-foreground">{(deal as any).submitter_email || ""}</p>
                    </div>
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {showApproval && (deal as any).status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(deal)} title="Approve" className="text-primary hover:text-primary">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(deal)} title="Reject" className="text-destructive hover:text-destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => { setEditingDeal(deal); setShowForm(true); }} title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleArchive(deal)} title="Archive">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(deal.id)} title="Delete" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage deals, review submissions</p>
          </div>
          {!showForm && (
            <Button onClick={() => { setEditingDeal(undefined); setShowForm(true); }} className="gap-2 bg-hero-gradient text-primary-foreground">
              <Plus className="h-4 w-4" /> Add New Deal
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-deal-card">
            <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">
              {editingDeal ? "Edit Deal" : "Add New Deal"}
            </h2>
            <DealForm
              deal={editingDeal}
              onSubmit={editingDeal ? handleEdit : handleAdd}
              onCancel={() => { setShowForm(false); setEditingDeal(undefined); }}
              isSubmitting={insertDeal.isPending || updateDealMut.isPending}
            />
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading...</div>
        ) : (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending {pendingCount > 0 && <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-deal-badge text-[10px] text-deal-badge-foreground">{pendingCount}</span>}
              </TabsTrigger>
              <TabsTrigger value="all">All Deals</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              {renderTable(pendingDeals, true)}
            </TabsContent>
            <TabsContent value="all">
              {renderTable(allDeals, true)}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Footer />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this deal?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;
