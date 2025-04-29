import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useSupplierDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-supplier'],
    mutationFn: async (id: string) => await axios.delete('/api/supplier', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['supplier'] }),
  });
};
