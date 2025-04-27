// src/features/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

// Leer del localStorage
const user = JSON.parse(localStorage.getItem('user'));
const sedeSeleccionada = JSON.parse(localStorage.getItem('sedeSeleccionada'));

const initialState = {
    user: user || null,
    sedes: [],
    sedeSeleccionada: sedeSeleccionada || null,
    codigoRecuperacion: null,
    emailToken: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    ROLE: user?.usuario?.rol || null,
};

// Helpers
const handleError = (error, thunkAPI) => {
    const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
    return thunkAPI.rejectWithValue(message);
};

// Async actions
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        return await authService.updateProfile(userData, token);
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (data, thunkAPI) => {
    try {
        return await authService.forgotPassword(data);
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, thunkAPI) => {
    try {
        return await authService.resetPassword(data);
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        setSede: (state, action) => {
            state.sedeSeleccionada = action.payload;
            localStorage.setItem('sedeSeleccionada', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => { state.isLoading = true; })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario?.rol || null;
                state.sedes = action.payload.usuario?.sedes || [];
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.ROLE = null;
            })

            .addCase(login.pending, (state) => { state.isLoading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario?.rol || null;
                state.sedes = action.payload.usuario?.sedes || [];
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.sedes = [];
                state.ROLE = null;
            })

            .addCase(updateProfile.pending, (state) => { state.isLoading = true; })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario?.rol || null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(forgotPassword.pending, (state) => { state.isLoading = true; })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.codigoRecuperacion = action.payload.codigoRecuperacion;
                state.emailToken = action.payload.emailToken;
                state.message = action.payload.msg;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(resetPassword.pending, (state) => { state.isLoading = true; })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.sedes = [];
                state.sedeSeleccionada = null;
                state.ROLE = null;
                localStorage.removeItem('user');
                localStorage.removeItem('sedeSeleccionada');
            });
    }
});

// Exportar acciones y reducer
export const { reset, setSede } = authSlice.actions;
export default authSlice.reducer;