import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useEmployeeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-employee'],
    mutationFn: async (id: string) => await axios.delete('/api/employees', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });
};
