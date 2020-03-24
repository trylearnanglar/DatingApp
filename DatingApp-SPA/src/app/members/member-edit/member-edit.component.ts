import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  introduction: any;
  lookingFor: any;
  interests: any;
  city: any;
  country: any;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.checkchange()) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    this.introduction = this.user.introduction;
    this.lookingFor = this.user.lookingFor;
    this.interests = this.user.interests;
    this.city = this.user.city;
    this.country = this.user.country;
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile update successful');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  checkchange(): boolean {
    if (this.introduction !== this.user.introduction
        || this.lookingFor !== this.user.lookingFor
        || this.interests !== this.user.interests
        || this.city !== this.user.city
        || this.country !== this.user.country
        ) {
      return true;
    } else {
      return false;
    }
  }

  updateMainphoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
