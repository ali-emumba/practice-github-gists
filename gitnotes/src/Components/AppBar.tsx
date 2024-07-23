import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  styled,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../App";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { login, logout } from "../Store/slices/authUser";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const logo = (
  <>
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.2467 19.0288V3.64663H18.6311V12.8755H9.40003V9.79996H15.5534V6.72218H6.32448V15.9533H21.7089V0.568848H0.171143V22.5511H21.7089V19.0288H3.2467Z"
        fill="white"
      />
    </svg>
    <svg
      width="14"
      height="23"
      viewBox="0 0 14 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3222 22.4445H0.111084V0.666748H13.32V3.67564H3.66664V9.60453H12.7778V12.5845H3.66664V19.4201H13.3155L13.3222 22.4445Z"
        fill="white"
      />
    </svg>
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8888 18.1555L4.91773 0.611084H0.308838V22.5511H3.60662V9.64886C3.60662 9.14219 3.59328 8.35108 3.56217 7.27331C3.55106 6.72664 3.53773 6.25108 3.52884 5.84664L9.23773 22.5511H12.4911L18.1444 5.85108C18.1444 6.41108 18.137 6.95108 18.1222 7.47108C18.1014 8.48442 18.0918 9.21034 18.0933 9.64886V22.5511H21.3911V0.611084H16.8111L10.8888 18.1555Z"
        fill="white"
      />
    </svg>
    <svg
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.371 14.1089C14.371 15.6066 14.1488 16.8044 13.6821 17.6644C12.831 19.2689 11.2555 20.0466 8.8599 20.0466C6.8799 20.0466 5.51324 19.3289 4.68213 17.8489C4.11991 16.8644 3.83546 15.6022 3.83546 14.1V0.611084H0.377686V12.9C0.377686 15.5666 0.746573 17.6466 1.47324 19.0977C2.80657 21.7644 5.37768 23.12 9.09546 23.12C12.8132 23.12 15.3843 21.7666 16.7332 19.0977C17.4599 17.6466 17.831 15.5622 17.831 12.9V0.611084H14.371V14.1089Z"
        fill="white"
      />
    </svg>
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3934 18.1555L5.42676 0.611084H0.817871V22.5511H4.11565V9.64886C4.11565 9.14219 4.10009 8.35108 4.07343 7.27331C4.05565 6.72664 4.04676 6.25108 4.04009 5.84664L9.74676 22.5511H13.0001L18.6534 5.85108C18.6534 6.41108 18.646 6.95108 18.6312 7.47108C18.6134 8.48442 18.6023 9.21108 18.6023 9.64886V22.5511H21.9001V0.611084H17.3201L11.3934 18.1555Z"
        fill="white"
      />
    </svg>
    <svg
      width="19"
      height="23"
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4756 10.7222C14.9614 10.4439 15.4014 10.0924 15.7801 9.67997C16.5867 8.76886 16.9978 7.59108 16.9978 6.17997C17.0153 5.03138 16.6692 3.90667 16.0089 2.96664C14.8978 1.41108 13.0112 0.611084 10.4089 0.611084H0.886719V22.5511H10.2578C13.1667 22.5511 15.3245 21.6622 16.6712 19.9422C17.5561 18.832 18.0359 17.4531 18.0312 16.0333C18.0312 14.3244 17.5178 12.9622 16.5067 11.98C15.9089 11.4445 15.2214 11.0187 14.4756 10.7222ZM13.9356 18.1066C13.2245 19.0622 12.0045 19.5444 10.3067 19.5444H4.25783V12.5377H9.81338C11 12.5377 11.9645 12.6844 12.6734 12.9822C13.9801 13.5066 14.6134 14.4644 14.6134 15.9133C14.6363 16.701 14.4023 17.4747 13.9467 18.1177M12.1067 9.19108C11.4578 9.51108 10.5267 9.6733 9.33561 9.6733H4.26895V3.55553H9.22228C10.4578 3.55553 11.3934 3.68664 12.0045 3.94442C13.0578 4.38886 13.5601 5.23331 13.5601 6.52886C13.5601 7.82442 13.0756 8.68664 12.0867 9.17775"
        fill="white"
      />
    </svg>
    <svg
      width="21"
      height="23"
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7023 0.611084H9.06007L0.797852 22.5511H4.33785L6.66673 16.1377H14.6934L16.929 22.5511H20.6667L12.7023 0.611084ZM13.6801 13.2489H7.70673L10.7512 4.83997L13.6801 13.2489Z"
        fill="white"
      />
    </svg>
  </>
);

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#003B44",
  height: "7vh",
  display: "flex",
  flexDirection: "row",
  padding: "0 32px",
  alignItems: "center",
  justifyContent: "space-between",
  color: "white",
  boxShadow: "rgba(0, 0, 0, 0.25)",
  position: "relative",
}));

const StyledLoginButton = styled(Button)(() => ({
  backgroundColor: "white",
  color: "#003B44",
  fontSize: "12px",
  height: "40px",
  borderRadius: "4px",
  padding: "8px 32px",
  fontWeight: "bold",
}));

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const provider = new GithubAuthProvider();
  provider.addScope("gist");
  const autho = getAuth();

  const LoginWithGithub = async () => {
    signInWithPopup(autho, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        if (!token) return;
        console.log(token);
        const user = result.user;
        console.log(user);
        toast.success("logged in successfully");
        dispatch(
          login({
            accessToken: token,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        toast.error("error loging in -- ", errorMessage);
      })
      .finally(() => {
        // do something
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logged out");
        toast.success("logged out successfully");
        dispatch(logout());
      })
      .catch((e) => {
        toast.error("error logging out");
        console.log(e);
      });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGistsClicked = () => {
    navigate("/addGist");
  };

  const handleYourGistsClicked = () => {
    navigate("/userGists");
  };

  const handleStarredGistsClicked = () => {
    navigate("/starredGists");
  };

  const handleSearch = () => {
    let sq = searchQuery;
    setSearchQuery("");
    navigate(`/gist/${sq}`); // Navigate to the search result page
  };

  const handleYourGithubProfileClick = () => {
    window.open(`https://github.com/`);
  };

  return (
    <StyledAppBar>
      <Link to={"/"}>
        <Box sx={{ display: "flex", gap: "4px" }}>{logo}</Box>
      </Link>
      <Box sx={{ display: "flex", gap: "40px", alignItems: "center" }}>
        {!isMobile && (
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search gists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Perform search on Enter key press
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "white", cursor: "pointer" }}
                    onClick={handleSearch} // Perform search on click
                  />
                </InputAdornment>
              ),
              style: {
                height: "40px",
                color: "white",
                width: "300px",
                borderRadius: "4px",
                border: "1px solid white",
              },
            }}
            variant="outlined"
          />
        )}
        {user ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <Avatar src={user.photoURL!} alt="User" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "8px",
                }}
                onClick={handleMenuClose}
              >
                <Typography variant="body2">Signed in as</Typography>
                <Typography>
                  {user.displayName ? user.displayName : user.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleYourGistsClicked();
                  handleMenuClose();
                }}
              >
                Your gists
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCreateGistsClicked();
                  handleMenuClose();
                }}
              >
                Create gists
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleStarredGistsClicked();
                }}
              >
                Starred gists
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleYourGithubProfileClick();
                  handleMenuClose();
                }}
              >
                Your Github profile
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleMenuClose}>Help</MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <StyledLoginButton variant="contained" onClick={LoginWithGithub}>
            Log In
          </StyledLoginButton>
        )}
      </Box>
    </StyledAppBar>
  );
};

export default Navbar;
