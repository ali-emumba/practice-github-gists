import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/gists";
const GITHUB_API_VERSION = "2022-11-28";

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

export const createGist = async (
  gistData: CreateGistData,
  token: string | undefined
) => {
  try {
    const response = await axios.post(GITHUB_API_URL, gistData, {
      headers: {
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating gist");
  }
};

const GITHUB_API_PUBLIC_URL = "https://api.github.com/gists/public";

export const getPublicGists = async () => {
  try {
    const response = await axios.get(GITHUB_API_PUBLIC_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
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
    const response = await axios.get("https://api.github.com/gists", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching user gists"
    );
  }
};

// Define the structure of the Gist owner
export interface GistOwner {
  login: string;
  avatar_url: string;
}

// Define the structure of a file within the Gist
export interface GistFile {
  filename: string;
  content: string;
}

// Define the structure of the entire Gist data
export interface GistData {
  owner: GistOwner;
  created_at: string;
  description: string;
  files: {
    [key: string]: GistFile;
  };
}

// Function to fetch a single gist data using the GitHub API
export const fetchGist = async (id: string): Promise<GistData> => {
  try {
    const response = await axios.get(`https://api.github.com/gists/${id}`);
    return response.data as GistData;
  } catch (error) {
    console.error("Failed to fetch gist data:", error);
    throw new Error("Failed to fetch gist data.");
  }
};

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

// export const fetchUserGists = async (
//   id: string | undefined
// ): Promise<UserGistData[]> => {
//   try {
//     const response = await axios.get(
//       `https://api.github.com/users/${id}/gists`
//     );
//     return response.data as UserGistData[];
//   } catch (error) {
//     console.error("Failed to fetch user gists:", error);
//     throw new Error("Failed to fetch user gists.");
//   }
// };

const GITHUB_API_BASE_URL = "https://api.github.com"; // GitHub API base URL

export const forkGist = async (gistId: string, token: string) => {
  try {
    const response = await axios.post(
      `${GITHUB_API_BASE_URL}/gists/${gistId}/forks`,
      {},
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
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
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error starring gist:", error);
    throw error;
  }
};
