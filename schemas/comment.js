const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    postId: {
        type: Number,
        required: true,
    },
    commentId: {
        type: Number,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Comment", commentsSchema);