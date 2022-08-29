import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { VarStorageService } from 'src/app/services/var-storage.service';

@Component({
  selector: 'app-slides-thumbnail-modal',
  templateUrl: './slides-thumbnail-modal.component.html',
  styleUrls: ['./slides-thumbnail-modal.component.css']
})
export class SlidesThumbnailModalComponent implements OnInit {

  currentTerrainIsMining: boolean = false;

  constructor(
    private varStorage:   VarStorageService,
    private modalService: ModalService
  ) { }

  /**
   * The returned value of pushCurrentTerrain() determines whether to show user Year One image or Year Sixteen.
   */
  async ngOnInit() {
    this.currentTerrainIsMining = await this.varStorage.pushCurrentTerrain();
  }

  closeThumbnail = () => {
    this.varStorage.pullDisplaySlidesThumbnail(false);
  }

  displayAllSlides = () => {
    this.varStorage.pullDisplaySlidesThumbnail(false);
    this.modalService.openModal(this.currentTerrainIsMining);
  }

}
