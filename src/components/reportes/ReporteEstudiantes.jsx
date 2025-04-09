import React from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import CardItems from './CardItems';
import { FaSchool, FaUsers } from 'react-icons/fa';
import { Loading } from '../../helpers/Loading';
import Chart from 'react-apexcharts';

const ReporteEstudiantesEBR = ({ reportesEBR, isLoading }) => {

    const grados = reportesEBR?.porGrado?.map((grado) => grado.nombre) || [];

    const count = reportesEBR?.porGrado?.map((grado) => grado.cantidadEstudiantes) || [];

  // Configuración del gráfico
  const options = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    series: count ? count : [],
    labels: grados,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'top',
          },
        },
      },
    ],    
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CardItems
        total={reportesEBR?.totalEstudiantes}
        textHeader={'Total Estudiantes'}
        textButton={'Ver más'}
        icon={FaUsers}
        boxSize={20}
      />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
        {
            reportesEBR?.porGrado?.map((grado) => (
                <CardItems
                    key={grado._id}
                    total={grado.cantidadEstudiantes}
                    textHeader={grado.nombre}
                    icon={FaSchool}
                    boxSize={10}
                />
            ))
        }
      </SimpleGrid>

      <Stack
        boxShadow={'base'}
        bg="white"
        _dark={{ bg: 'primary.1000', color: 'black' }}
        rounded={'2xl'}
        p={6}
        mt={4}
      >
        <Chart
          options={options}
          series={options?.series || []}
          type={'pie'}
          height={400}
        />
      </Stack>
    </>
  );
};

export default ReporteEstudiantesEBR;
