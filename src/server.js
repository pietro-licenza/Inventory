const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3012, () => console.log('Rodando... na 3012'));
 