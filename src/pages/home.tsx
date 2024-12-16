import { useState } from "react";
import TaskList from "./task";
import ChatBox from "../component/ChatBox";

export default function () {
    const [activeComponent, setActiveComponent] = useState<string>("TaskList");

    const handleMenuClick = (label: string) => {
        setActiveComponent(label);
        console.log(`Clicked on menu item: ${label}`);
    };

    return (
        <div style={{ display: "flex" }}>
            <TaskList />
            <ChatBox />
        </div>
    );
}
