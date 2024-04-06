import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})

export class RoomCardComponent implements OnInit {
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  roomsInfo:any = [];
  roomCreationCode!: string;
  modalRef!: NgbModalRef;
  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.roomsInfo = [{
      roomId: 'ae7ef6ac-a461-4033-a937-46bc19f5d097',
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

  openModal(){
    this.modalRef = this.modalService.open(ModalComponent);
    this.modalRef.result.then((newRoomData)=>{
      if(newRoomData.isCreationCode){
        this.roomsInfo.push({
          roomId: '',
          roomName: newRoomData.roomName
        })
      }
    })
  }

  addCard(code:string){
    this.roomCreationCode = code;
  }

  deleteRoom(idx:number){
    this.roomsInfo.splice(idx, 1);
  }
}
