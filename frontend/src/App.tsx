import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import TravelMap from "./components/TravelMap/TravelMap";
import SideMenu from "./components/SideMenu";
import MobileMenu from "./components/MobileMenu";
import VisitedPlaces from "./components/VisitedPlaces/VisitedPlaces";
import AddEntry from "./components/AddEntry/AddEntry";
import Settings from "./components/Settings/Settings";

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
        <SideMenu />
        <MobileMenu />
        <Routes>
          <Route path="/" element={<TravelMap />} />
          <Route path="/places" element={<VisitedPlaces />} />
          <Route path="/add" element={<AddEntry />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </>
    );
  }
}

export default App;
