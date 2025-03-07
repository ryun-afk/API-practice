const express = require('express');
const route = require('./router/routes');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes (after middleware)
app.use('/', route);

// Serve static files
app.use(express.static(path.join(__dirname, 'view')));
app.get('*', (req, res) => {
    const page = req.path === '/' ? 'index' : req.path.substring(1);
    const filePath = path.join(__dirname, 'view', `${page}.html`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving page:', err.message);
            res.status(404).send('Page not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
