import React from 'react';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt='Logo' />
    </div>
  );
};

export default Navbar;
