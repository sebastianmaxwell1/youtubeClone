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


router.get('/:id', async (req, res) => {
    try {
   
    const comment = await Comment.findById(req.params.id);
    if (!comment)

    return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);

    return res.send(comment);

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

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                videoId: req.body.videoId,
                userComment:req.body.userComment,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                replyComment: req.body.replyComment,

            },
            {new: true}
        );

        if (!comment)
        return res.status(400).send(`The Comment with Id "${req.params.id}" does not exist."`);

        await comment.save();

        return res.send(comment);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;