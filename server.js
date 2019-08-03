const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const keys = require('./config/keys');
const passport = require('passport');
const cors = require('cors');

const db = keys.mongoURI;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect(db, {}).then(()=> console.log("Db Connect")).catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
 

const userRoutes = require('./routes/User')
app.use('/users', passport.authenticate('jwt', {session: false }), userRoutes);

const postsRoutes = require('./routes/Posts')
app.use('/posts', passport.authenticate('jwt', {session: false }), postsRoutes);

const authRoutes = require('./routes/Auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.json({
    msg: "Hello Amigo!! taha"
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));