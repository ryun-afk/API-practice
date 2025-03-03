const express = require('express');
const route = require('./restapi/routes');
const path = require('path');

const app = express();
const port = 3000;


// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Use custom routes for API
app.use('/', route);

// Fallback route to serve HTML pages
app.get('*', (req, res) => {
    const page = req.path === '/' ? 'index' : req.path.substring(1);
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    
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