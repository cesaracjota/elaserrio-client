import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import conceptoPagoSevice from "../../services/concepto_pago.service";

const initialState = {
    conceptos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new category

export const createConcepto = createAsyncThunk(
    "conceptos/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await conceptoPagoSevice.createConceptoPago(data, token);
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

// Get categories

export const getConceptos = createAsyncThunk(
    "conceptos/getConceptosPagos",
    async (_, thunkAPI) => {
        try {
            return await conceptoPagoSevice.getAllConceptosPago();
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

// Update category

export const updateConcepto = createAsyncThunk(
    "concepto/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await conceptoPagoSevice.updateConceptoPago(data, token);
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

// Delete category

export const deleteConcepto = createAsyncThunk(
    "concepto/deleteConcepto",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await conceptoPagoSevice.deleteConceptoPago(id, token);
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

export const conceptoSlice = createSlice({
    name: "conceptos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConceptos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getConceptos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.conceptos = action.payload;
            })
            .addCase(getConceptos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createConcepto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createConcepto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.conceptos.push(action.payload);
            })
            .addCase(createConcepto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteConcepto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteConcepto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.conceptos = state.conceptos.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteConcepto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateConcepto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateConcepto.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.conceptos = state.conceptos.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateConcepto.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = conceptoSlice.actions;
export default conceptoSlice.reducer;