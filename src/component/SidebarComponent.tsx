import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faHome, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import './css/SidebarComponent.css'
import logo from '../assets/logo.png';

interface SidebarProps {
    onMenuClick: (label: string) => void;
    activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeComponent }) => {
    const menuItems = [
        { id: 0, icon: <FontAwesomeIcon icon={faTasks} size="lg" />, label: 'TaskList' },
        { id: 2, icon: <FontAwesomeIcon icon={faHome} size="lg" />, label: 'Home' },
        { id: 3, icon: <FontAwesomeIcon icon={faCog} size="lg" />, label: 'Settings' },
        { id: 4, icon: <FontAwesomeIcon icon={faUser} size="lg" />, label: 'Profile' },
    ];

    return (
        <div className="sidebar">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={activeComponent === item.label ? 'box-icon active' : 'box-icon'}
                        onClick={() => onMenuClick(item.label)}
                    >
                        {item.icon}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
