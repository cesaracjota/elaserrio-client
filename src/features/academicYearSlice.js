import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import academicYearService from "../services/academic_year.service";

const initialState = {
    academic_year: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createAcademicYear = createAsyncThunk(
    "academic_year/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await academicYearService.createAcademicYear(data, token);
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

export const getAllAcademicYear = createAsyncThunk(
    "academic_year/get",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;

            return await academicYearService.getAllAcademicYear(token);
            
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

export const getAcademicYear = createAsyncThunk(
    "academic_year/get",
    async (id, thunkAPI) => {
        try {
            return await academicYearService.getAcademicYear(id);
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

export const updateAcademicYear = createAsyncThunk(
    "academic_year/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await academicYearService.updateAcademicYear(data, token);
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

export const deleteAcademicYear = createAsyncThunk(
    "academic_year/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await academicYearService.deleteAcademicYear(id, token);
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

export const academicYearSlice = createSlice({
    name: "academic_year",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAcademicYear.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAcademicYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.academic_year = action.payload;
            })
            .addCase(getAllAcademicYear.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createAcademicYear.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAcademicYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.academic_year.push(action.payload);
            })
            .addCase(createAcademicYear.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteAcademicYear.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAcademicYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.academic_year = state.academic_year.filter((data) => 
                    data._id !== action.payload._id);
            })
            .addCase(deleteAcademicYear.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateAcademicYear.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAcademicYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.academic_year = state.academic_year.map((data) => 
                    data._id === action.payload._id ? action.payload : data);
            })
            .addCase(updateAcademicYear.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = academicYearSlice.actions;
export default academicYearSlice.reducer;