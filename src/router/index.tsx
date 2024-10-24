import { Navigate } from 'react-router-dom';
import Home from '@/pages/home';

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
