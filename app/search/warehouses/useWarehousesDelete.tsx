import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useWarehousesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-warehouse'],
    mutationFn: async (id: string) => await axios.delete('/api/warehouses', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['warehouse'] }),
  });
};
