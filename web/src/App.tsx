import { createBrowserRouter } from 'react-router-dom';
import { Application } from './pages';
import { Error404 } from './pages/error404';
import { Dashboard } from './pages/dashboard';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Application />,
        errorElement: <Error404 />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
]);
