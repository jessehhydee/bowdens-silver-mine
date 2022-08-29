import { Component, OnInit } from '@angular/core';
import { MiningEnvService } from 'src/app/services/mining-env.service';

@Component({
  selector: 'app-three-d-switch',
  templateUrl: './three-d-switch.component.html',
  styleUrls: ['./three-d-switch.component.css']
})
export class ThreeDSwitchComponent implements OnInit {

  goThreeD:     boolean = false;
  displayInfo:  boolean = false;

  constructor(
    private miningEnv: MiningEnvService 
  ) { }

  ngOnInit(): void {
  }

  /**
   * @param angleCamera - Change view to 3D?
   * 
   * Call toggleThreeD() to handle the changing of the camera position.
   * 
   * If user has changed view to 3D, display a message to user with instructions on how to rotate.
   * Do this after 4 seconds. 
   * 
   * After 14 seconds, dismiss the message.
   */
  toggleCameraAngle = (angleCamera: boolean) => {

    this.miningEnv.toggleThreeD(angleCamera);
    this.goThreeD = angleCamera;

    if(angleCamera) {
      setTimeout(() => this.displayInfo = true, 4000);
      setTimeout(() => this.displayInfo = false, 14000);
    }

  }

}
