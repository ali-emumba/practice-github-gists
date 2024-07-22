import { useMutation } from '@tanstack/react-query';
import { addAGist } from '../gists';
import { IGistBody } from '../../Types/types';
import { toast } from 'react-toastify';

export const useGistCreation = () => {
  const mutation = useMutation({
    mutationFn: (data: IGistBody) => addAGist(data),
    onSuccess: () => {
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
