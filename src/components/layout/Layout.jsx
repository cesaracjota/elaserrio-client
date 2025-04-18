import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { MdDashboard } from "react-icons/md";
import { FaCog, FaSchool, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";


function Layout({ children }) {

    const { sedeSeleccionada } = useSelector(state => state.auth);

    const [isOpen, setIsOpen] = useState(() => {
        const isOpenValue = JSON.parse(localStorage.getItem("isOpen"));
        return isOpenValue ?? false;
    });

    function handleToggle() {
        setIsOpen((prevIsOpen) => {
            const newIsOpen = !prevIsOpen;
            localStorage.setItem("isOpen", JSON.stringify(newIsOpen));
            return newIsOpen;
        });
    }

    const navigationItems = [
        {
          icon: MdDashboard,
          label: 'INICIO',
          path: '/',
          allowedRoles: ['ADMIN_ROLE', 'DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
        },
        {
          icon: FaUsers,
          label: 'USUARIOS',
          path: `/usuarios`,
          allowedRoles: ['ADMIN_ROLE'],
        },
        {
          icon: FaSchool,
          label: 'PERIODO ESCOLAR',
          path: `/periodo-escolar`,
          allowedRoles: ['ADMIN_ROLE'],
        },
        {
          icon: FaUsers,
          label: 'ESTUDIANTES',
          path: `/${sedeSeleccionada?._id}/estudiantes`,
          allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'],
        },
        {
          icon: FaSchool,
          label: 'MATRICULAS',
          path: `/matriculas`,
          allowedRoles: ['ADMIN_ROLE'],
        },    
        {
          icon: FaSchool,
          label: 'MIS ASIGNATURAS',
          path: '/mis-materias',
          allowedRoles: ['DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
        },
        {
          icon: FaSchool,
          label: 'ASIGNATURAS',
          path: '/mis-grados',
          allowedRoles: ['DOCENTE_TITULAR_ROLE'],
        },
        {
          icon: FaSchool,
          label: 'MATERIAS',
          path: `/${sedeSeleccionada?._id}/materias`,
          allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'], // Admin-only section
        },
        {
          icon: FaSchool,
          label: 'GRADOS',
          path: `/${sedeSeleccionada?._id}/grados`,
          allowedRoles: ['ADMIN_ROLE'],
        },
        {
          icon: FaSchool,
          label: 'SEDES',
          path: '/sedes',
          allowedRoles: ['ADMIN_ROLE'],
        },
        {
          icon: FaUserGraduate,
          label: 'INSTRUCTORES',
          path: '/instructores',
          allowedRoles: ['admin'],
        },
        {
          icon: FaCog,
          label: 'CONFIGURACIONES',
          path: `/configuraciones`,
          allowedRoles: ['ADMIN_ROLE'],
        },
      ];

    return (
        <Box
            display="flex"
            flexDirection="column"
            minH="100vh"
            _dark={{
                bgColor: "primary.1100",
                color: "white"
            }}
            bgColor="#f8f9fa"
        >
            <Header onToggle={handleToggle} isOpen={isOpen} navigationItems={navigationItems} />
            <Sidebar isOpen={isOpen} navigationItems={navigationItems}/>
            <Box
                as="main"
                flex="1"
                bgColor="#f8f9fa"
                _dark={{
                    bg: "primary.1100"
                }}
                px={
                    isOpen ? 3 : 6
                }
                p={6}
                ml={{
                    base: 0,
                    lg: isOpen ? "280px" : "0"
                }}
                transition=".08s ease-out"
                mt={{
                    base: "16",
                    lg: "1"
                }}
            >
                {children}
            </Box>
            <Footer isOpen={isOpen}/>
        </Box>
    );
}

export default Layout;
