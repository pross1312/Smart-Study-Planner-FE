import { useState } from "react";
import Sidebar from "../component/SidebarComponent";
import Header from "../component/HeaderComponent";
import { Outlet } from "react-router-dom";

export default function () {
    const [activeComponent, setActiveComponent] = useState<string>("TaskList");

    const handleMenuClick = (label: string) => {
        setActiveComponent(label);
        console.log(`Clicked on menu item: ${label}`);
    };

    return (
        <div style={{ display: "flex" }}>
            <div>
                <Sidebar
                    onMenuClick={handleMenuClick}
                    activeComponent={activeComponent}
                />
            </div>
            <div style={{ flex: 1 }}>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}
