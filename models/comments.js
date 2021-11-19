const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

const commentsSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replyComment: [{ type: replySchema }],
});

const Reply = mongoose.model("Reply", replySchema);
const Comment = mongoose.model("Comment", commentsSchema);

module.exports.Comment = Comment;
module.exports.Reply = Reply;
module.exports.commentsSchema = commentsSchema;
module.exports.replySchema = replySchema;