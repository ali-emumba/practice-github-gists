import { getOctokitInstance } from './octokit';
import { IGistBody, IFile, IFileData } from './../Types/types';
import { Octokit } from 'octokit';

export const getAGist = async (id: string) => {
  const octokit = getOctokitInstance();
  const response = await octokit.request('GET /gists/{gist_id}', {
    gist_id: id,
  });
  return response.data;
};

export const forkAGist = async (id: string) => {
  const octokit = getOctokitInstance();
  const resp = await octokit.request('POST /gists/{gist_id}/forks', {
    gist_id: id,
  });
  return resp;
};

export const starAGist = async (id: string) => {
  const octokit = getOctokitInstance();
  const resp = await octokit.request('PUT /gists/{gist_id}/star', {
    gist_id: id,
  });
  return resp;
};

export const addAGist = async (data: IGistBody) => {
  const octokit = getOctokitInstance();
  const fileData: IFileData = {};
  data.files.forEach((file: IFile) => {
    fileData[file.fileName] = { content: file.content };
  });

  const res = await octokit.request('POST /gists', {
    description: data.description,
    public: false,
    files: fileData,
  });
  return res;
};

export const isGistStarred = async (id: string) => {
  const octokit = getOctokitInstance();
  const res = await octokit.request('GET /gists/{gist_id}/star', {
    gist_id: id,
  });
  return res;
};

export const getPublicGists = async () => {
  const octokit = new Octokit();
  const res = await octokit.request('GET /gists/public');
  return res.data;
};

export const getUserGists = async () => {
  const octokit = getOctokitInstance();
  const res = await octokit.request('GET /gists');
  return res.data;
};

export const getGistsApiCall = (isAuthenticated: boolean) => {
  return isAuthenticated ? getUserGists() : getPublicGists();
};
