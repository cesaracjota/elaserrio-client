import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notaService from "../services/nota.service";

const initialState = {
    notas: [],
    notasByMateria: [],
    notasByStudent: [],
    nota: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createCalificacion = createAsyncThunk(
    "calificacion/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.create(data, token);
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

export const getAllCalificaciones = createAsyncThunk(
    "calificacion/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.getAll(token);
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

export const getAllNotasByMateria = createAsyncThunk(
    "notas/getAllByMateria",
    async (materiaId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.getAllNotasByMateria(materiaId, token);
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

export const getNotasByMatriculaAndMateria = createAsyncThunk(
    "notas/getByMatricula",
    async ({matriculaId, materiaId}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.obtenerNotasPorMatriculaAndMateria(matriculaId, materiaId, token);
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

export const getAllNotasByStudent = createAsyncThunk(
    "notas/getAllByStudent",
    async (matriculaId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.getAllNotasByStudent(matriculaId, token);
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


export const updateCalificacion = createAsyncThunk(
    "calificacion/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.update(data, token);
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

export const deleteCalificacion = createAsyncThunk(
    "calificacion/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notaService.deleteCalificacion(id, token);
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

export const calificacionSlice = createSlice({
    name: "calificaciones",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCalificaciones.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCalificaciones.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notas = action.payload;
            })
            .addCase(getAllCalificaciones.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getNotasByMatriculaAndMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotasByMatriculaAndMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.nota = action.payload;
            })
            .addCase(getNotasByMatriculaAndMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllNotasByMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotasByMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notasByMateria = action.payload;
            })
            .addCase(getAllNotasByMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllNotasByStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotasByStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notasByStudent = action.payload;
            })
            .addCase(getAllNotasByStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCalificacion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCalificacion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notas.push(action.payload);
            })
            .addCase(createCalificacion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCalificacion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCalificacion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notas = state.notas.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteCalificacion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCalificacion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCalificacion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notas = state.notas.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateCalificacion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = calificacionSlice.actions;
export default calificacionSlice.reducer;