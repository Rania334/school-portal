const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask } = require('../controllers/quizController');
router.get('/', getTasks);
router.post('/',authMiddleware, createTask);
router.put('/:id',authMiddleware, updateTask);
router.delete('/:id',authMiddleware, deleteTask);

module.exports = router;
