import socketIo from 'socket.io-client';
import ChatMessage from './interfaces/chatmessage';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://192.168.1.42:8080';

export class SocketService {
    private socket!: SocketIOClient.Socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: ChatMessage): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<ChatMessage> {
        return new Observable<ChatMessage>(observer => {
            this.socket.on('message', (data: ChatMessage) => observer.next(data));
        });
    }

    public onEvent(event: string): Observable<any> {
        return new Observable<string>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}