import React from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/molecules/sidebar';
import { Outlet } from 'react-router-dom';
import { selectIsDarkMode } from '../redux/features/themeSlice';
import { useSetup } from '../hooks/useSetup';
import { Notifications } from '../components/organisms/notifications';
import { Toaster } from 'sonner';

export const Application = () => {
    useSetup();

    const isDarkMode = useSelector(selectIsDarkMode);

    return (
        <main className={`flex flex-row min-h-screen w-full ${isDarkMode && 'dark'}`}>
            <Sidebar />
            <Toaster />
            <div className='flex flex-col grow min-h-screen overflow-hidden bg-background sm:pl-14'>
                <Outlet />
            </div>
            <Notifications />
        </main>
    );
};
