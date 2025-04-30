import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useStocksDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-stocks'],
    mutationFn: async (id: string) => await axios.delete('/api/stocks', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stocks'] }),
  });
};
