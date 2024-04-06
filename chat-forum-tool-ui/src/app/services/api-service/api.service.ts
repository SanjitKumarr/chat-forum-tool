import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/';
  constructor(private httpService: HttpService) { }

  getRoomInfo(): Observable<any>{
    let url = `${this.baseUrl}api`;
    return this.httpService.get(url);
  }

  addRoom(roomInfo: any): Observable<any>{
    let url = `${this.baseUrl}api/addRoom`;
    return this.httpService.post(url, roomInfo);
  }

  deleteRoom(roomId: string): Observable<any>{
    let url = `${this.baseUrl}api/deleteRoom/${roomId}`;
    return this.httpService.delete(url);
  }
}
