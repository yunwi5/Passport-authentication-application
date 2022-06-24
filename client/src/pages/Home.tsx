import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faInfo, faSignIn, faSignOut, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'react-bootstrap';
import { useAuthContext } from '../store/auth-context';

const Home = () => {
    const { user, loginBySession: login, logout } = useAuthContext();
    const isLoggedIn = !!user;

    useEffect(() => {
        if (!isLoggedIn) login();
    }, []);

    return (
        <main className="home-main">
            <Container className="m-auto my-auto p-3 flex-center home-container">
                <h1>
                    <FontAwesomeIcon icon={faNodeJs} className="icon-main" />
                </h1>
                <h3 className="mb-3">Create an account or login</h3>
                <p className="mb-3 home-paragraph">
                    <FontAwesomeIcon icon={faInfo} className="text-primary me-2" />
                    Support local authentication as well as various authentication providers
                    including Google, Facebook, GitHub and LinkedIn.
                </p>
                {!isLoggedIn && (
                    <>
                        <Button variant="primary" className="mb-2 home-btn">
                            <Link
                                to="/register"
                                className="d-flex justify-content-center align-items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faUserPlus} /> Register
                            </Link>
                        </Button>
                        <Button variant="secondary" className="mb-2 home-btn">
                            <Link
                                to="/login"
                                className="d-flex justify-content-center align-items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignIn} />
                                Login
                            </Link>
                        </Button>
                    </>
                )}
                {isLoggedIn && (
                    <Button variant="secondary" className="mb-2 home-btn" onClick={logout}>
                        <FontAwesomeIcon icon={faSignOut} /> Logout
                    </Button>
                )}
            </Container>
        </main>
    );
};

export default Home;
