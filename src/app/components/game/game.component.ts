import { Component, OnInit, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { NgStyle, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Word{
  word: string,
  color: string,
  selected: boolean
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule, UpperCasePipe, FormsModule, NgStyle],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  gameId!: string;
  role: string = 'operative';
  words: Word[] = []

  itemRepeat = Array(25).fill(0);

  socketIoService = inject(SocketioService)
  route = inject(ActivatedRoute)
  snackbar = inject(MatSnackBar)

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id') ?? '';
    this.socketIoService.connect(this.gameId);
    this.receiveEvents();
    this.receiveGameUpdate();
  }

  nextGame(){
    this.socketIoService.startGame(this.gameId);
  }

  startGame(){
    this.socketIoService.startGame(this.gameId);
  }

  clickWord(word: Word){
    word.selected = true
    this.socketIoService.sendGameUpdate(this.gameId, this.words)
  }

  receiveEvents(){
    this.socketIoService.receiveEvents('joinGame').subscribe((message) => {
      this.snackbar.open(message, '', {
        duration: 3000
      })
    })
    this.socketIoService.receiveEvents('startGame').subscribe((words) => {
      this.role = 'operative'
      this.words = words
    })
  }

  receiveGameUpdate(){
    this.socketIoService.receiveGameUpdate(this.gameId).subscribe((words) => {
      this.words = words
    })

  }
}
