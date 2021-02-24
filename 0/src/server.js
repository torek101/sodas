const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Hello, World!');
});

app.get('/hello', (_req, res) => {
    res.send('Hello there!');
});

app.post('/add', (req, res) => {
    console.log(req.body);
    res.send(`${req.body.a} + ${req.body.b}`);
});

app.listen(3000, () => {
    console.log('Listening!');
});