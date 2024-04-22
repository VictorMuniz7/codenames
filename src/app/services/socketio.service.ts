import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket!: Socket

  constructor() { }

  connect(gameId: string){
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.socket.emit('joinGame', {gameId: gameId})
  }

  startGame(gameId: string){
    this.socket.emit('startGame', {gameId: gameId})
  }

  sendGameUpdate(gameId: string, words: any){
    this.socket.emit('gameUpdate', {gameId: gameId, words: words})
  }

  stopGame(gameId: string){
    this.socket.emit('stopGame', {gameId: gameId})
  }

  receiveEvents(event: string): Observable<any>{
    return new Observable((observer) => {
      this.socket.on(event, (response) => {
        observer.next(response)
      })
    })
  }

  receiveGameUpdate(gameId: string): Observable<any>{
    return new Observable((observer) => {
      this.socket.on(gameId, words => {
        observer.next(words)
      })
    })
  }
}
