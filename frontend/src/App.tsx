import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { initializeAuth } from "@/redux/authSlice.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/routes/Root.tsx";
import Register from "@/routes/account/Register.tsx";
import Login from "@/routes/account/Login.tsx";
import TravelMap from "./components/TravelMap/TravelMap";
import VisitedPlaces from "./components/VisitedPlaces/VisitedPlaces";
import AddPlace from "./components/AddPlace/AddPlace";
import Settings from "./components/Settings/Settings";
import RootBoundary from "./components/RootBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <TravelMap />,
      },
      {
        path: "/places",
        element: <VisitedPlaces />,
      },
      {
        path: "/add",
        element: <AddPlace />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
    errorElement: <RootBoundary />,
  },
  {
    path: "/account/register",
    element: <Register />,
  },
  {
    path: "/account/login",
    element: <Login />,
  },
]);

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth()).then(() => {
      setInitialized(true);
    });
  }, []);

  if (authLoading) {
    return <p>Loading</p>;
  }

  return initialized && <RouterProvider router={router} />;
};

export default App;
