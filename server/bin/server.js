"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
const config_1 = require("./config");
class HTUServer {
    constructor() {
        this.app = express();
        this.server = http_1.createServer(this.app);
        this.io = socketIo(this.server);
        this.listen();
    }
    listen() {
        this.server.listen(config_1.config.port, () => {
            console.log('Running server on port %s', config_1.config.port);
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', config_1.config.port);
            socket.on('message', (m) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
}
exports.HTUServer = HTUServer;
//# sourceMappingURL=server.js.map