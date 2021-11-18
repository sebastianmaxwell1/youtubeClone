const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://maxwellsebas:Bruce143@cluster0.vyeb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`))