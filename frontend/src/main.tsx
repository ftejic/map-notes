import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {ThemeProvider} from "@/context/ThemeProvider.tsx";
import VisitedPlaces from "@/components/VisitedPlaces/VisitedPlaces.tsx";
import AddEntry from "@/components/AddEntry/AddEntry.tsx";
import Settings from "@/components/Settings/Settings.tsx";
import Root from "@/routes/Root.tsx";
import TravelMap from "@/components/TravelMap/TravelMap.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
              index: true,
              element: <TravelMap />,
            },
            {
                path:"/places",
                element: <VisitedPlaces/>
            },
            {
                path: "/add",
                element: <AddEntry/>
            },
            {
                path: "/settings",
                element: <Settings/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="mapnotes-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);
