const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const comment = require('./routes/comments');
const user = require('./models/user')

connectDB();

app.use(express.json());
app.use('/api/comments', comment);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});