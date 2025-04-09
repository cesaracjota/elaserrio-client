import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
  Alert,
  AlertIcon,
  IconButton,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomToast } from '../../helpers/toast';

// Configurar el localizador para español
moment.locale('es');
const localizer = momentLocalizer(moment);

// Mapeo de días de la semana a número (0 = domingo, 1 = lunes, etc.)
const dayToNumber = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miércoles: 3,
  miercoles: 3, // Para permitir ambas versiones (con y sin tilde)
  jueves: 4,
  viernes: 5,
  sábado: 6,
  sabado: 6, // Para permitir ambas versiones (con y sin tilde)
};

// Obtener el inicio de la semana
const getStartOfWeek = date => {
  const day = moment(date);
  const diff = day.isoWeekday() - 1;
  return day.subtract(diff, 'days').startOf('day');
};

// Convertir el horario de la materia a eventos del calendario
const convertirHorarioAEventos = (horario, startOfWeek, brandColor) => {
  if (!horario || !Array.isArray(horario) || horario.length === 0) {
    return [];
  }

  const eventos = [];

  horario.forEach(clase => {
    // Verificar que todos los campos necesarios existen
    if (!clase.day || !clase.start || !clase.end || !clase.title) {
      return;
    }

    // Normalizar el día (minúsculas y sin acentos para mayor compatibilidad)
    const dayNormalized = clase.day
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Convertir el día a número (0 = domingo, 1 = lunes, etc.)
    const dayNumber = dayToNumber[dayNormalized];

    // Si no se pudo convertir el día, omitir esta clase
    if (dayNumber === undefined) {
      console.warn(`Día no reconocido: ${clase.day}`);
      return;
    }

    // Crear fecha para el día de la clase en la semana actual
    const diaClase = moment(startOfWeek).add(dayNumber - 1, 'days');

    // Procesar el formato de hora
    let startHour, startMinute, endHour, endMinute;

    // Manejar diferentes formatos de hora (HH:MM o HHMM)
    if (clase.start.includes(':')) {
      const startParts = clase.start.split(':');
      startHour = parseInt(startParts[0], 10);
      startMinute = parseInt(startParts[1], 10);
    } else {
      startHour = parseInt(clase.start.substring(0, 2), 10);
      startMinute = parseInt(clase.start.substring(2), 10);
    }

    if (clase.end.includes(':')) {
      const endParts = clase.end.split(':');
      endHour = parseInt(endParts[0], 10);
      endMinute = parseInt(endParts[1], 10);
    } else {
      endHour = parseInt(clase.end.substring(0, 2), 10);
      endMinute = parseInt(clase.end.substring(2), 10);
    }

    // Validar que las horas sean números válidos
    if (
      isNaN(startHour) ||
      isNaN(startMinute) ||
      isNaN(endHour) ||
      isNaN(endMinute)
    ) {
      console.warn(`Formato de hora inválido: ${clase.start} - ${clase.end}`);
      return;
    }

    // Crear fechas de inicio y fin para la clase
    const fechaInicio = moment(diaClase).hours(startHour).minutes(startMinute);

    const fechaFin = moment(diaClase).hours(endHour).minutes(endMinute);

    // Añadir el evento
    eventos.push({
      id: `${clase.title}-${fechaInicio.valueOf()}`,
      title: clase?.title,
      day: diaClase,
      start: fechaInicio.toDate(),
      end: fechaFin.toDate(),
      description: clase.description || '',
      aula: clase.aula || 'Por asignar',
      brandColor: brandColor || '#3182CE', // Color por defecto azul si no hay brand_color
    });
  });

  return eventos;
};

