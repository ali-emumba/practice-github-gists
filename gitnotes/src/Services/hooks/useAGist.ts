import { useQuery } from '@tanstack/react-query';
import { getAGist } from '../gists';

export const useAGist = (id: string) => {
  const gistDataQueryResponse = useQuery({
    queryKey: ['gist', id],
    queryFn: () => getAGist(id),
  });

  return gistDataQueryResponse;
};
