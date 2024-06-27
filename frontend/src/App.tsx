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
import { Loader2Icon } from "lucide-react";
import Place from "./components/Place/Place";

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
      {
        path: "/place/:placeId",
        element: <Place />
      }
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
  const token = useSelector((state: RootState) => state.auth.token);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth()).then(() => {
      setInitialized(true);
    });
  }, []);

  console.log(token);

  if (authLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2Icon className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return initialized && <RouterProvider router={router} />;
};

export default App;
