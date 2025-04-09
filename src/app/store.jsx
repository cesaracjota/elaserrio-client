import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import categoriaReducer from "../features/categoriaSlice";
import usuarioReducer from "../features/usuarioSlice";
import gradoReducer from "../features/gradoSlice";
import uniformeReducer from "../features/uniformeSlice";
import categoriaUniformeReducer from "../features/categoriaUniformeSlice";
import activoReducer from "../features/activoSlice";
import tipoActivoReducer from "../features/tipoActivoSlice";
import estudianteReducer from "../features/estudianteSlice";
import docenteReducer from "../features/docenteSlice";
import venta_uniformeReducer from "../features/venta_uniformeSlice";
import pagoReducer from "../features/pagos/pagoSlice";
import conceptoPagoReducer from "../features/pagos/conceptosPagoSlice";
import reporteReducer from "../features/reporteSlice";
import academicYearReducer from "../features/academicYearSlice";
import matriculaReducer from "../features/matriculaSlice";
import egresoReducer from "../features/egresoSlice";
import rolReducer from "../features/rolSlice";
import moduloReducer from "../features/moduloSlice";
import sedeReducer from "../features/sedeSlice";
import materiaReducer from "../features/materiaSlice";
import calificacionReducer from "../features/notaSlice";
import configuracionReducer from "../features/configuracionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriaReducer,
        usuarios : usuarioReducer,
        grados: gradoReducer,
        uniformes: uniformeReducer,
        categoria_uniformes: categoriaUniformeReducer,
        activos: activoReducer,
        tipo_activos: tipoActivoReducer,
        estudiantes: estudianteReducer,
        pagos: pagoReducer,
        concepto_pagos: conceptoPagoReducer,
        docentes: docenteReducer,
        ventas_uniforme: venta_uniformeReducer,
        reportes: reporteReducer,
        academic_year: academicYearReducer,
        matriculas: matriculaReducer,
        egresos: egresoReducer,
        roles: rolReducer,
        modulos: moduloReducer,
        sedes: sedeReducer,
        materias: materiaReducer,
        calificaciones: calificacionReducer,
        configuraciones: configuracionReducer,
    },
})