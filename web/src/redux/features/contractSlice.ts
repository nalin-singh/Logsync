import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { contractSchema, TContract, TContracts } from '../../types';

const initialState: TContracts = [];

const contractSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        addContract: (state, action: PayloadAction<TContract>) => {
            const contract = contractSchema.parse(action.payload);
            state.push(contract);
        },
        deleteContract: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            return state.filter((contract) => contract.id !== Number(idToDelete));
        }
    }
});

export const { addContract, deleteContract } = contractSlice.actions;

// Data Selecting Functions
export const selectContracts = (state: TRootState) => state.contracts;

export default contractSlice.reducer;
