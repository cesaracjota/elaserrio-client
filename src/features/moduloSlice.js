import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moduloService from "../services/modulo.service";

const initialState = {
    modulos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createModulo = createAsyncThunk(
    "modulo/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await moduloService.create(data, token);
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

export const getAllModulos = createAsyncThunk(
    "modulos/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await moduloService.getAll(token);
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

export const updateModulo = createAsyncThunk(
    "modulo/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await moduloService.update(data, token);
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

export const deleteModulo = createAsyncThunk(
    "modulo/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await moduloService.deleteModulo(id, token);
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

export const moduloSlice = createSlice({
    name: "modulos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllModulos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllModulos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.modulos = action.payload;
            })
            .addCase(getAllModulos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createModulo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createModulo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.modulos.push(action.payload);
            })
            .addCase(createModulo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteModulo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteModulo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.modulos = state.modulos.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteModulo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateModulo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateModulo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.modulos = state.modulos.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateModulo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = moduloSlice.actions;
export default moduloSlice.reducer;