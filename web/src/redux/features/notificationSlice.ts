import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../store';
import { z } from 'zod';

export const PromptSchema = z.object({
    id: z.string(),
    role: z.string().nullable(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    content: z.string().nullable(),
    actions: z.array(z.any()).nullable()
});

export type TPrompt = z.infer<typeof PromptSchema>;

const initialState: TPrompt[] = [];

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addPrompt: (state, action: PayloadAction<TPrompt>) => {
            const newPrompt = PromptSchema.parse(action.payload);
            state.push(newPrompt);
        },
        deletePrompt: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload;
            return state.filter((prompt) => prompt.id !== idToDelete);
        }
    }
});

export const { addPrompt, deletePrompt } = notificationSlice.actions;

// Data Selecting Functions
export const selectPrompts = (state: TRootState) => state.notification;

export default notificationSlice.reducer;
