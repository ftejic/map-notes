import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store.ts";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "@/routes/Root.tsx";
import TravelMap from "@/components/TravelMap/TravelMap.tsx";
import VisitedPlaces from "@/components/VisitedPlaces/VisitedPlaces.tsx";
import AddEntry from "@/components/AddEntry/AddEntry.tsx";
import Settings from "@/components/Settings/Settings.tsx";
import RootBoundary from "@/components/RootBoundary.tsx";
import Register from "@/routes/account/Register.tsx";
import Login from "@/routes/account/Login.tsx";
import {initializeAuth} from "@/redux/authSlice.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <TravelMap/>,
            },
            {
                path: "/places",
                element: <VisitedPlaces/>
            },
            {
                path: "/add",
                element: <AddEntry/>
            },
            {
                path: "/settings",
                element: <Settings/>
            },
        ],
        errorElement: <RootBoundary/>
    },
    {
        path: "/account/register",
        element: <Register/>
    },
    {
        path: "/account/login",
        element: <Login/>
    }
]);

const App = () => {
    const dispatch: AppDispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        dispatch(initializeAuth()).then(() => {
            setInitialized(true);
        });
    }, [dispatch]);

    if (loading) {
        return <p>Loading</p>;
    }

    return (
        initialized && <RouterProvider router={router}/>
    );

};
export default App;