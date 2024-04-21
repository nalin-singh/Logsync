import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Bell } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from './breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './dropdown-menu';

export const Header: React.FC = () => {
    const location = useLocation();
    const paths = location.pathname.split('/');
    const searchParams = useSearchParams(location.search);
    console.log(location, searchParams);
    return (
        <div className='flex flex-row gap-4 grow items-center justify-between'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/' className='capitalize'>
                            {paths[1]}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-1'>
                                <BreadcrumbEllipsis className='h-4 w-4' />
                                <span className='sr-only'>Toggle Breadcrumbs</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='start'>
                                <DropdownMenuItem>Documentation</DropdownMenuItem>
                                <DropdownMenuItem>Themes</DropdownMenuItem>
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/docs/components'>Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'>
                        <Bell className='h-5 w-5' />
                        <span className='sr-only'>Notifications</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side='right'>Notifications</TooltipContent>
            </Tooltip>
        </div>
    );
};
