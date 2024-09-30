const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Story Schema
const StorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        maxlength: 300,  // Limiting caption length to 300 characters
    },
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  // To keep track of users who have viewed the story
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,  // Automatically deletes the story after 24 hours (86400 seconds)
    }
});

module.exports = mongoose.model('Story', StorySchema);
