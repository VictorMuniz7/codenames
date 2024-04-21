import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {

  router = inject(Router)

  createGame(){
    const uuid = uuidv4();
    this.router.navigate(['/game', uuid])
  }
}
