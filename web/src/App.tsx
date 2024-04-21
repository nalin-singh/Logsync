import { createBrowserRouter } from 'react-router-dom';
import { Application } from './pages';
import { Error404 } from './pages/error404';
import { Dashboard } from './pages/dashboard';
import { Contract } from './pages/contract';

export const appRouter = createBrowserRouter([
    {
        path: '/',

        element: <Application />,
        errorElement: <Error404 />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/',
                element: <Contract />
            }
        ]
    }
]);
