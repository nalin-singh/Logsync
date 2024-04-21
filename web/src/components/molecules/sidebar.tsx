import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, TooltipContent, TooltipTrigger } from '../atoms/tooltip';
import {
    LayoutDashboard,
    Moon,
    Package,
    Receipt,
    ReceiptText,
    Settings,
    Store,
    Sun
} from 'lucide-react';
import { selectIsDarkMode, toggleTheme } from '../../redux/features/themeSlice';

const NavigationItems = [
    {
        id: 'navigation-dashboard',
        name: 'Dashboard',
        href: '/',
        icon: LayoutDashboard
    },
    {
        id: 'navigation-products',
        name: 'Contracts',
        href: '/contracts',
        icon: ReceiptText
    },
    {
        id: 'navigation-customers',
        name: 'Orders',
        href: '/orders',
        icon: Package
    },
    {
        id: 'navigation-invoices',
        name: 'Invoices',
        href: '/invoices',
        icon: Receipt
    },
    {
        id: 'navigation-inventory',
        name: 'Inventory',
        href: '/inventory',
        icon: Store
    }
];

export const Sidebar = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectIsDarkMode);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <div className='flex flex-col shrink-0 min-h-screen overflow-hidden'>
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
                <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
                    {NavigationItems.map((item) => (
                        <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                                <a
                                    href={item.href}
                                    className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
                                >
                                    <item.icon className='h-4 w-4 transition-all group-hover:scale-110' />
                                    <span className='sr-only'>{item.name}</span>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side='right'>{item.name}</TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
                <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                                {isDarkMode ? (
                                    <Moon
                                        className='h-5 w-5 cursor-pointer'
                                        onClick={handleThemeToggle}
                                    />
                                ) : (
                                    <Sun
                                        className='h-5 w-5 cursor-pointer'
                                        onClick={handleThemeToggle}
                                    />
                                )}
                                <span className='sr-only'>Toggle Theme</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Toggle Theme</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href='#'
                                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                            >
                                <Settings className='h-5 w-5' />
                                <span className='sr-only'>Settings</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side='right'>Settings</TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
        </div>
    );
};
