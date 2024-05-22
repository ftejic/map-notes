import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<p>Gas</p>} />
        </Routes>
      </>
    );
  }
}

export default App;
