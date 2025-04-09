import React from 'react';
import Layout from '../../components/layout/Layout';
import Egresos from '../../components/egresos/Egresos';
import DetallesEgreso from '../../components/egresos/DetallesEgreso';

export const EgresosPage = () => {
    return ( <Layout children={<Egresos />} /> )
}

export const EgresosPageDetalles = () => {
    return ( <Layout children={<DetallesEgreso />} /> )
}
