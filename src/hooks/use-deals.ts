import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeals, fetchFeaturedDeals, insertDeal, updateDeal, deleteDeal, DbDealInsert, DbDealUpdate } from "@/lib/deals-api";

export const useDeals = (archived = false) =>
  useQuery({
    queryKey: ["deals", { archived }],
    queryFn: () => fetchDeals(archived),
  });

export const useFeaturedDeals = () =>
  useQuery({
    queryKey: ["deals", "featured"],
    queryFn: fetchFeaturedDeals,
  });

export const useInsertDeal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (deal: DbDealInsert) => insertDeal(deal),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deals"] }),
  });
};

export const useUpdateDeal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, deal }: { id: string; deal: DbDealUpdate }) => updateDeal(id, deal),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deals"] }),
  });
};

export const useDeleteDeal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDeal(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["deals"] }),
  });
};
