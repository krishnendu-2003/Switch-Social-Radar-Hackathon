const express = require('express');
const router = express.Router();
const { uploadStories } = require('../middlewares/upload'); // Middleware for story uploads
const Story = require('../models/Story');
const auth = require('../middlewares/auth'); // Middleware to verify JWT

// POST: Create a new story
router.post('/', auth, uploadStories.single('media'), async (req, res) => {
    try {
        // Log incoming request for debugging
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        // Check if media was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Media file is required for a story' });
        }

        const { caption } = req.body; // Capture caption from the request body
        const mediaUrl = req.file.location; // Get the media URL from the uploaded file

        // Create new story document
        const newStory = new Story({
            user: req.user.id, // Get authenticated user ID from request
            mediaUrl,
            caption
        });

        // Save story to the database
        await newStory.save();
        res.status(201).json({ message: 'Story created successfully', story: newStory });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create story', details: err.message });
    }
});

// GET: Fetch all stories for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id })
            .populate('user', 'username profilePicture') // Populate user details
            .sort({ createdAt: -1 }); // Sort stories by newest first

        res.status(200).json(stories);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch stories', details: err.message });
    }
});

// DELETE: Delete a story by its ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        // Check if story exists
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Check if the authenticated user is the owner of the story
        if (story.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this story' });
        }

        // Remove the story
        await story.remove();
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete story', details: err.message });
    }
});

module.exports = router;
