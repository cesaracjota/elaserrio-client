import React from 'react';
import Layout from '../components/layout/Layout';
import NoTienePermisos from '../helpers/NoTienePermisos';

export const NoTienePermisosPage = () => {
    return ( <Layout children={<NoTienePermisos />} /> )
}