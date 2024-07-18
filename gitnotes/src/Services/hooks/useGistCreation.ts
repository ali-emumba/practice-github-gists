import { useMutation } from '@tanstack/react-query';
import { addAGist } from '../gists';
import { IGistBody } from '../../types/types';
import { toast } from 'react-toastify';

export const useGistCreation = (reset: () => void) => {
  const mutation = useMutation({
    mutationFn: (data: IGistBody) => addAGist(data),
    onSuccess: () => {
      reset();
      toast.success('Gist created successfully!');
    },
    onError: () => {
      toast.error('Error creating gist, please try again later');
    },
  });

  const onSubmit = (data: IGistBody) => {
    mutation.mutate(data);
  };

  return { onSubmit };
};
