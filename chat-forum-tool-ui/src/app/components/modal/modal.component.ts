import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('content') private modalContent!: TemplateRef<ModalComponent>;
  @Output() codeEvent = new EventEmitter();
  private modalRef!: NgbModalRef;
  name: string = '';

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open() {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve,resolve);
      console.log('test');
      this.codeEvent.emit(this.name);
    })
  }
}
