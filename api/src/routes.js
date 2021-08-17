const express = require('express');

const routes = express.Router();


// routes
routes.get('/', (req, res) => {
  res.send("Hello route");
});

module.exports = routes;