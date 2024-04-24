import { contractColumnDef } from '../components/organisms/table/columnDefs/contractColumnDef';
import { DataTable } from '../components/organisms/table/data-table';
import JSONContracts from '../data/contracts.json';
import { invoicesSchema } from '../types';

export const Invoice = () => {
    const isValid = invoicesSchema.parse(JSONContracts);
    if (!isValid) {
        throw new Error('Invalid JSON');
    }
    const invoices = JSONContracts;
    return (
        <div className='flex flex-col grow p-4 text-white'>
            <div className='flex items-center justify-between px-4 py-2'>
                <p className='text-2xl font-bold'>Invoices</p>
            </div>
            <DataTable data={invoices} columns={contractColumnDef} />
        </div>
    );
};
