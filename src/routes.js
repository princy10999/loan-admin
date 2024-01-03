import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Lead from './pages/Lead';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Reminder from './pages/Reminder';
import DashboardApp from './pages/DashboardApp';
import AddLead from './pages/AddLead';
import AddUser from './pages/AddUser';
import SingleLead from './pages/SingleLead';
import SingleUser from './pages/SingleUser';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'lead', element: <Lead /> },
        { path: 'reminder', element: <Reminder /> },
        { path: 'user', element: <User /> },
        { path: 'add-lead', element: <AddLead /> },
        { path: 'add-user', element: <AddUser /> },
        { path: 'single-lead/:id/:isTrue', element: <SingleLead /> },
        { path: 'single-user/:id', element: <SingleUser /> },
        { path: 'add-lead/:id', element: <AddLead /> },
        { path: 'add-user/:id', element: <AddUser /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
