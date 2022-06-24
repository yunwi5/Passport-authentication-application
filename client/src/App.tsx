import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/layout/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Secret } from './pages/Secret';
import { useAuthContext } from './store/auth-context';

function App() {
    const { user } = useAuthContext();
    const isLoggedIn = !!user;

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                {!isLoggedIn && (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </>
                )}
                <Route
                    path="/secret"
                    element={isLoggedIn ? <Secret /> : <Navigate to="/home" />}
                />
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
