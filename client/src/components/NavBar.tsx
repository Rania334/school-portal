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

interface NavBarProps {
    onMenuClick?: () => void
    username?: string
    image?: string
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick, username = 'Talia',image = '/default-avatar.png'}) => {
    const theme = useTheme()
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
    const islgDown = useMediaQuery(theme.breakpoints.down('lg'))


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
                {/* Left: Welcome text & menu button */}
                <Box display="flex" alignItems="center" gap={2}>
                    {islgDown && (
                        <IconButton onClick={onMenuClick}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    {!isSmDown && (
                        <Typography variant="h6" fontWeight="bold" color="#000">
                            Welcome, {username}
                        </Typography>
                    )}
                </Box>

                {/* Right: Icons & Search */}
                <Box display="flex" alignItems="center" gap={2}>
                    {/* Search box: hidden on small screens */}
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
                                placeholder="Search…"
                                sx={{ ml: 1, flex: 1 }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Paper>
                    )}

                    {/* Notification Icon: hidden on xs */}
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

                    <Avatar alt={username} src={image || '/default-avatar.png'} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
