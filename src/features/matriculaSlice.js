import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import matriculaService from '../services/matricula.service';

const initialState = {
  matriculas: [],
  matricula: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  currentPage: 1,
  totalRows: 0,
};

export const getAllMatriculas = createAsyncThunk(
  'matricula/getAll',
  async ({ page, perPage, idSede }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const desde = (page - 1) * perPage;
      const hasta = page * perPage;
      return await matriculaService.getAllMatriculas(
        token,
        desde,
        hasta,
        idSede
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMatriculasByGrado = createAsyncThunk(
  'matricula/getAllByGrado',
  async (gradoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.getAllMatriculasByGrado(token, gradoId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMatriculasByCurso = createAsyncThunk(
  'matricula/getMatriculasByCurso',
  async (cursoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.getAllMatriculasByCurso(token, cursoId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMatricula = createAsyncThunk(
  'matricula/get',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.getMatricula(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createMatricula = createAsyncThunk(
  'matricula/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.createMatricula(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMatricula = createAsyncThunk(
  'matricula/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.updateMatricula(data, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatedPromedioRankingPorGrado = createAsyncThunk(
  'matricula/updatedPromedioRankingPorGrado',
  async (idGrado, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.updatedPromedioRankingPorGrado(
        idGrado,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMatricula = createAsyncThunk(
  'matricula/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await matriculaService.deleteMatricula(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const matriculaSlice = createSlice({
  name: 'matriculas',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllMatriculas.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllMatriculas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas = action.payload.matriculas;
        state.totalRows = action.payload.total;
      })
      .addCase(getAllMatriculas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMatriculasByGrado.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllMatriculasByGrado.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas = action.payload.matriculas;
        state.totalRows = action.payload.total;
      })
      .addCase(getAllMatriculasByGrado.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMatriculasByCurso.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllMatriculasByCurso.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas = action.payload;
        state.totalRows = action.payload.total;
      })
      .addCase(getAllMatriculasByCurso.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMatricula.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMatricula.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matricula = action.payload;
      })
      .addCase(getMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMatricula.pending, state => {
        state.isLoading = true;
      })
      .addCase(createMatricula.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas.push(action.payload);
      })
      .addCase(createMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMatricula.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateMatricula.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas = state.matriculas.map(data =>
          data._id === action.payload._id ? action.payload : data
        );
      })

      .addCase(updateMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatedPromedioRankingPorGrado.pending, state => {
        state.isLoading = true;
      })
      .addCase(updatedPromedioRankingPorGrado.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatedPromedioRankingPorGrado.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(updateEstadoPago.pending, (state) => {
      //     state.isLoading = true;
      // })
      // .addCase(updateEstadoPago.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //     state.matriculas = state.matriculas.map((pay) => pay._id === action.payload._id ? action.payload : pay);
      // })
      // .addCase(updateEstadoPago.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.isError = true;
      //     state.message = action.payload;
      // })
      .addCase(deleteMatricula.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteMatricula.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.matriculas = state.matriculas.filter(
          pay => pay._id !== action.payload._id
        );
      })
      .addCase(deleteMatricula.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = matriculaSlice.actions;
export default matriculaSlice.reducer;
