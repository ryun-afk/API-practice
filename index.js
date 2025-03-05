const express = require('express');
const route = require('./router/routes');
const path = require('path');

const app = express();
const port = 3000;


// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'view')));

// Parse JSON bodies
app.use(express.json());

// Use custom routes for API
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


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});