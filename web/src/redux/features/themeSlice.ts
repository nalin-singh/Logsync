import { createSlice } from '@reduxjs/toolkit';
import { TRootState } from '../store';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: localStorage.getItem('isDarkMode') === 'true' ? true : false
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', state.isDarkMode.toString());
        }
    }
});

export const { toggleTheme } = themeSlice.actions;

// Data Selecting Functions
export const selectIsDarkMode = (state: TRootState) => state.theme.isDarkMode;

export default themeSlice.reducer;
