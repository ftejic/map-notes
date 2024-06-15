import SideMenu from "@/components/Menus/SideMenu";
import MobileMenu from "@/components/Menus/MobileMenu";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

function Root() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/account/login" />;
  }

  return (
    <>
      <SideMenu />
      <MobileMenu />
      <Outlet />
    </>
  );
}

export default Root;
