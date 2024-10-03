const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.post('/', auth, upload.single('media'), async (req, res) => {
    try {
        const { content } = req.body;

        // Fetch user details to get the username
        const user = await User.findById(req.user.id);

        // Create a new post with the user's username
        const newPost = new Post({
            user: req.user.id,
            username: user.username,  // Attach the username to the post
            content,
            media: req.file ? req.file.location : null,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/feed', auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({ user: req.user.id });
        const friendPosts = await Post.find({ user: { $in: currentUser.following } });
        const allPosts = userPosts.concat(friendPosts);
        allPosts.sort((a, b) => b.createdAt - a.createdAt);
        res.json(allPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await post.remove();
        res.json({ message: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;