import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})

export class RoomCardComponent implements OnInit {
  roomsInfo:any = [];
  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomsInfo = [{
      roomId: '',
      roomName: 'Test'
    },
    {
      roomId: '',
      roomName: 'Test1'
    },
    {
      roomId: '',
      roomName: 'Test2'
    },
    {
      roomId: '',
      roomName: 'Test3'
    }];
  }

  setRoomInfo(singleRoomInfo:any){
    this.roomInfoService.roomInfo = singleRoomInfo;
    this.router.navigate(['/chat']);
  }

}
