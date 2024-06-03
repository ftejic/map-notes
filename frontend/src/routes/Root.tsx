import SideMenu from "@/components/Menus/SideMenu";
import MobileMenu from "@/components/Menus/MobileMenu";
import { Outlet } from "react-router-dom";

function Root() {
    return (
        <>
            <SideMenu/>
            <MobileMenu/>
            <Outlet />
        </>
    );

}

export default Root;