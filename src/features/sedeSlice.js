import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sedeService from "../services/sede.service";

const initialState = {
    sedes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createSede = createAsyncThunk(
    "sede/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await sedeService.create(data, token);
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

export const getAllSedes = createAsyncThunk(
    "sede/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await sedeService.getAll(token);
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

export const updateSede = createAsyncThunk(
    "sede/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await sedeService.update(data, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteSede = createAsyncThunk(
    "sede/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await sedeService.deleteSede(id, token);
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

export const sedeSlice = createSlice({
    name: "sedes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSedes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSedes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sedes = action.payload || [];
            })
            .addCase(getAllSedes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createSede.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSede.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sedes?.push(action.payload);
            })
            .addCase(createSede.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteSede.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSede.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sedes = state.sedes.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteSede.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateSede.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSede.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sedes = state.sedes.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateSede.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = sedeSlice.actions;
export default sedeSlice.reducer;