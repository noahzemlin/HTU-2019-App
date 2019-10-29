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

    private android_pos: number = 0;
    private cyborg_pos: number = 0;

    private client_to_type: { [key: string]: any; } = {};

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

        this.io.on('connect', (socket: socketIo.Socket) => {
            console.log('Connected client on port %s.', 8888);

            socket.on('message', (m: any) => {
                console.log('[Client](message): %s', JSON.stringify(m));
                this.io.emit('message', m);

                if (m.role === "Android") {
                    this.android_pos = this.android_pos + 1;
                    this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
                }

                if (m.role === "Cyborg") {
                    this.cyborg_pos = this.cyborg_pos + 1;
                    this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
                }
            });

            socket.on('make-group', (m: HTUMessage) => {
                console.log('[Client](make-group): %s', JSON.stringify(m));

                if (this.client_to_type[socket.id] !== "Admin")
                    return;

                const key: string = Math.random().toString(36).substring(4,8).toUpperCase();
                this.keys[key] = m.data;

                socket.emit('make-group-response', {data: key});
            });

            socket.on('switch-clients', (m: any) => {
                console.log('[Client](switch-clients): %s', JSON.stringify(m));

                if (this.client_to_type[socket.id] !== "Admin")
                    return;

                if (m.group === "Cyborg"){
                    if (!(m.pos === this.cyborg_pos + 1))
                        return;
                    this.cyborg_pos = m.pos;

                    if (m.pos === 1 || m.pos === 3) {
                        setTimeout(()=>{
                            if (this.cyborg_pos === m.pos) {
                                this.cyborg_pos = m.pos + 1;
                                this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
                            }
                        }, 15000);
                    }
                }
                if (m.group === "Android"){
                    if (!(m.pos === this.android_pos + 1))
                        return;
                    this.android_pos = m.pos;
                    
                    if (m.pos === 1 || m.pos === 3) {
                        setTimeout(()=>{
                            if (this.android_pos === m.pos) {
                                this.android_pos = m.pos + 1;
                                this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
                            }
                        }, 15000);
                    }
                }
                
                this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
            });

            socket.on('verify', (m: HTUMessage) => {
                console.log('[Client](verify): %s', JSON.stringify(m));

                if (this.keys[m.data]) {
                    const role = this.keys[m.data];
                    socket.emit('verify-response', {data: role});
                    this.client_to_type[socket.id] = role;
                }
                else if (m.data === "99SPOOK") {
                    const role = "Admin";
                    socket.emit('verify-response', {data: role});
                    this.client_to_type[socket.id] = role;
                }
                else
                {
                    socket.emit('verify-response', {data: "no access"});
                }
            });

            socket.on('auto-verify', (m: HTUMessage) => {
                console.log('[Client](auto-verify): %s', JSON.stringify(m));

                if (this.keys[m.data]) {
                    const role = this.keys[m.data];
                    socket.emit('auto-verify-response', {data: role});
                    this.client_to_type[socket.id] = role;
                }
                else if (m.data === "99SPOOK") {
                    const role = "Admin";
                    socket.emit('auto-verify-response', {data: role});
                    this.client_to_type[socket.id] = role;
                }
                else
                {
                    socket.emit('auto-verify-response', {data: "no access"});
                }
            });

            socket.on('finish', (m: HTUMessage) => {
                console.log('[Client](finish): %s', JSON.stringify(m));

                if (m.data === "Android") {
                    this.android_pos = 0;
                } else if (m.data === "Cyborg") {
                    this.cyborg_pos = 0;
                }

                this.io.emit('switch-clients-action', {cyborg_pos: this.cyborg_pos, android_pos: this.android_pos});
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