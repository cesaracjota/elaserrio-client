import React from 'react';
import Pagos from '../../components/pagos/Pagos';
import DetallesPago from '../../components/pagos/DetallesPago';
import BoletaPago from '../../components/pagos/BoletaPago';
import Layout from '../../components/layout/Layout';

export const PagosPage = () => {
    return ( <Layout children={<Pagos />} /> )
}

export const PagosPageDetalles = () => {
    return ( <Layout children={<DetallesPago />} /> )
}

export const BoletaPagoPage = () => {
    return ( <Layout children={<BoletaPago />} /> )
}
