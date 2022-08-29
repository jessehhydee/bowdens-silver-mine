import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VarStorageService {

  displayLoadingScreen:   any     = new BehaviorSubject(true);;
  displaySlidesThumbnail: any     = new BehaviorSubject(false);;
  currentTerrainIsMining: boolean = false;

  constructor() { }

  /**
   * @param displayloader - should loading screen <app-loader-overlay> be displayed when user enters /home
   * 
   * Update @var displayLoadingScreen with @param displayloader.
   */
  pullDisplayLoadingScreen = (displayloader: boolean) => {
    this.displayLoadingScreen.next(displayloader);
  }

  /**
   * @param displayThumbnail - should slides thumbnail modal <app-slides-thumbnail-modal> be displayed.
   * 
   * Update @var displaySlidesThumbnail with @param displayThumbnail.
   */
  pullDisplaySlidesThumbnail = (displayThumbnail: boolean) => {
    this.displaySlidesThumbnail.next(displayThumbnail);
  }

  pullCurrentTerrain = (viewingMining: boolean) => {
    this.currentTerrainIsMining = viewingMining;
  }

  pushCurrentTerrain = async () => {
    return this.currentTerrainIsMining;
  }

}
