import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '../../../atoms/checkbox';

import { DataTableColumnHeader } from '../data-table-column-header';
import { ContractDataTableRowActions } from '../rowActions/contractRowAction';
import { TInvoice } from '../../../../types';

export const invoiceColumnDef: ColumnDef<TInvoice>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Invoice ID' />,
        cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'orderId',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Order' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('orderId')}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'dueDate',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Due Date' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('dueDate')}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'dateOfPayment',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Payment Date' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('dateOfPayment')}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'paymentStatus',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Payment Status' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('paymentStatus')}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('customer')}
                    </span>
                </div>
            );
        }
    },

    {
        id: 'actions',
        cell: ({ row }) => <ContractDataTableRowActions row={row} />
    }
];
