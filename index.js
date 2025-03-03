const express = require('express');
const userRoutes = require('./restapi/routes');

const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Routes to serve HTML pages
const routes = ['/', '/login', '/signup', '/courses', '/instructors'];

routes.forEach((route) => {
    app.get(route, (req, res) => {
        const page = route === '/' ? 'index' : route.slice(1);
        res.sendFile(path.join(__dirname, 'public', `${page}.html`));
    });
});

app.use('/api', userRoutes);