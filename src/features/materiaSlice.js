import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import materiaService from "../services/materia.service";

const initialState = {
    materias: [],    
    materiasByTeacher: [],
    materia: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createMateria = createAsyncThunk(
    "materia/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await materiaService.create(data, token);
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

export const getAllMaterias = createAsyncThunk(
    "materias/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await materiaService.getAll(token);
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

export const getMateria = createAsyncThunk(
    "materia/get",
    async (id, thunkAPI) => {
        try {
            return await materiaService.get(id);
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

export const getMateriasBySede = createAsyncThunk(
    "materia/getMateriasBySede",
    async (id, thunkAPI) => {
        try {
            return await materiaService.getMateriasBySede(id);
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

export const getMateriasByTeacher = createAsyncThunk(
    "materia/getMateriasByTeacher",
    async (id, thunkAPI) => {
        try {
            return await materiaService.getMateriasByTeacher(id);
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

export const updateMateria = createAsyncThunk(
    "materia/update",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await materiaService.update(data, token);
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

export const deleteMateria = createAsyncThunk(
    "materia/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await materiaService.deleteMateria(id, token);
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

export const materiaSlice = createSlice({
    name: "materias",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMaterias.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMaterias.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materias = action.payload;
            })
            .addCase(getAllMaterias.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materia = action.payload;
            })
            .addCase(getMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMateriasBySede.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMateriasBySede.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materias = action.payload;
            })
            .addCase(getMateriasBySede.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMateriasByTeacher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMateriasByTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materiasByTeacher = action.payload;
            })
            .addCase(getMateriasByTeacher.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })            
            .addCase(createMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materias.push(action.payload);
            })
            .addCase(createMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materias = state.materias.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMateria.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMateria.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.materias = state.materias.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateMateria.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = materiaSlice.actions;
export default materiaSlice.reducer;