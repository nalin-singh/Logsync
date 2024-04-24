import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../data-table-column-header';
import moment from 'moment';
import { TContract } from '../../../../types';

export const contractColumnDef: ColumnDef<TContract>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Contract ID' />,
        cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('type')}</div>
    },
    {
        accessorKey: 'signedDate',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Signed Date' />,
        cell: ({ row }) => {
            const date = moment(row.getValue('signedDate')).format('Do MMM YY');
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>{date}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'validTill',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Valid Till' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('validTill')}</div>
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Customer' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('customer')}</div>
    },
    {
        accessorKey: 'seller',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Seller' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('seller')}</div>
    },
    {
        accessorKey: 'penaltyThreshold',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Penalty Threshold' />,
        cell: ({ row }) => <div className='w-[120px]'>{row.getValue('penaltyThreshold')}</div>
    },
    {
        accessorKey: 'shipmentAddress',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Shipment Address' />,
        cell: ({ row }) => <div className='w-[200px]'>{row.getValue('shipmentAddress')}</div>
    },
    {
        accessorKey: 'invoiceAddress',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Invoice Address' />,
        cell: ({ row }) => <div className='w-[200px]'>{row.getValue('invoiceAddress')}</div>
    }
];
