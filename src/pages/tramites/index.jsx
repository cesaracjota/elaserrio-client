import React from 'react';
import DetallesPago from '../../components/pagos/DetallesPago';
import BoletaPago from '../../components/pagos/BoletaPago';
import Layout from '../../components/layout/Layout';
import Tramites from '../../components/tramites/Tramites';

export const TramitesPage = () => {
    return ( <Layout children={<Tramites />} /> )
}

export const TramitesPageDetalles = () => {
    return ( <Layout children={<DetallesPago />} /> )
}

export const BoletaTramitePage = () => {
    return ( <Layout children={<BoletaPago />} /> )
}
