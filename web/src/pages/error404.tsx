import { LayoutDashboard } from 'lucide-react';

export const Error404 = () => {
    return (
        <div className='flex min-h-screen flex-col gap-4 items-center justify-center'>
            <div className='flex flex-col gap-2 items-center text-center'>
                <p className='text-7xl font-extrabold'>404</p>
                <p className='text-lg'>
                    Whoops! Looks like you have have
                    <br />
                    been a victim of a 404 error.
                </p>
            </div>
            <a
                href='/'
                className='flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white'
            >
                <LayoutDashboard />
                <p>Back to Dashboard</p>
            </a>
        </div>
    );
};
