import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  @Output() updateSelectedRoles: EventEmitter<any> = new EventEmitter();
  @Input() initialStare;
  user: User;
  roles: any[];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.user = this.initialStare.user;
    this.roles = this.initialStare.roles;
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.activeModal.close();
  }
}
