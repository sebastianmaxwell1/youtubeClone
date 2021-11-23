const mongoose = require('mongoose');
const Joi = require('joi');

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

const commentsSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    userComment: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replyComment: [{ type: replySchema }],
});

function validateComment(comment) {
    const schema = Joi.object({
        videoId: Joi.string().required(),
        userComment: Joi.string().required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        replyComment: Joi.array(),
    });
    return schema.validate(comment);
}

const Reply = mongoose.model("Reply", replySchema);
const Comment = mongoose.model("Comment", commentsSchema);

// module.exports.Comment = Comment;
// module.exports.Reply = Reply;
// module.exports.commentsSchema = commentsSchema;
// module.exports.replySchema = replySchema;
exports.Comment = Comment;
exports.validate = validateComment;
exports.commentsSchema = commentsSchema;