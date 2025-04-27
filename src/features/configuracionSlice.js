import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import configuracionService from '../services/configuracion.service';

const initialState = {
  configuracion: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getAllConfiguraciones = createAsyncThunk(
  'configuraciones/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configuracionService.getAll(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Crear o actualizar configuración
export const createOrUpdateConfiguracion = createAsyncThunk(
  'configuracion/createOrUpdate',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configuracionService.createOrUpdateConfiguracion(data, token); // usa una sola función en el service
    } catch (error) {
      const message =
        error.response?.data?.msg || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteConfiguracion = createAsyncThunk(
  'configuracion/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configuracionService.deleteConfiguracion(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const configuracionSlice = createSlice({
  name: 'configuracion',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Obtener configuración
      .addCase(getAllConfiguraciones.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllConfiguraciones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuracion = action.payload || [];
      })
      .addCase(getAllConfiguraciones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Crear o actualizar
      .addCase(createOrUpdateConfiguracion.pending, state => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateConfiguracion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuracion = action.payload || {};
      })
      .addCase(createOrUpdateConfiguracion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = configuracionSlice.actions;
export default configuracionSlice.reducer;

