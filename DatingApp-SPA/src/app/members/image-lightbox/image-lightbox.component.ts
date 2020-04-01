import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightboxComponent implements OnInit {
  @Input() user: User;
  images = [];
  slideIndex = 0;

  constructor() { }

  ngOnInit() {
    this.images = this.getImages();
  }

  getImages() {
    const imagesUrls = [];
    for (const photo of this.user.photos) {
      imagesUrls.push({
        id: photo.id,
        url: photo.url
      });
    }
    return imagesUrls;
  }

   openModal() {
    document.getElementById('imgModal').style.display = 'block';
   }
   closeModal() {
    document.getElementById('imgModal').style.display = 'none';
   }
   plusSlides(n) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n) {
    this.showSlides(this.slideIndex = n);
   }
   showSlides(slideIndex);

   showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('img-slides') as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName('images') as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1;
    }
    if (n < 1) {
     this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += ' active';
    }
   }
}
