const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// body-parser option
// application/x-www-from-urlencoded type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json type의 데이터들을 분석해서 가져올 수 있게
app.use(bodyParser.json());
// cookie-parser option
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'))

// router setting
app.get('/', (req, res) => res.send('<h1>Hello World! 반갑습니다!</h1>'));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
});