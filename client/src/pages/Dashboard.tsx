import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Drawer, Skeleton, useMediaQuery, useTheme } from '@mui/material'

import { fetchAnnouncements } from '../store/announcementSlice'
import { fetchTasks } from '../store/taskSlice'
import type { RootState, AppDispatch } from '../store/store'
import type { DueItem } from '../components/Due/DueSection'

import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'
import HighlightCard from '../components/HighlightCard'
import TeacherPostForm from '../components/TeacherPostForm'
import AnnouncementTable from '../components/Announcement/AnnouncementTable'
import DueSection from '../components/Due/DueSection'
import LoadMoreModal from '../components/Due/LoadMoreModel'
import LoadMoreAnnouncementModal from '../components/Announcement/LoadMoreAnnouncementModal'
import { DueCardSkeleton } from '../components/Skeleton/DueSectionSkeleton'
import AnnouncementTableSkeleton from '../components/Skeleton/AnnouncementSkeleton'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false)

  const userInfo = useSelector((state: RootState) => state.auth.user)
  const isTeacher = !!userInfo?.subject

  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
  } = useSelector((state: RootState) => state.announcements)

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useSelector((state: RootState) => state.tasks)
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const theme = useTheme()
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'))

  useEffect(() => {
    dispatch(fetchAnnouncements({ skip: 0, limit: 5 }))
    dispatch(fetchTasks({ skip: 0, limit: 5 }))
  }, [dispatch])

  const fetchLatestAnnouncements = () => {
    dispatch(fetchAnnouncements({ skip: 0, limit: 5 }))
  }

  const fetchLatestTasks = () => {
    dispatch(fetchTasks({ skip: 0, limit: 5 }))
  }

  const toggleDrawer = () => setDrawerOpen(prev => !prev)
  const handleAllTasksClick = () => setTaskModalOpen(true)
  const handleAllAnnouncementsClick = () => setAnnouncementModalOpen(true)

  const dueItems: DueItem[] = tasks.map(task => ({
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
      {isLgDown ? (
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
        <NavBar
          username={userInfo?.username}
          image={userInfo?.image}
          onMenuClick={toggleDrawer}
        />
        {isTeacher && (
          <Box pt={3}>
            {loading ? (
              <Skeleton variant="rectangular" width="90vw" height={200} />
            ) : (
              <TeacherPostForm
                onPostSuccess={(type) => {
                  if (type === 'announcement') fetchLatestAnnouncements()
                  else if (type === 'quiz') fetchLatestTasks()
                }}
              />
            )}
          </Box>
        )}

        {!isTeacher && <HighlightCard />}

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
            {announcementsLoading && <AnnouncementTableSkeleton />}
            {announcementsError && <p>Error: {announcementsError}</p>}
            {!announcementsLoading && !announcementsError && (
              <AnnouncementTable
                data={announcements}
                onAllClick={handleAllAnnouncementsClick}
              />
            )}
          </Box>

          <Box sx={{ width: isMdDown ? '100%' : 320, flexShrink: 0 }}>
            {tasksLoading && <DueCardSkeleton />}
            {tasksError && <p>Error: {tasksError}</p>}
            {!tasksLoading && !tasksError && (
              <DueSection
                items={dueItems}
                onAllClick={handleAllTasksClick}
                loading={tasksLoading}
              />
            )}
          </Box>
        </Box>

        <LoadMoreModal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
        <LoadMoreAnnouncementModal
          open={announcementModalOpen}
          onClose={() => setAnnouncementModalOpen(false)}
        />
      </Box>
    </Box>
  )
}

export default Dashboard
