import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { appRouter } from './App';
import { TooltipProvider } from './components/atoms/tooltip';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <TooltipProvider>
                <RouterProvider router={appRouter} />
            </TooltipProvider>
        </Provider>
    </React.StrictMode>
);
