import "./css/SidebarComponent.css";
import logo from "../assets/logo.png";
import { PATH } from "../router/path";
import { Link } from "react-router-dom";
import Home from "@/assets/images/home.svg";
import Calendar from "@/assets/images/calendar.svg";
import Goal from "@/assets/images/goal.svg";
import User from "@/assets/images/user.svg";
import Plus from "@/assets/images/plus.svg";
import VideoRoom from "@/assets/images/video-room.svg";

interface SidebarProps {
    onMenuClick: (label: string) => void;
    activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeComponent }) => {
    const menuItems = [
        { id: 0, icon: Home, label: "Home", link: PATH.HOME, title: "Home" },
        {
            id: 1,
            icon: Plus,
            label: "TaskList",
            link: PATH.TASKS,
            title: "Task List",
        },
        {
            id: 2,
            icon: Calendar,
            label: "Calendar",
            link: PATH.CALENDAR,
            title: "Calendar",
        },
        {
            id: 5,
            icon: Goal,
            label: "Focus",
            link: PATH.POMODORO,
            title: "Focus",
        },
        {
            id: 4,
            icon: User,
            label: "Profile",
            link: PATH.PROFILE,
            title: "Profile",
        },
        {
            id: 6,
            icon: VideoRoom,
            label: "Room",
            link: PATH.FOCUS_ROOM,
            title: "Room",
        },
    ];

    return (
        <div className="sidebar">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="sidebar-menu flex flex-col gap-3">
                {menuItems.map((item) => (
                    <Link
                        to={item.link ? item.link : "#"}
                        key={item.id}
                        className={
                            activeComponent === item.label
                                ? "box-icon active"
                                : "box-icon"
                        }
                        onClick={() => onMenuClick(item.label)}
                    >
                        {typeof item.icon === "string" ? (
                            <img src={item.icon} alt="" />
                        ) : (
                            item.icon
                        )}
                        <span className="text-gray-300 sideBar__title">{item.title}</span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
