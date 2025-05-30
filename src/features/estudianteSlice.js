import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import estudianteService from "../services/estudiante.service";

const initialState = {
    estudiantes: [],
    estudiante: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const createEstudiante = createAsyncThunk(
    "estudiantes/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.createEstudiante(data, token);
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

export const getEstudiantes = createAsyncThunk(
    "estudiantes/get",
    async ({ page, perPage, id }, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await estudianteService.getAllEstudiantes(page, perPage, id, token);
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

export const getEstudiante = createAsyncThunk(
    "estudiante/get",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await estudianteService.getEstudiante(id, token);
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

export const getEstudianteByDni = createAsyncThunk(
    "estudiante/dni/get",
    async (dni, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.getEstudianteByDni(dni, token);
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

export const getEstudianteSearch = createAsyncThunk(
    "estudiante_ebr/search/get",
    async ({search, idSede}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            if (search && idSede) {
                return await estudianteService.getEstudianteSearch(search, idSede, token);
            }
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
);

export const getStudentsByGrade = createAsyncThunk(
    "estudiantes/get/grade",
    async (grade, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.getStudentsByGrade(grade, token);
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateEstudiante = createAsyncThunk(
    "estudiantes/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.updateEstudiante(data, token);
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

export const deleteEstudiante = createAsyncThunk(
    "estudiantes/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.deleteEstudiante(id, token);
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

export const estudianteSlice = createSlice({
    name: "estudiantes",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEstudiantes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEstudiantes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes = action.payload || [];
            })
            .addCase(getEstudiantes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEstudiante.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEstudiante.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiante = action.payload || {};
            })
            .addCase(getEstudiante.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getStudentsByGrade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudentsByGrade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes = action.payload || [];
            })
            .addCase(getStudentsByGrade.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEstudianteSearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEstudianteSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes = action.payload || [];
            })
            .addCase(getEstudianteSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createEstudiante.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createEstudiante.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes.push(action.payload);
            })
            .addCase(createEstudiante.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteEstudiante.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteEstudiante.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes = state.estudiantes.filter((student) => 
                    student._id !== action.payload._id);
            })
            .addCase(deleteEstudiante.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEstudiante.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEstudiante.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.estudiantes = state.estudiantes.map((student) => student._id === action.payload._id ? action.payload : student);
            })
            .addCase(updateEstudiante.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = estudianteSlice.actions;
export default estudianteSlice.reducer;