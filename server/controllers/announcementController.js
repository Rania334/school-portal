const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /api/announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate("user" , "username image subject");
        res.status(200).json(announcements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAnnouncement = async (req, res) => {
    try {
        const newAnnouncement = new Announcement({
            ...req.body,
            user: req.user.id  // from authMiddleware
        });
        console.log("Decoded user:", req.user);

        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// @desc    Update an announcement
// @route   PUT /api/announcements/:id
const updateAnnouncement = async (req, res) => {
    try {
        const updated = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
const deleteAnnouncement = async (req, res) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export all
module.exports = {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
