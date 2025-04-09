import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import configuracionService from '../services/configuracion.service';

const initialState = {
  configuraciones: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createConfiguracion = createAsyncThunk(
  'configuracion/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configuracionService.create(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

export const updateConfiguracion = createAsyncThunk(
  'configuracion/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await configuracionService.update(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
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

export const configuracionSlice = createSlice({
  name: 'configuraciones',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllConfiguraciones.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllConfiguraciones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuraciones = action.payload;
      })
      .addCase(getAllConfiguraciones.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createConfiguracion.pending, state => {
        state.isLoading = true;
      })
      .addCase(createConfiguracion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuraciones = action.payload;
      })
      .addCase(createConfiguracion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteConfiguracion.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteConfiguracion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuraciones = state.configuraciones.filter(
          data => data._id !== action.payload._id
        );
      })
      .addCase(deleteConfiguracion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateConfiguracion.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateConfiguracion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.configuraciones = state.configuraciones.map(data =>
          data._id === action.payload._id ? action.payload : data
        );
      })
      .addCase(updateConfiguracion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = configuracionSlice.actions;
export default configuracionSlice.reducer;
