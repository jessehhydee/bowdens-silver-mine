import { Component, OnInit } from '@angular/core';
import { MiningEnvService } from 'src/app/services/mining-env.service';
import { VarStorageService } from 'src/app/services/var-storage.service';

@Component({
  selector: 'app-terrain-switch',
  templateUrl: './terrain-switch.component.html',
  styleUrls: ['./terrain-switch.component.css']
})
export class TerrainSwitchComponent implements OnInit {

  displayProposed: boolean = false;

  constructor(
    private miningEnv:  MiningEnvService,
    private varStorage: VarStorageService
  ) { }

  ngOnInit(): void {
  }

  /**
   * @param proposed - Has the user clicked the proposed button?
   * 
   * Toggle the terrain based on what buttonwas clicked.
   * Pass the new terrain change to pullCurrentTerrain() so that other classes have access to current terrain.
   * Dismiss thumbnail modal.
   * 
   * @returns 
   */
  toggleTerrain = (proposed: boolean) => {

    if(this.displayProposed == proposed) return;

    this.miningEnv.toggleMining(proposed);
    this.varStorage.pullCurrentTerrain(proposed);
    this.varStorage.pullDisplaySlidesThumbnail(false);
    this.displayProposed = proposed;

  }

}
