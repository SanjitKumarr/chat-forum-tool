import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';
import { SocketService } from 'src/app/services/socket-service/socket.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  roomInfo: any;
  messages: any = [];
  private newMessageSubscription!: Subscription;

  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.roomInfo = this.roomInfoService.roomInfo;
    this.socketService.joinRoom(this.roomInfo._id);
    this.newMessageSubscription = this.socketService.getNewMessage().subscribe((message) => {
      this.messages.push(message);
    })
  }
  currentMessage(event : any){
    this.messages.push(event.target.value);
    this.socketService.sendMessage(event.target.value, this.roomInfo._id);
    event.target.value = '';
  }
  backToRooms(){
    this.socketService.leaveRoom(this.roomInfo._id);
    this.router.navigate(['/room']);
  }

  ngOnDestroy(): void {
    this.socketService.socket.off('recieve-message');
    this.newMessageSubscription.unsubscribe();
  }
}
