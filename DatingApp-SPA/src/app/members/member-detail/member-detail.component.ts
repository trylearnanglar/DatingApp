import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  images: GalleryItem[];
  imageData: any[];


  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, public gallery: Gallery) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.imageData = this.getImages();
    this.images = this.imageData.map(img => new ImageItem({ src: img.src, thumb: img.thumb }));
  }

  getImages() {
    const imagesUrls = [];
    for (const photo of this.user.photos) {
      console.log(photo);
      imagesUrls.push({
        src: photo.url,
        thumb: photo.url
      });
    }
    console.log(imagesUrls);
    return imagesUrls;
  }
  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}

