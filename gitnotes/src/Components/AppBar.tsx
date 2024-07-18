import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, styled, TextField } from "@mui/material"
import AppBar from '@mui/material/AppBar';

const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#003B44',
    height: '70px',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 32px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.25)'
}))


const StyledLoginButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#003B44',
    fontSize: '12px',
    height: '40px',
    borderRadius: '4px',
    padding: '8px 32px',
    fontWeight: 'bold',
}))



import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from '../App';
import { useAppDispatch } from '../Store/hooks';
import { login, logout } from '../Store/slices/authUser';

 


const Navbar = () => {

    const dispatch = useAppDispatch();

    const provider = new GithubAuthProvider();
    provider.addScope("gist");
    const autho = getAuth();
   
    const LoginWithGithub = async () => {
      signInWithPopup(autho, provider)
      .then((result) => {
        // #( This gives you a GitHub Access Token. You can use it to access the GitHub API).
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (!token) return;
        console.log(token); // The signed-in user info.
        const user = result.user;
        console.log(user);
        dispatch(
            login({
                accessToken: token,
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
            })
        )
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
    };
   

    const handleLogout = () => {
        auth.signOut().then(() => {
            console.log('l o-ed')
            dispatch(logout())
        })
        .catch(e=>{
            console.log(e)
        })
    }


  return (
    <div>
      <StyledAppBar>
        <Box>
            Emumba
        </Box>
        <Box sx={{display: 'flex', gap: '40px', alignItems: 'center'}}>
        <TextField
        id="input-with-icon-textfield"
        placeholder='Search gists...'
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: 'white'}}/>
              </InputAdornment>
            ),
            style:{
                height: '40px',
                color: 'white',
                width: '300px',
                borderRadius: '4px',
                border: '1px solid white', 
            }
          }}
        variant="outlined"
      />
      <StyledLoginButton variant='contained' onClick={LoginWithGithub}>LogIn</StyledLoginButton>
        </Box>
        
        <button onClick={handleLogout}>logout</button>
      </StyledAppBar>
    </div>
  )
}

export default Navbar
