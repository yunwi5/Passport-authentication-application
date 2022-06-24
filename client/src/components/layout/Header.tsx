import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../store/auth-context';
import UserNavItem from '../user/UserNavItem';
import './Header.scss';

const Header = () => {
    const { user, logout } = useAuthContext();
    const isLoggedIn = !!user;
    console.log('user:', user);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="header-container">
                <Navbar.Brand as={'div'}>
                    <Link to="/home">Passport Authentication</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item className="d-flex align-items-center">
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="d-flex align-items-center">
                            <Link className="nav-link" to="/secret">
                                Secret
                            </Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="mw-auto auth-nav">
                        {!isLoggedIn && (
                            <>
                                <Nav.Item className="d-flex align-items-center">
                                    <Link className="nav-link" to="/login">
                                        Log In
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="d-flex align-items-center">
                                    <Link className="nav-link" to="/register">
                                        Sign Up
                                    </Link>
                                </Nav.Item>
                            </>
                        )}
                        {isLoggedIn && <UserNavItem />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
