const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.get('/courses', (req, res) => {
    res.sendFile(__dirname + '/public/courses.html');
});

app.get('/professors', (req, res) => {
    res.sendFile(__dirname + '/public/professors.html');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