// Componente para mostrar los detalles del evento
const EventoDetalle = ({ evento, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!evento) return null;

  return (
    <Box
      p={4}
      bg={bgColor}
      shadow="md"
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      maxW="sm"
    >
      <Heading size="md" mb={2}>
        {evento?.title}
      </Heading>

      <Flex align="center" mb={2}>
        <CalendarIcon mr={2} color={evento?.brandColor} />
        <Text fontSize="sm">
          {moment(evento.start).format('dddd, HH:mm')} -{' '}
          {moment(evento.end).format('HH:mm')}
        </Text>
      </Flex>

      {evento.aula && (
        <Text fontSize="sm" mb={2}>
          <Text as="span" fontWeight="bold">
            Aula:
          </Text>{' '}
          {evento.aula}
        </Text>
      )}

      {evento.description && (
        <Text fontSize="sm" mb={3}>
          <Text as="span" fontWeight="bold">
            Descripción:
          </Text>{' '}
          {evento.description}
        </Text>
      )}

      <Button size="sm" onClick={onClose} mt={2}>
        Cerrar
      </Button>
    </Box>
  );
};

// Componente para el evento en el calendario
const EventComponent = ({ event }) => {
  return (
    <Box p={1} height="100%">
      <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
        {event.title}
      </Text>
      {event.aula && (
        <Text
          fontSize="xs"
          color="gray.600"
          _dark={{ color: 'gray.300' }}
          noOfLines={1}
        >
          {typeof event.aula === 'string' ? event.aula : 'Aula: Por asignar'}
        </Text>
      )}
    </Box>
  );
};

