const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

// Get user profile by ID
router.get('/profile/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update user profile (bio or profile picture)
router.put('/profile', auth, upload.single('profilePicture'), async (req, res) => {
    try {
        const { bio } = req.body;
        const user = await User.findById(req.user.id);
        if (bio) user.bio = bio;
        if (req.file) user.profilePicture = req.file.location;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Follow a user
router.post('/follow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.followers.includes(req.user.id)) {
            await user.updateOne({ $push: { followers: req.user.id } });
            await currentUser.updateOne({ $push: { following: req.params.id } });
            res.json({ message: 'User followed' });
        } else {
            res.status(400).json({ message: 'You already follow this user' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Unfollow a user
router.post('/unfollow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.followers.includes(req.user.id)) {
            await user.updateOne({ $pull: { followers: req.user.id } });
            await currentUser.updateOne({ $pull: { following: req.params.id } });
            res.json({ message: 'User unfollowed' });
        } else {
            res.status(400).json({ message: 'You do not follow this user' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Search users by username or other criteria
router.get('/search', auth, async (req, res) => {
    try {
        const { query } = req.query;

        // Search users by partial match of the username
        const users = await User.find({
            username: { $regex: query, $options: 'i' } // case-insensitive search
        }).select('-password');

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
