import * as fs from 'fs';
import * as express from 'express';
import * as socketIo from 'socket.io';
import HTUMessage from './models/htumessage';
import { Server, createServer } from 'http';


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
        this.server.listen(8888, () => {
            console.log('Running server on port %s', 8888);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', 8888);

            socket.on('message', (m: HTUMessage) => {
                console.log('[Client](message): %s', JSON.stringify(m));
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