import React, { useEffect } from 'react';
import ReporteEstudiantesEBR from './ReporteEstudiantes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllReportesEBR, reset } from '../../features/reporteSlice';
import { CustomToast } from '../../helpers/toast';

const ReporteIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  const { reportesEBR, isLoading, message, isError } = useSelector(
    state => state.reportes
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (!user.token) {
      navigate('/login');
    }

    dispatch(getAllReportesEBR());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user]);

  if (isError) {
    CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
    console.log(message);
  }

  return (
    // <Tabs variant="unstyled" position="relative" p={0}>
    //   <TabList>
    //     <Tab
    //       _selected={{
    //         color: 'purple.500',
    //       }}
    //     >
    //       Estudiantes
    //     </Tab>
    //     <Tab
    //       _selected={{
    //         color: 'purple.500',
    //       }}
    //     >
    //       Pagos
    //     </Tab>
        
    //                 <Tab
    //                     _selected={{
    //                         color: 'purple.500',
    //                     }}
    //                 >
    //                     Libros
    //                 </Tab>
    //                 <Tab
    //                     _selected={{
    //                         color: 'purple.500',
    //                     }}
    //                 >
    //                     Mapas
    //                 </Tab>
                   
    //     <Tab
    //       _selected={{
    //         color: 'purple.500',
    //       }}
    //     >
    //       Uniformes
    //     </Tab>
    //   </TabList>
    //   <TabIndicator
    //     mt="-1.5px"
    //     height="2px"
    //     bg="purple.500"
    //     borderRadius="2px"
    //   />
    //   <TabPanels>
    //     <TabPanel px={0}>
          <ReporteEstudiantesEBR
            isLoading={isLoading}
            reportesEBR={reportesEBR?.estudiantes}
          />
    //    </TabPanel>
    //     <TabPanel px={0}>
    //       <ReportePagos isLoading={isLoading} reportesEBR={reportesEBR} />
    //     </TabPanel>
        
    //                 <TabPanel px={0}>
    //                     <ReporteLibros isLoading={isLoading} reportesEBR={reportesEBR?.libros} />
    //                 </TabPanel>
    //                 <TabPanel px={0}>
    //                     <ReporteMapas isLoading={isLoading} reportesEBR={reportesEBR?.mapas} />
    //                 </TabPanel>
    //                 <TabPanel px={0}>
    //                     <ReporteUniformes isLoading={isLoading} reportesEBR={reportesEBR?.uniformes} />
    //                 </TabPanel>
                
    //   </TabPanels>
    // </Tabs>
  );
};

export default ReporteIndex;
