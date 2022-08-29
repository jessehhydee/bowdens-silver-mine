import { Component, OnInit, Inject } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';
Swiper.use([Pagination, Navigation]);

@Component({
  selector: 'app-slides-modal',
  templateUrl: './slides-modal.component.html',
  styleUrls: ['./slides-modal.component.css']
})
export class SlidesModalComponent implements OnInit {

  swiperOpts: SwiperOptions = {
    slidesPerView:  1,
    spaceBetween:   100,
    speed:          700,
    pagination:     true,
    navigation:     true
  };

  constructor(
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) private displayYearSixteen:  any
  ) { }

  /**
   * Based on what terrain is showing, set the initial slide of the carousel to match.
   */
  ngOnInit(): void {
    if(this.displayYearSixteen) this.swiperOpts.initialSlide = 4;
    else this.swiperOpts.initialSlide = 0;
  }

  closeModal = () => {
    this.modalService.closeModal();
  }

}
