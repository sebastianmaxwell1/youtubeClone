const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type:String, required:true, minlength: 1, maxlength: 100 },
    comment: { type:String, required: true },
    dateModified: { type: Date, default:Date.now },
    time: { type:TimeRanges, default:TimeRanges.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;