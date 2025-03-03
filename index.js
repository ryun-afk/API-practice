const express = require('express');
const route = require('./restapi/routes');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', route);

// Routes to serve HTML pages
app.get('*', (req, res) => {
    const page = req.path === '/' ? 'index' : req.path.slice(1);
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

app.post('/signup', (req, res) => {
    


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});