import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnnouncements } from '../store/announcementSlice'
import { fetchTasks } from '../store/taskSlice'
import type { RootState, AppDispatch } from '../store/store'

import AnnouncementTable from '../components/AnnouncementTable'
import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'
import HighlightCard from '../components/HighlightCard'
import DueSection from '../components/DueSection'
import LoadMoreModal from '../components/LoadMoreModel'
import TeacherPostForm from '../components/TeacherPostForm'



import {
  Box,

  Drawer,

  useMediaQuery,
  useTheme
} from '@mui/material'
import type { DueItem } from '../components/DueSection'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [modalOpen, setModalOpen] = useState(false)

  const handleAllClick = () => {
    setModalOpen(true)
  }
  const userInfo = useSelector((state: RootState) => state.auth.user)
  const isTeacher = !!userInfo?.subject

  const { announcements, loading: announcementsLoading, error: announcementsError } = useSelector(
    (state: RootState) => state.announcements
  )

  const { tasks, loading: tasksLoading, error: tasksError } = useSelector(
    (state: RootState) => state.tasks
  )

  const theme = useTheme()
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const islgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchAnnouncements())
    dispatch(fetchTasks({ skip: 0, limit: 5 }));
  }, [dispatch])

  const toggleDrawer = () => setDrawerOpen(prev => !prev)

  const dueItems: DueItem[] = tasks.map((task) => ({
    type: task.type,
    course: task.course,
    topic: task.topic,
    dueDate: new Date(task.dueDate).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    onClick: () => console.log(`${task.type} clicked for ${task.topic}`),
  }))

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {islgDown ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          <Sidebar onClose={toggleDrawer} />
        </Drawer>
      ) : (
        <Sidebar />
      )}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <NavBar   username={userInfo?.username} image={userInfo?.image} onMenuClick={toggleDrawer} />
        {!isTeacher && <HighlightCard />}
        {isTeacher && (
          <Box pt={3}>
            <TeacherPostForm />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMdDown ? 'column' : 'row',
            flex: 1,
            px: 3,
            gap: 3,
            pb: 3,
          }}
        >


          <Box sx={{ flex: 1 }}>

            {announcementsLoading && <p>Loading announcements...</p>}
            {announcementsError && <p>Error: {announcementsError}</p>}
            {!announcementsLoading && !announcementsError && (
              <AnnouncementTable data={announcements} />
            )}

          </Box>

          <Box sx={{ width: isMdDown ? '100%' : 320, flexShrink: 0 }}>
            {tasksLoading && <p>Loading tasks...</p>}
            {tasksError && <p>Error: {tasksError}</p>}
            {!tasksLoading && !tasksError && (
              <DueSection items={dueItems} onAllClick={handleAllClick} />
            )}
            <LoadMoreModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
