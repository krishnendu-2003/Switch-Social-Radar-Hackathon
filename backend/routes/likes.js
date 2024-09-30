
const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middlewares/auth');

router.post('/post/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const existingLike = await Like.findOne({ user: req.user.id, post: req.params.postId });
        if (existingLike) return res.status(400).json({ message: 'Post already liked' });

        const newLike = new Like({
            user: req.user.id,
            post: req.params.postId,
        });

        await newLike.save();
        post.likes.push(req.user.id);
        await post.save();

        res.json({ message: 'Post liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/comment/:commentId', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const existingLike = await Like.findOne({ user: req.user.id, comment: req.params.commentId });
        if (existingLike) return res.status(400).json({ message: 'Comment already liked' });

        const newLike = new Like({
            user: req.user.id,
            comment: req.params.commentId,
        });

        await newLike.save();
        comment.likes.push(req.user.id);
        await comment.save();

        res.json({ message: 'Comment liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/post/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const like = await Like.findOne({ user: req.user.id, post: req.params.postId });
        if (!like) return res.status(400).json({ message: 'Post not liked' });

        await like.remove();
        post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
        await post.save();

        res.json({ message: 'Post unliked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/comment/:commentId', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const like = await Like.findOne({ user: req.user.id, comment: req.params.commentId });
        if (!like) return res.status(400).json({ message: 'Comment not liked' });

        await like.remove();
        comment.likes = comment.likes.filter(userId => userId.toString() !== req.user.id);
        await comment.save();

        res.json({ message: 'Comment unliked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;