import { Octokit } from 'octokit';

export const getOctokitInstance = () => {
  const token = localStorage.getItem('userToken') || '';
  return new Octokit({
    auth: token,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${token}`,
    },
  });
};
