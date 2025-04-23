// src/components/shared/CustomBackRoute.jsx
import { Icon, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const CustomBackRoute = ({ fallback = '/' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <IconButton
      onClick={handleBack}
      icon={<Icon as={MdArrowBackIosNew} boxSize={5} />}
      _active={{ transform: 'scale(0.98)' }}
      boxShadow="sm"
      _focus={{ boxShadow: 'outline' }}
      rounded="lg"
      transition="all 0.2s ease"
      fontWeight="semibold"
      size="md"
      variant="ghost"
    />
  );
};

export default CustomBackRoute;
