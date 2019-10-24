import * as fs from 'fs';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as crypto from 'crypto';
import HTUMessage from './models/htumessage';
import { Server, createServer } from 'http';


export class HTUServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    private keys: { [key: string]: any; } = {};

    private android_client: any;
    private cyborg_client: any;

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

            socket.on('make-group', (m: HTUMessage) => {
                console.log('[Client](make-group): %s', JSON.stringify(m));

                const key: string = Math.random().toString(36).substring(4,8).toUpperCase();
                this.keys[key] = m.data;

                socket.emit('make-group-response', {data: key});
            });

            socket.on('switch-clients', (m: HTUMessage) => {
                console.log('[Client](switch-clients): %s', JSON.stringify(m));
                
                this.io.emit('switch-clients-action', {data: m.data});
            });

            socket.on('verify', (m: HTUMessage) => {
                console.log('[Client](verify): %s', JSON.stringify(m));

                if (this.keys[m.data])
                    socket.emit('verify-response', {data: this.keys[m.data]});
                else
                    socket.emit('verify-response', {data: "no access"});
            });

            socket.on('auto-verify', (m: HTUMessage) => {
                console.log('[Client](auto-verify): %s', JSON.stringify(m));

                if (this.keys[m.data])
                    socket.emit('auto-verify-response', {data: this.keys[m.data]});
                else
                    socket.emit('auto-verify-response', {data: "no access"});
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