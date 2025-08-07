import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import GradientButton from './smallerComp/GradientButton';
import { useTranslation } from 'react-i18next';

const HighlightCard: React.FC = () => {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    return (
        <Paper
            elevation={1}
            sx={{
                border: .5,
                borderRadius: 4,
                borderColor: '#6b6b6b22',
                mx: 3,
                my: 4,
                display: 'flex',
                flexDirection: isMdDown ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4
            }}
        >
            <Box sx={{ p: 4, flex: 1 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {t('examsTime')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('examIntro')}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontStyle: 'italic',
                        color: theme.palette.text.secondary,
                        my: 1
                    }}
                >
                    {t('examQuote')}
                </Typography>
                <GradientButton onClick={() => console.log('Clicked!')}>
                    {t('viewExamTips')}
                </GradientButton>
            </Box>

            <Box
                component="img"
                src="https://keystoneacademic-res.cloudinary.com/image/upload/element/18/189126_BScAccountingwithProfessionalExperience.png"
                alt="exam"
                sx={{
                    height: isMdDown ? 180 : 220,
                    display: isMdDown ? 'none' : 'block',
                    width: 'auto',
                }}
            />
        </Paper>
    );
};

export default HighlightCard;
