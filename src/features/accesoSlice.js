import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accesoService from "../services/acceso.service";

const initialState = {
    accesos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllAccesos = createAsyncThunk(
    "acceso/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await accesoService.getAllAccesos(token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteAcceso = createAsyncThunk(
    "acceso/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await accesoService.deleteAcceso(id, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const accesoSlice = createSlice({
    name: "accesos",
    initialState,
    reducers: {
        resetAccesos : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAccesos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAccesos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accesos = action.payload;
            })
            .addCase(deleteAcceso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAcceso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accesos = state.accesos.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteAcceso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { resetAccesos } = accesoSlice.actions;
export default accesoSlice.reducer;