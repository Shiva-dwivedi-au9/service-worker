const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the necessary headers
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    next();
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/service-worker.js'));
});

app.get('/register-sw.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-sw.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
