import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
);
