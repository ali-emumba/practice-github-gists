import { useQuery } from '@tanstack/react-query';
import { getGistsApiCall } from '../gists';
import dayjs from 'dayjs';

const getFilteredResults = (data) => {
  return data.map((gist) => {
    const firstFileKey = Object.keys(gist.files)[0];
    const firstFile = gist.files[firstFileKey];

    return {
      id: gist.id,
      fileName: firstFile,
      ownerName: gist.owner.login,
      ownerImageUrl: gist.owner.avatar_url,
      gistName: firstFile.filename,
      createdAt: dayjs(gist.created_at).format('DD-MM-YYYY'),
      gistDescription: gist.description,
      updatedAt: dayjs(gist.owner.updated_at).format('DD-MM-YYYY'),
      gitHubUrl: gist.owner.html_url,
    };
  });
};

export const usePublicGistsData = (isAuthenticated: boolean) => {
  const publicGistResponse = useQuery({
    queryKey: ['gists', isAuthenticated],
    queryFn: () => getGistsApiCall(isAuthenticated),
    select: getFilteredResults,
  });

  return publicGistResponse;
};
