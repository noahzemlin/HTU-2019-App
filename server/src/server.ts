import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import ChatMessage from './models/chatmessage';
import { config } from './config';


export class HTUServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.listen();
    }

    private listen(): void {
        this.server.listen(config.port, () => {
            console.log('Running server on port %s', config.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', config.port);
            socket.on('message', (m: ChatMessage) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}