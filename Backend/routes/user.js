const { User } = require('../models/user');
const { Comment, validate } = require('../models/comments');
const express = require('express');
const router = express.Router();

router.post('/:userId/reply/:commentId', async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(400).send(`The comment with id "${req.params.commentId}" does not exist.`);

    user.reply.push(comment);

       await user.save();
       return res.send(user.reply);
     } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

   module.exports = router;