const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controllerApi = require('./controllerApi');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', controllerApi);

// Server listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
