const Announcement = require('../models/Announcement');

const getAnnouncements = async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 5;

        const announcements = await Announcement.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username image subject");

        res.status(200).json(announcements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAnnouncement = async (req, res) => {
    try {
        const newAnnouncement = new Announcement({
            ...req.body,
            user: req.user.id
        });
        console.log("Decoded user:", req.user);

        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
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

const deleteAnnouncement = async (req, res) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAnnouncementsByTeacher = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const announcements = await Announcement.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username image subject");

    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncementsByTeacher
};
