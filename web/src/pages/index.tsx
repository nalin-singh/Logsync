import React from 'react';
import { Sidebar } from './sidebar';
import { Outlet } from 'react-router-dom';

export const Application = () => {
    return (
        <main className='flex flex-col min-h-screen w-full overflow-none'>
            <Sidebar />
            <Outlet />
        </main>
    );
};
