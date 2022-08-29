import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { TerrainSwitchComponent } from './terrain-switch/terrain-switch.component';
import { ThreeDSwitchComponent } from './three-d-switch/three-d-switch.component';
import { SlidesThumbnailModalComponent } from './slides-thumbnail-modal/slides-thumbnail-modal.component';
import { SlidesModalComponent } from './slides-modal/slides-modal.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { LoaderOverlayComponent } from './loader-overlay/loader-overlay.component';

@NgModule({
  declarations: [
    TerrainSwitchComponent,
    ThreeDSwitchComponent,
    SlidesThumbnailModalComponent,
    SlidesModalComponent,
    LogoutButtonComponent,
    LoaderOverlayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule
  ],
  exports: [
    TerrainSwitchComponent,
    ThreeDSwitchComponent,
    SlidesThumbnailModalComponent,
    LogoutButtonComponent,
    LoaderOverlayComponent
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class ComponentsModule {}