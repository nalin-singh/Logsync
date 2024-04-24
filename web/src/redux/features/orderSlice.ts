import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { orderSchema, TOrder, TOrders } from '../../types';

const initialState: TOrders = [];

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<TOrder>) => {
            const order = orderSchema.parse(action.payload);
            state.push(order);
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            return state.filter((order) => order.id !== idToDelete);
        }
    }
});

export const { addOrder, deleteOrder } = orderSlice.actions;

// Data Selecting Functions
export const selectOrders = (state: TRootState) => state.orders;

export default orderSlice.reducer;
