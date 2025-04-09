import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import egresoService from "../services/egreso.service";

const initialState = {
    egresos: [],
    egreso: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const getAllEgresos = createAsyncThunk(
    "egresos/getAll",
    async ({ page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await egresoService.getAllEgresos(token, desde, hasta);
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

export const getEgreso = createAsyncThunk(
    "egreso/get",
    async (id, thunkAPI) => {
        try {
            return await egresoService.getEgreso(id);
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

export const createEgreso = createAsyncThunk(
    "egreso/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await egresoService.createEgreso(data, token);
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

export const updateEgreso = createAsyncThunk(
    "egresos/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await egresoService.updateEgreso(data, token);
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

export const updateEstadoEgreso = createAsyncThunk(
    "egresos/updateEstadoEgreso",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await egresoService.updateEstadoEgreso(data, token);
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

export const deleteEgreso = createAsyncThunk(
    "egreso/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await egresoService.deleteEgreso(id, token);
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

export const egresoSlice = createSlice({
    name: "egresos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEgresos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllEgresos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egresos = action.payload.egresos;
                state.totalRows = action.payload.total
            })
            .addCase(getAllEgresos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEgreso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEgreso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egreso = action.payload;
            })
            .addCase(getEgreso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createEgreso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEgreso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egresos.push(action.payload);
            })
            .addCase(createEgreso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEgreso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEgreso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egresos = state.egresos.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updateEgreso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEstadoEgreso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEstadoEgreso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egresos = state.egresos.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updateEstadoEgreso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteEgreso.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEgreso.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.egresos = state.egresos.filter((pay) => 
                    pay._id !== action.payload._id);
            })
            .addCase(deleteEgreso.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = egresoSlice.actions;
export default egresoSlice.reducer;