import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reporteService from "../services/reporte.service";

const initialState = {
    reportes: [],
    reportesAdmin: [],
    reportesDocenteTitular: [],
    reportesDocente: [],
    reportesEBR: [],
    reportePagos: [],
    reporteVentasPorFechas: [],
    reporteVentasPorFechasPagos: [],
    ventasMes: [],
    ventasSemana: [],
    ventasDia: [],
    dataforGraph: [],
    reportesCEBA: [],
    reportesRESIDENCIA: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllReports = createAsyncThunk(
    "reportes/getAllReports",
    async (query, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getAllReports(token, query);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllReportesAdminBySede = createAsyncThunk(
    "reportes/getAllReportesAdminBySede",
    async (idSede, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getAllReportesAdminBySede(token, idSede);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllReportesDocenteTitularBySede = createAsyncThunk(
    "reportes/getAllReportesDocenteTitularBySede",
    async (idSede, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getAllReportesDocenteTitularBySede(token, idSede);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllReportesDocenteBySede = createAsyncThunk(
    "reportes/getAllReportesDocenteBySede",
    async (idSede, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getAllReportesDocenteBySede(token, idSede);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllReportesEBR = createAsyncThunk(
    "reportes/getAllReportesEBR",
    async (_, thunkAPI) => {
        try {

            return await reporteService.getAllReportesEBR();

        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllVentasBetweenDates = createAsyncThunk(
    "reportes/getAllVentasBetweenDates",
    async (data, thunkAPI) => {
        try {

            const desde = data?.desde;
            const hasta = data?.hasta;
            const token = thunkAPI.getState().auth.user.token;

            return await reporteService.getDataBetweenDates(desde, hasta, token);

        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getReportesEBR = createAsyncThunk(
    "reportes/getReportesEBR",
    async (_, thunkAPI) => {
        try {

            return await reporteService.getReportesEBR();

        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getReportesCEBA = createAsyncThunk(
    "reportes/CEBA",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getReportesCEBA(token);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getReportesRESIDENCIA = createAsyncThunk(
    "reportes/RESIDENCIA",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await reporteService.getReportesRESIDENCIA(token);
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const reportesSlice = createSlice({
    name: "reportes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllReports.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllReports.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportes = action.payload || [];
        });
        builder.addCase(getAllReports.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllReportesAdminBySede.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllReportesAdminBySede.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesAdmin = action.payload || [];
        });
        builder.addCase(getAllReportesAdminBySede.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllReportesDocenteTitularBySede.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllReportesDocenteTitularBySede.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesDocenteTitular = action.payload || [];
        });
        builder.addCase(getAllReportesDocenteTitularBySede.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllReportesDocenteBySede.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllReportesDocenteBySede.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesDocente = action.payload || [];
        });
        builder.addCase(getAllReportesDocenteBySede.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllReportesEBR.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllReportesEBR.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesEBR = action.payload;
        });
        builder.addCase(getAllReportesEBR.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllVentasBetweenDates.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllVentasBetweenDates.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reporteVentasPorFechas = action.payload;
            state.reporteVentasPorFechasPagos = action.payload.items;
        });
        builder.addCase(getAllVentasBetweenDates.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getReportesEBR.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getReportesEBR.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportePagos = action.payload.total;
            state.ventasMes = action.payload.ventasMes;
            state.ventasSemana = action.payload.ventasSemana;
            state.ventasDia = action.payload.ventasDia;
            state.dataforGraph = action.payload.dataforGraph;
        });
        builder.addCase(getReportesEBR.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getReportesCEBA.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getReportesCEBA.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesCEBA = action.payload;
        });
        builder.addCase(getReportesCEBA.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getReportesRESIDENCIA.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getReportesRESIDENCIA.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.reportesRESIDENCIA = action.payload;
        });
        builder.addCase(getReportesRESIDENCIA.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = reportesSlice.actions;

export default reportesSlice.reducer;