const ModalVerHorarioMateria = ({ materia }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerBgColor = useColorModeValue('gray.50', 'primary.1000');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [loadingExport, setloadingExport] = useState(false);

  // Si no hay materia, usar un objeto vacío para evitar errores
  const materiaData = materia || {
    nombre: 'Materia no especificada',
    codigo: 'N/A',
    brand_color: '#3182CE',
    horario: [],
    docente: null,
  };

  // Estado para la fecha actual (inicialmente el lunes de la semana actual)
  const [currentDate, setCurrentDate] = useState(
    getStartOfWeek(new Date()).toDate()
  );

  // Estado para el evento seleccionado
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Ejemplo de horario estático (para el caso en que no se proporcione materia)
  const horarioEjemplo = [
    {
      title: 'Ejemplo de horario',
      day: 'lunes',
      start: '08:00',
      end: '11:00',
      aula: 'A-101',
      description: 'Clase teórica',
    },
  ];

  // Convertir horario a eventos
  const eventos = convertirHorarioAEventos(
    materiaData.horario?.length > 0 ? materiaData.horario : horarioEjemplo,
    currentDate,
    materiaData.brand_color
  );

  // Navegación entre semanas
  const navigateWeek = direction => {
    const newDate = moment(currentDate).add(direction, 'weeks').toDate();
    setCurrentDate(newDate);
  };

  // Volver a la semana actual
  const goToCurrentWeek = () => {
    setCurrentDate(getStartOfWeek(new Date()).toDate());
  };

  // Manejar la selección de un evento
  const handleSelectEvent = event => {
    setSelectedEvent(event);
  };

  // Cerrar el detalle del evento
  const closeEventDetail = () => {
    setSelectedEvent(null);
  };

  // Personalización de eventos
  const eventPropGetter = event => {
    return {
      style: {
        backgroundColor: 'white',
        color: event.brandColor || 'black',
        borderLeft: '8px solid',
        borderRadius: '10px',
        borderColor: event.brandColor ? `${event.brandColor}dd` : '#2B6CB0',
      },
    };
  };

  const componentRef = useRef();

  const handleExportSchedule = async () => {
    try {
      setloadingExport(true);
      const element = componentRef.current;
      
      // Configuración mejorada de html2canvas
      const options = {
        scale: 3, // Aumentar la escala para mejor resolución
        useCORS: true,
        logging: false,
        allowTaint: true, // Permitir elementos tainted
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        removeContainer: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      };
  
      html2canvas(element, options).then(
        canvas => {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
            compress: true,
            precision: 16, // Mayor precisión
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          // Calcular el ratio para mantener la proporción pero maximizar el espacio
          const canvasRatio = canvas.width / canvas.height;
          const pageRatio = pdfWidth / pdfHeight;
          
          let renderWidth, renderHeight;
          
          if (canvasRatio >= pageRatio) {
            // Si el canvas es más ancho que la página
            renderWidth = pdfWidth;
            renderHeight = pdfWidth / canvasRatio;
          } else {
            // Si el canvas es más alto que la página
            renderHeight = pdfHeight;
            renderWidth = pdfHeight * canvasRatio;
          }
          
          // Centrar la imagen en la página
          const xOffset = (pdfWidth - renderWidth) / 2;
          const yOffset = (pdfHeight - renderHeight) / 2;
          
          pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
          setloadingExport(false);
          
          pdf.save(`${materiaData.codigo || 'horario'}.pdf`);
        },
        error => {
          console.error('Error al renderizar canvas:', error);
          setloadingExport(false);
          CustomToast('Error al exportar horario', 'error', 'Error');
        }
      );
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      setloadingExport(false);
      CustomToast('Error al exportar horario', 'error', 'Error');
    }
  };

  return (
    <>
      <IconButton
        icon={<CalendarIcon />}
        colorScheme="yellow"
        variant="outline"
        isRound
        onClick={onOpen}
        mr="2"
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent _dark={{ bg: 'primary.1000' }}>
          <ModalHeader bg={headerBgColor} borderTopRadius="lg">
            <Flex align="center" justify="space-between" wrap="wrap">
              <Heading size="md">
                {typeof materiaData.nombre === 'string'
                  ? materiaData.nombre
                  : 'Materia no especificada'}
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton size={'lg'} />
          <ModalBody>
            <Stack spacing={4}>
              {/* Controles de navegación */}
              <Flex justify="space-between" align="center">
                <Flex>
                  <Button
                    size="sm"
                    onClick={goToCurrentWeek}
                    colorScheme="primary"
                    color="white"
                    mr={2}
                  >
                    Hoy
                  </Button>
                  <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={() => navigateWeek(-1)}
                    aria-label="Semana anterior"
                    size="sm"
                    mr={1}
                  />
                  <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={() => navigateWeek(1)}
                    aria-label="Semana siguiente"
                    size="sm"
                  />
                </Flex>
                <Flex>
                  <Text fontWeight="bold" mr={3} alignSelf={'center'}>
                    {moment(currentDate).format('MMMM YYYY')}
                  </Text>
                  <Button
                    size="md"
                    colorScheme="primary"
                    color={loadingExport ? 'gray.500' : 'white'}
                    onClick={handleExportSchedule}
                    leftIcon={<CalendarIcon />}
                    isLoading={loadingExport ? true : false}
                    loadingText="Exportando..."
                    isDisabled={loadingExport ? true : false}
                    loadingSpin={loadingExport ? true : false}
                  >
                    Exportar
                  </Button>
                </Flex>
              </Flex>

              {/* Calendario */}
              {eventos.length === 0 ? (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  No hay horarios registrados para esta materia
                </Alert>
              ) : (
                <Box
                  height="auto"
                  width="100%"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  ref={componentRef}
                >
                  <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%'}}
                    date={currentDate}
                    popup={true}
                    onNavigate={date => setCurrentDate(date)}
                    defaultView="work_week"
                    views={['work_week']}
                    min={new Date(2023, 0, 1, 7, 0)} // Desde las 7 AM
                    max={new Date(2023, 0, 1, 19, 0)} // Hasta las 9 PM
                    step={60}
                    timeslots={1}
                    titleAccessor={event => event.title}
                    onSelectEvent={handleSelectEvent}
                    selectable={true}
                    toolbar={false}
                    eventPropGetter={eventPropGetter}
                    components={{
                      event: EventComponent,
                    }}
                    formats={{
                      weekdayFormat: date => moment(date).format('dddd'),
                      timeGutterFormat: date => moment(date).format('HH:mm'),
                    }}
                  />

                  {/* Detalle del evento */}
                  {selectedEvent && (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      zIndex={10}
                    >
                      <EventoDetalle
                        evento={selectedEvent}
                        onClose={closeEventDetail}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalVerHorarioMateria;
