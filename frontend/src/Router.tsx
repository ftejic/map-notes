import { createBrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";

const { isAuthenticated } = useAuth0();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },

  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);
