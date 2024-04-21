import { contractColumnDef } from '../components/organisms/table/columnDefs/contractColumnDef';
import { DataTable } from '../components/organisms/table/data-table';
import JSONContracts from '../data/contracts.json';
import { contractsSchema } from '../types';

export const Contract = () => {
    const isValid = contractsSchema.parse(JSONContracts);
    if (!isValid) {
        throw new Error('Invalid JSON');
    }
    const contracts = JSONContracts;
    return (
        <div className='flex flex-col grow p-4 text-white'>
            <div className='flex items-center justify-between px-4 py-2'>
                <p className='text-2xl font-bold'>Contract</p>
            </div>
            <DataTable data={contracts} columns={contractColumnDef} />
        </div>
    );
};
