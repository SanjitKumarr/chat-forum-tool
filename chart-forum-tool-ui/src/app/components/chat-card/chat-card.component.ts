import { Component, OnInit } from '@angular/core';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {
  roomInfo: any;
  messages: any = [];

  constructor(
    private roomInfoService: RoomInfoService
  ) { }

  ngOnInit(): void {
    this.roomInfo = this.roomInfoService.roomInfo;
  }
  currentMessage(event : any){
    this.messages.push(event.target.value);
    event.target.value = '';
  }
}
