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
    <div className="max-w-screen-2xl min-h-screen flex flex-col relative left-1/2 -translate-x-1/2">
      <SideMenu />
      <MobileMenu />
      <Outlet />
    </div>
  );
}

export default Root;
