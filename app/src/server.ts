import socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://192.168.1.42:8080';

export class SocketService {
    private socket!: SocketIOClient.Socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: string): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('message', (data: string) => observer.next(data));
        });
    }

    public onEvent(event: string): Observable<any> {
        return new Observable<string>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}