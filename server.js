const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the necessary headers
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    next();
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/service-worker.js'), err => {
        if (err) {
            console.log("=====>please deploy the existing one")
            console.error(err);
            res.status(500).send(err);
        }
    });
});

app.get('/register-sw.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-sw.html'), err => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
});

module.exports = app;
