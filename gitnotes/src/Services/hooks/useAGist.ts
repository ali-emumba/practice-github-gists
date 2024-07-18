import { useQuery } from '@tanstack/react-query';
import { getAGist } from '../gists';
import dayjs from 'dayjs';

export const useAGist = (id: string) => {
  const gistDataQueryResponse = useQuery({
    queryKey: ['gist', id],
    queryFn: () => getAGist(id),
  });

  if (gistDataQueryResponse.data) {
    gistDataQueryResponse.data.createdAt = dayjs(gistDataQueryResponse.data.created_at).format('YYYY-MM-DD');
  }
  return gistDataQueryResponse;
};
