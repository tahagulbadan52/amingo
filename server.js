const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const keys = require('./config/keys');

const db = keys.mongoURI;

app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect(db, {}).then(()=> console.log("Db Connect")).catch(err => console.log(err));

const userRoutes = require('./routes/User')
app.use('/users', userRoutes);

const postsRoutes = require('./routes/Posts')
app.use('/posts', postsRoutes);

app.get('/', (req, res) => res.json({
    msg: "Hello Amigo!! taha"
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));