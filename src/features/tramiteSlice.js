import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tramiteService from "../services/tramite.service";

const initialState = {
    tramites: [],
    tramite: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const getAllTramites = createAsyncThunk(
    "tramites/getAll",
    async ({ page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await tramiteService.getAllTramites(token, desde, hasta);
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

export const getTramite = createAsyncThunk(
    "tramite/get",
    async (id, thunkAPI) => {
        try {
            return await tramiteService.getEgreso(id);
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

export const createTramite = createAsyncThunk(
    "tramite/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tramiteService.createTramite(data, token);
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

export const updateTramite= createAsyncThunk(
    "tramites/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tramiteService.updateTramite(data, token);
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

export const updateEstadoTramite = createAsyncThunk(
    "tramites/updateEstadoTramite",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tramiteService.updateEstadoTramite(data, token);
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

export const deleteTramite = createAsyncThunk(
    "tramite/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tramiteService.deleteTramite(id, token);
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

export const tramiteSlice = createSlice({
    name: "tramites",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTramites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTramites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramites = action.payload.tramites;
                state.totalRows = action.payload.total
            })
            .addCase(getAllTramites.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTramite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTramite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramite = action.payload;
            })
            .addCase(getTramite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTramite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTramite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramites.push(action.payload);
            })
            .addCase(createTramite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTramite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTramite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramites = state.tramites.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updateTramite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEstadoTramite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEstadoTramite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramites = state.tramites.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updateEstadoTramite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTramite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTramite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tramites = state.tramites.filter((pay) => 
                    pay._id !== action.payload._id);
            })
            .addCase(deleteTramite.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = tramiteSlice.actions;
export default tramiteSlice.reducer;