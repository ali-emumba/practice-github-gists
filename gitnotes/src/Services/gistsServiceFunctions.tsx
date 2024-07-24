import axios from "axios";

// Base URLs and headers
const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28",
  Accept: "application/vnd.github.v3+json",
};

// Interfaces
interface CreateGistFile {
  [filename: string]: {
    content: string;
  };
}

interface CreateGistData {
  description: string;
  public: boolean;
  files: CreateGistFile;
}

export interface GistOwner {
  login: string;
  avatar_url: string;
}

export interface GistFile {
  filename: string;
  content: string;
  raw_url?: string;
}

export interface GistData {
  owner: GistOwner;
  created_at: string;
  description: string;
  files: {
    [key: string]: GistFile;
  };
}

export interface UserGistData {
  id: string;
  owner: GistOwner;
  createdAt: string;
  gistName: string;
  gistDescription: string;
  rawUrl: string;
  files: {
    [key: string]: GistFile;
  };
}

// Utility function to create headers with authorization
const createAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  ...GITHUB_HEADERS,
});

// API Functions
export const createGist = async (
  gistData: CreateGistData,
  token: string | undefined
) => {
  try {
    const response = await axios.post(
      `${GITHUB_API_BASE_URL}/gists`,
      gistData,
      {
        headers: createAuthHeaders(token || ""),
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating gist");
  }
};

export const getPublicGists = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/gists/public`, {
      headers: GITHUB_HEADERS,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching public gists"
    );
  }
};

export const getUserGists = async (token: string | undefined) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/gists`, {
      headers: createAuthHeaders(token || ""),
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching user gists"
    );
  }
};

export const fetchGist = async (id: string): Promise<GistData> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/gists/${id}`);
    return response.data as GistData;
  } catch (error) {
    console.error("Failed to fetch gist data:", error);
    throw new Error("Failed to fetch gist data.");
  }
};

export const forkGist = async (gistId: string, token: string) => {
  try {
    const response = await axios.post(
      `${GITHUB_API_BASE_URL}/gists/${gistId}/forks`,
      {},
      {
        headers: createAuthHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error forking gist:", error);
    throw error;
  }
};

export const starGist = async (gistId: string, token: string) => {
  try {
    const response = await axios.put(
      `${GITHUB_API_BASE_URL}/gists/${gistId}/star`,
      {},
      {
        headers: createAuthHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error starring gist:", error);
    throw error;
  }
};

export const getStarredGists = async (accessToken: string) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/gists/starred`, {
      headers: createAuthHeaders(accessToken),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch starred gists:", error);
    throw new Error("Failed to fetch starred gists");
  }
};
