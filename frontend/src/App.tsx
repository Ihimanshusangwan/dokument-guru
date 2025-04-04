// App.tsx
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import {SignIn} from './pages/SignIn';
import {SignUp} from './pages/SignUp';
import {useState} from 'react';
import {useAppConfig} from './hooks/useAppConfig';
import ErrorNotification from "./components/common/ErrorNotification.tsx";

function AppRoutes() {
    const [error, setError] = useState<{ message: string; redirectUrl?: string } | null>(null);
    const navigate = useNavigate();

    const showError = (msg: string, redirectUrl?: string) => {
        setError({message: msg, redirectUrl});
    };

    const handleModalClose = () => {
        if (error?.redirectUrl) {
            navigate(error.redirectUrl);
        }
        setError(null);
    };

    useAppConfig({showError});

    return (
        <>
            <ErrorNotification visible={!!error} message={error?.message || ''} onClose={handleModalClose}/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppRoutes/>
        </Router>
    );
}

export default App;
