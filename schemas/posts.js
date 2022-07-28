const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Posts", postsSchema);