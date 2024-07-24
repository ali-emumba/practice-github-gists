export interface IUser {
    accessToken: string;
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
    uid: string ;
  }
  
  export interface IInitialState {
    isAuthenticated: boolean;
    user: IUser | null;
  }
  
