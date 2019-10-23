import socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import HTUMessage from '../models/htumessage';

const SERVER_URL = 'https://hturogue.tech/';

export class SocketService {
    private socket!: SocketIOClient.Socket;
    private channel: number = 1;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: HTUMessage): void {
        this.socket.emit('message', message);
    }

    public setChannel(channel: number) {
        this.channel = channel;
    }

    public getChannel(): number {
        return this.channel
    }

    public onMessage(): Observable<HTUMessage> {
        return new Observable<HTUMessage>(observer => {
            this.socket.on('message', (data: HTUMessage) => {if (data.channel === this.channel) {observer.next(data);}});
        });
    }

    public onEvent(event: string): Observable<any> {
        return new Observable<HTUMessage>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}

export default class HTUServer {
    private static socketService: SocketService = new SocketService();

    public static get(): SocketService {
        return HTUServer.socketService
    }
}