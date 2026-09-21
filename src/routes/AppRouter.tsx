import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Sign from '../pages/auth/Sign';
import NotFound from '../pages/NotFound';
import Home from "../pages/Home.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
