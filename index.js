const express = require('express');
const route = require('./router/routes');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mount routes (after middleware)
app.use('/', route);

// Fallback route to serve HTML pages
app.get('*', (req, res) => {
    const page = req.path === '/' ? 'index' : req.path.substring(1);
    const filePath = path.join(__dirname, 'view', `${page}.html`);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving page:', err);
            res.status(404).send('Page not found');
        }
    });
});

// ignore console messages
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});