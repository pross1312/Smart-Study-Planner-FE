import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <Navbar expand="lg" className='header' style={{ height: '76px', paddingTop: '20px', width: '100%' }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto justify-content-between w-100 align-items-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <div></div>
                    <Nav className='align-items-center'>
                        <Nav>
                            <FontAwesomeIcon size="xl" icon={faBell} />
                        </Nav>
                        <Nav.Link href="/profile" className="d-flex ml-2 align-items-center" style={{ marginLeft: '10px' }}>
                            <FontAwesomeIcon size="2x" icon={faUserCircle} className="ml-2"/>
                        </Nav.Link>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
