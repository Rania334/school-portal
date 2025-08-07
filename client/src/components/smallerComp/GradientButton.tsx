import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)<ButtonProps>(() => ({
    background: 'linear-gradient(90deg, #0c3145ff 42%, #3A8694 79%);',
    color: 'white',
    padding: '8px 16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    textTransform: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        background: 'linear-gradient(120deg, #354f5dff 42%, #658b92ff 79%);',
    },
}));

export default GradientButton;
