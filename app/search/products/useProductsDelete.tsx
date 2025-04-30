import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useProductsDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-products'],
    mutationFn: async (id: string) => await axios.delete('/api/products', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
