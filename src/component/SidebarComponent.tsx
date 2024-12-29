import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faHome, faCog, faUser, faCalendar, faPen } from '@fortawesome/free-solid-svg-icons';
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
        { id: 0, icon: <FontAwesomeIcon icon={faHome} size="lg" color='white'/>, label: 'Home', link: PATH.HOME, title: 'Home' },
        { id: 1, icon: <FontAwesomeIcon icon={faTasks} size="lg" color='white' />, label: 'TaskList', link: PATH.TASKS, title: 'Task List' },
        { id: 2, icon: <FontAwesomeIcon icon={faCalendar} size="lg" color='white'/>, label: 'Calendar', link: PATH.CALENDAR, title: 'Calendar' },
        { id: 3, icon: <FontAwesomeIcon icon={faCog} size="lg" color='white'/>, label: 'Settings', link: PATH.IFEATUREPAGE, title: 'Settings' },
        { id: 4, icon: <FontAwesomeIcon icon={faUser} size="lg" color='white'/>, label: 'Profile', link: PATH.IFEATUREPAGE, title: 'Profile' },
        { id: 5, icon: <FontAwesomeIcon icon={faPen} size="lg" color='white'/>, label: 'Focus', link: PATH.POMODORO, title: 'Focus' },
    ];

    return (
        <div className="sidebar">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="sidebar-menu flex flex-col gap-3">
                {menuItems.map((item) => (
                    <Link
                        to={item.link ? item.link : '#'}
                        key={item.id}
                        className={activeComponent === item.label ? 'box-icon active' : 'box-icon'}
                        onClick={() => onMenuClick(item.label)}
                    >
                        <span>{item.icon}</span>
                        <span className='text-white'>{item.title}</span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
