import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../../../atoms/checkbox';
import { DataTableColumnHeader } from '../data-table-column-header';
import moment from 'moment';
import { TOrder } from '../../../../types';

export const orderColumnDef: ColumnDef<TOrder>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title='Order ID' />,
        cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Customer' />,
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
        accessorKey: 'contact.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Contact Name' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('contact.name')}</div>
    },
    {
        accessorKey: 'contact.email',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Contact Email' />,
        cell: ({ row }) => <div className='w-[200px]'>{row.getValue('contact.email')}</div>
    },
    {
        accessorKey: 'contact.phone',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Contact Phone' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('contact.phone')}</div>
    },
    {
        accessorKey: 'uniqueSKUCount',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Unique SKU Count' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('uniqueSKUCount')}</div>
    },
    {
        accessorKey: 'orderValue',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Order Value' />,
        cell: ({ row }) => <div className='w-[100px]'>{row.getValue('orderValue')}</div>
    },
    {
        accessorKey: 'estimatedDeliveryDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Estimated Delivery Date' />
        ),
        cell: ({ row }) => {
            const date = moment(row.getValue('estimatedDeliveryDate')).format('Do MMM YY');
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{date}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'deliveryPremium',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Delivery Premium' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('deliveryPremium')}</div>
    },
    {
        accessorKey: 'amountManufactured',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Amount Manufactured' />
        ),
        cell: ({ row }) => <div className='w-[150px]'>{row.getValue('amountManufactured')}</div>
    }
];
