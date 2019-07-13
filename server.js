const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');

const db = "mongodb+srv://astrolabs:makeithappen@cluster0-svfks.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect(db, {}).then(()=> console.log("Db Connect")).catch(err => console.log(err));

const userRoutes = require('./routes/User')
app.use('/users', userRoutes);

const postsRoutes = require('./routes/User')
app.use('/posts', postsRoutes);

app.get('/', (req, res) => res.json({
    msg: "Hello Amigo!! taha"
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));