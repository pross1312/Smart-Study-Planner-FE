import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Replace with your logo path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <Navbar expand="lg" className='header' style={{ height: '76px' }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-between ml-auto align-items-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                        <div className="search-box d-flex align-items-center">
                            <div className="search-box d-flex align-items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control"
                                />
                                <button className="btn btn-outline-secondary ml-2">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
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
            </Container>
        </Navbar>
    );
};

export default Header;
