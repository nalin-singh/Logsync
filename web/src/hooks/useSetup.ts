import { useDispatch } from 'react-redux';
import JSONContracts from '../data/contracts.json';
import { contractsSchema } from '../types';
import { addContract } from '../redux/features/contractSlice';

export const useSetup = () => {
    // APIs to be called at the application load time
    console.log('Setup Hook Called!');
    const dispatch = useDispatch();

    // Fetch Contracts from the server
    const fetchContracts = async () => {
        const isValid = contractsSchema.parse(JSONContracts);
        if (!isValid) {
            throw new Error('Invalid JSON');
        }
        const contracts = JSONContracts;
        contracts.forEach((contract) => dispatch(addContract(contract)));
    };

    fetchContracts();
};
