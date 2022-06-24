import React from 'react';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { User } from '../../models/User';
import { useAuthContext } from '../../store/auth-context';
import './UserNavItem.scss';

const UserNavItem: React.FC<{}> = () => {
    const { user, logout } = useAuthContext();

    if (!user) return <div />;

    return (
        <div className="user-nav me-3">
            <h5 className="user-nav-name">{user.name}</h5>
            {user.photo && <img className="user-picture" alt={user.name} src={user.photo} />}
            <NavDropdown title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="#" onClick={logout}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    );
};

export default UserNavItem;
