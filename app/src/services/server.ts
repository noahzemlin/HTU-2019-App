import socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import HTUMessage from '../models/htumessage';
import Cookies from 'universal-cookie';

const SERVER_URL = 'https://hturogue.tech/';

export class SocketService {
    private socket!: SocketIOClient.Socket;
    private cookies!: Cookies;

    private role: string = "";
    private _loaded: boolean = false;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
        this.cookies = new Cookies();

        const pot_code = this.cookies.get('code');

        if (pot_code) {
            console.log('Found existing code');
            const sub = HTUServer.get().onEvent("auto-verify-response").subscribe((data) => {
                if (data.data !== "no access") {
                    this.role = data.data;
                } else {
                    this.cookies.remove('code');
                }
                this._loaded = true;
                sub.unsubscribe();
            });
            HTUServer.get().send('auto-verify', {data: pot_code});
        } else {
            this._loaded = true;
        }
    }

    public getRole(): string {
        return this.role;
    }

    public loaded(): boolean {
        return this._loaded;
    }

    public setCookie(key: string, value: string) {
        this.cookies.set(key, value);
    }

    public getCookie(key: string): string {
        return this.cookies.get(key);
    }

    public wipe() {
        this.cookies.remove('code');
    }

    public send(type: string, message: any): void {
        this.socket.emit(type, message);
    }

    public onEvent(event: string): Observable<any> {
        return new Observable<HTUMessage>(observer => {
            this.socket.on(event, (data: HTUMessage) => observer.next(data));
        });
    }
}

export default class HTUServer {
    private static socketService: SocketService = new SocketService();

    public static get(): SocketService {
        return HTUServer.socketService
    }
}