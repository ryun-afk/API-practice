const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes to serve HTML pages
const routes = ['/', '/login', '/signup', '/courses', '/instructors'];

routes.forEach((route) => {
    app.get(route, (req, res) => {
        const page = route === '/' ? 'index' : route.slice(1);
        res.sendFile(path.join(__dirname, 'public', `${page}.html`));
    });
});

app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        res.status(201).json({ 
            message: 'User added successfully!', 
            user: result.rows[0] 
        });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ 
            message: 'Error adding user', 
            error: err.message 
        });
    }
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
