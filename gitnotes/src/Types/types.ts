export interface IUser {
    accessToken: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string ;
  }
  
  export interface IInitialState {
    isAuthenticated: boolean;
    user: IUser | null;
  }
  
  export interface IGistsdata {
    id: string;
    fileName?: string;
    ownerName: string;
    ownerImageUrl: string;
    gistName: string;
    createdAt: string;
    gitDescripton?: string;
    updatedAt?: string;
  }
  
  export interface IdataTableProps {
    data: IGistsdata[];
  }
  
  export interface IFile {
    fileName: string;
    content: string;
  }
  export interface IGistBody {
    files: IFile[];
    description: string;
  }
  
  interface IData {
    content: string;
  }
  export interface IFileData {
    [key: string]: IData;
  }
  
  export interface INavProps {
    setSearchText: (arg: string) => void;
  }
  
  export interface INavbarFormData {
    searchText: string;
  }