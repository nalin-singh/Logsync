import { useSelector } from 'react-redux';
import { orderColumnDef } from '../components/organisms/table/columnDefs/orderColumnDef';
import { DataTable } from '../components/organisms/table/data-table';
import { selectOrders } from '../redux/features/orderSlice';

export const Order = () => {
    const orders = useSelector(selectOrders);
    return (
        <div className='flex flex-col grow p-4 text-white'>
            <div className='flex items-center justify-between px-4 py-2'>
                <p className='text-2xl font-bold'>Orders</p>
            </div>
            <DataTable data={orders} columns={orderColumnDef} />
        </div>
    );
};
