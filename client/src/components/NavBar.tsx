import React from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Avatar,
    InputBase,
    useTheme,
    useMediaQuery,
    Typography,
    Badge,
    Paper
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'react-i18next'

interface NavBarProps {
    onMenuClick?: () => void
    username?: string
    image?: string
}

const NavBar: React.FC<NavBarProps> = ({
    onMenuClick,
    username = 'Talia',
    image = '/default-avatar.png'
}) => {
    const theme = useTheme()
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
    const islgDown = useMediaQuery(theme.breakpoints.down('lg'))

    const { t, i18n } = useTranslation()

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en'
        i18n.changeLanguage(newLang)
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    }

    return (
        <AppBar position="sticky" color="transparent" elevation={0}>
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    py: 2,
                    px: isMdDown ? 2 : 4,
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    {islgDown && (
                        <IconButton onClick={onMenuClick}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    {!isSmDown && (
                        <Typography variant="h6" fontWeight="bold" color="#000">
                            {t('welcome')}, {username}
                        </Typography>
                    )}
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    {!isMdDown && (
                        <Paper
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '20px',
                                backgroundColor: '#f5f5f5',
                                boxShadow: 'none',
                                minWidth: 200,
                            }}
                        >
                            <SearchIcon sx={{ color: '#888' }} />
                            <InputBase
                                placeholder={t('search')}
                                sx={{ ml: 1, flex: 1 }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Paper>
                    )}

                    {!isSmDown && (
                        <IconButton>
                            <Badge badgeContent={2} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    )}

                    {!isSmDown && (
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <MailOutlineIcon />
                            </Badge>
                        </IconButton>
                    )}

                    <Typography
                        variant="body2"
                        onClick={toggleLanguage}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 500,
                            px: 1,
                            borderRadius: 1,
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                        }}
                    >
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </Typography>

                    <Avatar alt={username} src={image || '/default-avatar.png'} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
