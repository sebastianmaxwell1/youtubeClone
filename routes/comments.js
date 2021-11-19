const Comment = require('../models/comments');
const express = require('express');
const router = express.Router();

//Endpoint & Route Handlers:


router.post('/', async (req, res) => {
    try {
        const comment= new Comment({
            videoId: req.body.id,
            userComment: req.body.text, 
            likes: req.body.likes, 
            dislikes: req.body.dislikes, 
            replyComment: req.body.replyComment

        });

        await user.save();

        return res.send(user);

    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;