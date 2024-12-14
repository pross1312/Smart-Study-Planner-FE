import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import './css/SidebarComponent.css'

const Sidebar: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Sidebar menu items
    const menuItems = [
        { id: 0, icon: <FontAwesomeIcon icon={faTasks} size="lg" />, label: 'Tasks' },
        { id: 2, icon: <FontAwesomeIcon icon={faHome} size="lg" />, label: 'Home' },
        { id: 3, icon: <FontAwesomeIcon icon={faCog} size="lg" />, label: 'Settings' },
        { id: 4, icon: <FontAwesomeIcon icon={faUser} size="lg" />, label: 'Profile' },
    ];

    // Handle click action
    const handleMenuClick = (index: number) => {
        setActiveIndex(index);
        console.log(`Clicked on menu item: ${menuItems[index].label}`);
    };

    return (
        <div className="sidebar">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={item.id}
                        className={activeIndex === index ? 'box-icon active' : 'box-icon'}
                        onClick={() => handleMenuClick(index)}
                    >
                        {item.icon}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
