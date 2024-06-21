import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { getPlaces } from "@/redux/placesSlice";
import { Navigate, Outlet } from "react-router-dom";
import SideMenu from "@/components/Menus/SideMenu";
import MobileMenu from "@/components/Menus/MobileMenu";

function Root() {
  const dispatch: AppDispatch = useDispatch();
  const user  = useSelector((state: RootState) => state.auth.user);
  const placesLoading = useSelector((state: RootState) => state.places.loading);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(getPlaces()).then(() => {
      setInitialized(true);
    });
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/account/login" />;
  }

  if (placesLoading) {
    return <p>Loading</p>;
  }

  return (
    initialized && (
      <div className="max-w-screen-2xl min-h-screen flex flex-col relative left-1/2 -translate-x-1/2">
        <SideMenu />
        <MobileMenu />
        <Outlet />
      </div>
    )
  );
}

export default Root;
