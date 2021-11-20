const { Comment, validate } = require('../models/comments');
const express = require('express');
const router = express.Router();

//Endpoint & Route Handlers:

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
        return res.status(400).send(error);

        const comment = new Comment({
            videoId: req.body.videoId,
            userComment: req.body.userComment,
            // likes: 0,
            // dislikes: 0,
            // replyComment: [],
        });
 

        await comment.save();

        return res.send(comment);

    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;