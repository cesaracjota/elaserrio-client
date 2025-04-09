// rol slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rolService from "../services/rol.service";

const initialState = {
    roles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createRol = createAsyncThunk(
    "rol/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await rolService.createRol(data, token);
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

export const getRoles = createAsyncThunk(
    "roles/getRoles",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await rolService.getAllRoles(token);
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

export const updateRol = createAsyncThunk(
    "rol/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await rolService.updateRol(data, token);
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

export const deleteRol = createAsyncThunk(
    "roles/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await rolService.deleteRol(id, token);
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

export const rolSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.roles = action.payload;
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createRol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.roles.push(action.payload);
            })
            .addCase(createRol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteRol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.roles = state.roles.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteRol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateRol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.roles = state.roles.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateRol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = rolSlice.actions;
export default rolSlice.reducer;