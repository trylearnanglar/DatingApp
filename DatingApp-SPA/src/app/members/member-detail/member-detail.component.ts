import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';

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
  selectedTab: any;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, public gallery: Gallery) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.imageData = this.getImages();
    this.images = this.imageData.map(img => new ImageItem({ src: img.src, thumb: img.thumb }));

    this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'];
      console.log(this.selectedTab);
    });
  }

  getImages() {
    const imagesUrls = [];
    for (const photo of this.user.photos) {
      imagesUrls.push({
        src: photo.url,
        thumb: photo.url
      });
    }
    return imagesUrls;
  }

  switchNgBTab(id: string) {
    this.ctdTabset.select(id);
  }
  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}

