import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MiningEnvService } from 'src/app/services/mining-env.service';
import { VarStorageService } from 'src/app/services/var-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('showSlidesElement') public showSlidesElement: ElementRef;
  @ViewChild('terrainCanvas')     public terrainCanvas:     ElementRef<HTMLCanvasElement>;

  displayLoadingScreen:   boolean = true;
  displaySlidesThumbnail: boolean = false;

  constructor(
    private miningEnv: MiningEnvService,
    private varStorage: VarStorageService
  ) {}

  /**
   * Begin listening to any changes to displayLoadingScreen.
   * Accessed via varStorage.
   * 
   * Call displayTerrain() to handle the display of mining landscape.
   * 
   * Begin listening to any changes to displaySlidesThumbnail.
   * Accessed via varStorage.
   */
  async ngAfterViewInit() {
    this.varStorage.displayLoadingScreen.subscribe((update: boolean) => this.displayLoadingScreen = update);
    this.miningEnv.displayTerrain(this.terrainCanvas, this.showSlidesElement);
    this.varStorage.displaySlidesThumbnail.subscribe((update: boolean) => this.displaySlidesThumbnail = update);
  }

  /**
   * Toggle displaySlidesThumbnail.
   * 
   * Pass new value of displaySlidesThumbnail to pullDisplaySlidesThumbnail() to other classes can access this updated value.
   */
  showSlides = () => {
    this.displaySlidesThumbnail ? this.displaySlidesThumbnail = false : this.displaySlidesThumbnail = true;
    this.varStorage.pullDisplaySlidesThumbnail(this.displaySlidesThumbnail);
  }

}
