const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public_html'));

app.get('/api', (_, res) => res.send({ message: 'Hello world.' }));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))