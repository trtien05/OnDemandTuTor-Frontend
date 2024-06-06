import { useLocation } from 'react-router-dom';
import config from '../config';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/404/404';
import Home from '../pages/Home';
import Login from '../pages/Login';
import BecomeTutor from '../pages/BecomeTutor';
import Question from '../components/Popup/CreateQuestion';
import SearchTutors from '../pages/SearchTutors/SearchTutors';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    
    return <MainLayout />;
};


//* ==================== Define children routes: PUBLIC, CUSTOMER, NOT FOUND ==================== */
const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.public.registerTutor, element: <BecomeTutor /> },
        
        //
        { path: config.routes.public.searchTutors, element: <SearchTutors /> },

    ],
};


const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, notFoundRoutes],
};

export default MainRoutes;
