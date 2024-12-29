import { useState } from "react";
import Sidebar from "../component/SidebarComponent";
import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useFocus } from "../store/FocusContext";

export default function () {
    const [activeComponent, setActiveComponent] = useState<string>("TaskList");

    const handleMenuClick = (label: string) => {
        setActiveComponent(label);
        console.log(`Clicked on menu item: ${label}`);
    };

    const { isFocusing } = useFocus();

    return (
        <div
            className={twMerge(
                "flex min-h-screen max-h-screen",
                isFocusing ? "pointer-events-none" : ""
            )}
        >
            <div>
                <Sidebar
                    onMenuClick={handleMenuClick}
                    activeComponent={activeComponent}
                />
            </div>
            <div className="flex-1 h-screen overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}
