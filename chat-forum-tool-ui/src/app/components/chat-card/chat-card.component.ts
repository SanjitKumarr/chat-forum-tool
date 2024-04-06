import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';
import { SocketService } from 'src/app/services/socket-service/socket.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {
  roomInfo: any;
  messages: any = [];

  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.roomInfo = this.roomInfoService.roomInfo;
    this.socketService.joinRoom(this.roomInfo._id);
    this.socketService.getNewMessage().subscribe((message) => {
      this.messages.push(message);
    })
  }
  currentMessage(event : any){
    this.socketService.sendMessage(event.target.value);
    event.target.value = '';
  }
  backToRooms(){
    this.socketService.leaveRoom(this.roomInfo._id);
    this.router.navigate(['/room']);
  }
}
