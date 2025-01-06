import { useState } from "react";
import Sidebar from "../component/SidebarComponent";
import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useFocus } from "../store/FocusContext";
import ChatBox from "../component/ChatBox";

export default function ({defaultActiveComponent}: {defaultActiveComponent: string}) {
    const [activeComponent, setActiveComponent] = useState<string>(defaultActiveComponent);

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
            <Sidebar
                onMenuClick={handleMenuClick}
                activeComponent={activeComponent}
            />
            <div className="flex-1 h-screen overflow-auto">
                <Outlet />
            </div>
            <ChatBox />
        </div>
    );
}
