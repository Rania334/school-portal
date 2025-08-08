const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementsByTeacher
} = require('../controllers/announcementController');
router.get('/', getAnnouncements);
router.post('/', authMiddleware, createAnnouncement);
router.put('/:id', authMiddleware, updateAnnouncement);
router.delete('/:id', authMiddleware, deleteAnnouncement);
router.get('/teacher', authMiddleware, getAnnouncementsByTeacher);


module.exports = router;
