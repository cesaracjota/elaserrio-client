import React from 'react';
import Layout from '../components/layout/Layout';
import HomeDashboard from '../components/home/Home';

const HomePage = () => {
    return ( <Layout children={ < HomeDashboard /> } /> )
}

export default HomePage