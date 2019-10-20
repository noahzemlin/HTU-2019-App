import * as fs from 'fs';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { config } from './config';
import HTUMessage from './models/htumessage';
import { Server, createServer } from 'https';


export class HTUServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.server = createServer({ 
            key: fs.readFileSync('/etc/letsencrypt/live/hturogue.tech/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/hturogue.tech/fullchain.pem') 
         }, this.app);
        this.io = socketIo(this.server);
        this.listen();
    }

    private listen(): void {
        this.server.listen(config.port, () => {
            console.log('Running server on port %s', config.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', config.port);

            socket.on('message', (m: HTUMessage) => {
                console.log('[Client](message): %s', JSON.stringify(m));
                console.log('[Sever](message): %s', JSON.stringify(m));
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