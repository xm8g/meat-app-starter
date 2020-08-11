"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs_1 = require("fs");
var https_1 = require("https");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// Use default router
server.use(router);
var options = {
    cert: fs_1.readFileSync('./backend/keys/cert.pem'),
    key: fs_1.readFileSync('./backend/keys/key.pem')
};
https_1.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
