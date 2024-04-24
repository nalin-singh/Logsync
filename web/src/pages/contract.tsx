import { useSelector } from 'react-redux';
import { CommandDialogPrompt } from '../components/molecules/commandPrompt';
import { Upload } from '../components/molecules/upload';
import { contractColumnDef } from '../components/organisms/table/columnDefs/contractColumnDef';
import { DataTable } from '../components/organisms/table/data-table';
import { selectContracts } from '../redux/features/contractSlice';

export const Contract = () => {
    const contracts = useSelector(selectContracts);
    return (
        <div className='flex flex-col grow p-4 text-white'>
            <div className='flex items-center justify-between px-4 py-2'>
                <p className='text-2xl font-bold'>Contract</p>
            </div>
            <CommandDialogPrompt />
            <Upload />
            <DataTable data={contracts} columns={contractColumnDef} />
        </div>
    );
};
