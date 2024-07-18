
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const provider = new GithubAuthProvider();
    provider.addScope("gist");
    const auth = getAuth();
   
export const LoginWithGithub = async () => {
      signInWithPopup(auth, provider)
      .then((result) => {
        // #( This gives you a GitHub Access Token. You can use it to access the GitHub API).
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (!token) return;
        console.log(token); // The signed-in user info.
        const user = result.user;
        console.log(user);
        //#( IdP data available using getAdditionalUserInfo(result)...)
      })
      .catch((error) => {
        console.log(error);
       //#( Handle Errors here.)
        const errorCode = error.code;
        const errorMessage = error.message;
        //#(The email of the user's account used.)
        const email = error.customData.email;
        //#( The AuthCredential type that was used.)
        const credential = GithubAuthProvider.credentialFromError(error);
        //#( ...)
      })
      .finally(() => {
        //#(do something)
      });
    }