import * as fs from 'fs';
import * as express from 'express';
import * as socketIo from 'socket.io';
import HTUMessage from './models/htumessage';
import { Server, createServer } from 'https';


export class HTUServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();

        const privateKey = fs.readFileSync('/etc/letsencrypt/live/hturogue.tech/privkey.pem', 'utf8');
        const certificate = fs.readFileSync('/etc/letsencrypt/live/hturogue.tech/cert.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/hturogue.tech/chain.pem', 'utf8');

        this.server = createServer({ 
            key: privateKey,
            cert: certificate,
            ca: ca
         }, this.app);

        this.io = socketIo(this.server);
        this.listen();
    }

    private listen(): void {
        this.server.listen(8080, () => {
            console.log('Running server on port %s', 8080);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', 8080);

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