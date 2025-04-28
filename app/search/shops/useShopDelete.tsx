import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useShopDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-shop'],
    mutationFn: async (id: string) => await axios.delete('/api/shops', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shops'] }),
  });
};
