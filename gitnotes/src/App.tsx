import Navbar from "./Components/AppBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Provider } from "react-redux";
import store from "./Store/store";
import GistPage from "./Pages/GistPage";
import ProtectedRoute from "./ProtectedRoutes";
import AddGist from "./Pages/AddGist";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuPF6j0af_kFJxD-9lfZdTGnoCZxdoPOU",
  authDomain: "github-gists.firebaseapp.com",
  projectId: "github-gists",
  storageBucket: "github-gists.appspot.com",
  messagingSenderId: "1022069459827",
  appId: "1:1022069459827:web:73fe33336620da41895306",
  measurementId: "G-PQY3DQMEF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const analytics = getAnalytics(app);
console.log(app);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gist/:id" element={<GistPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/addGist" element={<AddGist />} />{" "}
            {/* Protected route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
export { auth };
