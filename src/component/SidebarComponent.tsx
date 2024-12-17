import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faHome, faCog, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import './css/SidebarComponent.css'
import logo from '../assets/logo.png';
import { PATH } from '../router/path';
import { Link } from 'react-router-dom';

interface SidebarProps {
    onMenuClick: (label: string) => void;
    activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeComponent }) => {
    const menuItems = [
        { id: 2, icon: <FontAwesomeIcon icon={faHome} size="lg" />, label: 'Home', link: PATH.HOME },
        { id: 0, icon: <FontAwesomeIcon icon={faTasks} size="lg" />, label: 'TaskList', link: PATH.TASKS },
        { id: 5, icon: <FontAwesomeIcon icon={faCalendar} size="lg" />, label: 'Calendar', link: PATH.CALENDAR },
        { id: 3, icon: <FontAwesomeIcon icon={faCog} size="lg" />, label: 'Settings', link: PATH.IFEATUREPAGE },
        { id: 4, icon: <FontAwesomeIcon icon={faUser} size="lg" />, label: 'Profile', link: PATH.IFEATUREPAGE },
    ];

    return (
        <div className="sidebar">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <Link
                        to={item.link ? item.link : '#'}
                        key={item.id}
                        className={activeComponent === item.label ? 'box-icon active' : 'box-icon'}
                        onClick={() => onMenuClick(item.label)}
                    >
                        {item.icon}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
