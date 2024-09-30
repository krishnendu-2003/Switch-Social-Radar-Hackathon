
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middlewares/auth');

router.post('/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newComment = new Comment({
            user: req.user.id,
            post: req.params.postId,
            content: req.body.content,
        });

        const comment = await newComment.save();
        post.comments.push(comment._id);
        await post.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/:commentId/reply', auth, async (req, res) => {
    try {
        const parentComment = await Comment.findById(req.params.commentId);
        if (!parentComment) return res.status(404).json({ message: 'Comment not found' });

        const newReply = new Comment({
            user: req.user.id,
            post: parentComment.post,
            content: req.body.content,
        });

        const reply = await newReply.save();
        parentComment.replies.push(reply._id);
        await parentComment.save();
        // routes/comments.js (continued)
        res.json(reply);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:postId', auth, async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .sort({ createdAt: -1 })
            .populate('user', 'username profilePicture');
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await comment.remove();
        res.json({ message: 'Comment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
