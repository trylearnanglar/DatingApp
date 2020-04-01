import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { AuthService } from 'src/app/_services/auth.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('ctdTabset') ctdTabset;
  user: User;
  images: GalleryItem[];
  imageData: any[];
  selectedTabs: any;
  tabId = 'about';


  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService,
              private route: ActivatedRoute, public gallery: Gallery) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedTabs = params.tab;
      this.tabId = params.tab;
    });
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

  switchNgBTab(id: string) {
    this.ctdTabset.select(id);
  }
}

