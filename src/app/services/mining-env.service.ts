import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { gsap } from "gsap";
import { VarStorageService } from './var-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MiningEnvService {

  scene:                THREE.Scene;
  camera:               THREE.PerspectiveCamera;
  renderer:             THREE.WebGLRenderer;
  controls:             OrbitControls;
  loadingManager:       THREE.LoadingManager;
  gltfLoader:           GLTFLoader;
  light:                THREE.AmbientLight;
  labelRenderer:        CSS2DRenderer
  showSlidesObj:        CSS2DObject;
  outerTerrain:         GLTF;
  preMiningView:        GLTF;
  miningView:           GLTF;
  miningFacilitiesView: GLTF;

  constructor(
    private varStorage: VarStorageService
  ) {
  }

  /**
   * @param canvas            - The canvas element to attach our GLTF models too.
   *                            Found in /home
   * @param showSlidesButton  - Pin element to attach to our GLTF models.
   *                            Found in /home
   * 
   * Create scene.
   * 
   * Create perspecctive camera and set position above center of all modals, looking down (birds eye view).
   * Add to scene.
   * 
   * Create renderer, passing it @param canvas to allow rendering to occur within the canvas element.
   * Update renderer.outputEncoding to allow RGB encoding.
   * Means that attach textures to our GLTFs will be layered on GLTF's are loaded.
   * Without RGB encoding, textures would need to be loaded manually. 
   * 
   * Create orbit controls.
   * Disable rotation (enabled when user toggles to 3d mode).
   * Listen to changes to our orbit controls - call restrictOrbitPan() if changes are made.
   * 
   * Create loading manager.
   * Once all GLTF's are loaded within loadGltf(), using our loading manager onLoad() method, pass false to pullDisplayLoadingScreen() to remove the loading screen.
   * 
   * Create GLTF loader.
   * Call loadGltf() to handle the loading of all GLTFs.
   * 
   * Set up ambient lighting to ensure all areas of scene are lit.
   * 
   * Call renderSlidesButton() passing it @param showSlidesButton
   * This handles the attachment of @param showSlidesButton to our GLTF models.
   * 
   * Begin animation loop by calling tick().
   * 
   * Begin listening to the window resize event.
   */
  displayTerrain = (canvas: any, showSlidesButton: ElementRef) => {

    this.scene  = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0.15, 9000, 19);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.controls = new OrbitControls(this.camera, canvas.nativeElement);
    this.controls.enableDamping = true;
    this.controls.minDistance   = 2300;
    this.controls.maxDistance   = 12000;
    this.controls.enableRotate  = false;
    this.controls.mouseButtons  = {
      LEFT:   THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT:  THREE.MOUSE.PAN
    };
    this.controls.addEventListener("change", this.restrictOrbitPan);

    this.loadingManager         = new THREE.LoadingManager();
    this.loadingManager.onLoad  = () => this.varStorage.pullDisplayLoadingScreen(false)

    this.gltfLoader             = new GLTFLoader(this.loadingManager);
    this.loadGltf();

    this.light = new THREE.AmbientLight(0xfcfcfc, 1.1);
    this.scene.add(this.light);

    this.renderSlidesButton(showSlidesButton);

    this.tick();

    window.addEventListener('resize', this.onWindowResize, false);
    
  };

  /**
   * This is call everytime the orbit controls are used.
   * 
   * Set @var minPan & @var maxPan to the max distance away from the center of our GLTFs we want the user to explore.
   * 
   * If users meets these max distances, clamp the camera.
   * In other words, revert the camera position back to the last acceptable distance (6000).
   */
  restrictOrbitPan = () => {
  
    var minPan  = new THREE.Vector3(-6000, 0, -6000);
    var maxPan  = new THREE.Vector3(6000, 0, 6000);
    var v       = new THREE.Vector3();
  
    v.copy(this.controls.target);
    this.controls.target.clamp(minPan, maxPan);
    v.sub(this.controls.target);
    this.camera.position.sub(v);

  }

  /**
   * Load each GLTF.
   */
  loadGltf = () => {

    /**
     * @param gltf - GLTF to load and add to scene.
     * 
     * Each GLTF has unique code to be run after being loaded.
     * The switch allows us to determine which GLTF is being loaded, and then run that GLTF unique code.
     * Store the GLTF to their respected variable.
     * 
     * For 'Terrain_Existing', call setBox() to set up a box for the camera to refer to when moving about.
     * This only needs to be called on one of the GLTFs so the initially visible GLTF (Terrain_Existing) has been selected for this.
     * 
     * This is only called when /home is routed too, so only add Terrain_Outer and Terrain_Existing to scene.
     */
    const onLoad = async (gltf: any) => {

      switch(gltf.parser.json.images[0].uri) {
        case 'Textures/LowResAerial.jpg':
          this.outerTerrain = gltf;
          break;
        case 'Textures/Existing.jpg':
          setBox(gltf.scene);
          this.preMiningView = gltf;
          break;
        case 'Textures/Year 16.jpg':
          this.miningView = gltf;
          break;
        case 'Textures/ConcreteBare0428_4_seamless_L.jpg':
          this.miningFacilitiesView = gltf;
          break;
      }

      if(gltf === this.outerTerrain || gltf === this.preMiningView) this.scene.add(gltf.scene);

    }

    /**
     * @param scene - Terrain_Existing.gltf
     * 
     * Create box3 set from @param scene
     * Get to box size and store to @var boxSize
     * 
     * Set camera FOV based on @var boxSize
     * 
     * Update camera.
     */
    const setBox = (scene: any) => {

      const box       = new THREE.Box3().setFromObject(scene);
      const boxSize   = box.getSize(new THREE.Vector3()).length();

      this.camera.near  = boxSize / 50;
      this.camera.far   = boxSize * 50;

      this.camera.updateProjectionMatrix();

    }

    this.gltfLoader.load('assets/3d/Terrain_Outer.gltf', onLoad);
    this.gltfLoader.load('assets/3d/Terrain_Existing.gltf', onLoad);
    this.gltfLoader.load('assets/3d/Terrain_Year16.gltf', onLoad);
    this.gltfLoader.load('assets/3d/Mining_Facilities.gltf', onLoad);

  };

  renderSlidesButton = (slidesButton: ElementRef) => {

    this.labelRenderer = new CSS2DRenderer();
		this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.labelRenderer.domElement);

    this.showSlidesObj = new CSS2DObject(slidesButton.nativeElement);
    this.showSlidesObj.position.set(2340, 590, 670);
    this.scene.add(this.showSlidesObj);

  }

  /**
   * The is continually called on a loop during the users session.
   * 
   * Attach the scene and camera to the renderer.
   * Attach the scene and camera to the labelRenderer.
   */
  tick = () => {
    
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);

  };

  /**
   * This is called everytime the users window is resized.
   * 
   * Update camera aspect to fit the updated window.
   * Update the renderer size to fit the updated window.
   * Update the labelRenderer size to fit the updated window.
   */
  onWindowResize = () => {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);

  }

  /**
   * This toggles the GLTF the user sees.
   * 
   * @param showMining - Is the user requesting to see the mining and mining facilities GLTF?
   * 
   * If true:
   * Remove our preMining scene from the parent scene (this.scene).
   * Add mining scene & mining facilities scene.
   * 
   * Reverse if false.
   */
  toggleMining = (showMining: boolean) => {

    if(showMining) {
      this.scene.remove(this.preMiningView.scene);
      this.scene.add(this.miningView.scene);
      this.scene.add(this.miningFacilitiesView.scene);
      return;
    }

    this.scene.remove(this.miningView.scene);
    this.scene.remove(this.miningFacilitiesView.scene);
    this.scene.add(this.preMiningView.scene);


  }

  /**
   * The toggles the users camera view between 2D & 3D.
   * 
   * @param goThreeD - Is the user requesting to view the scene in 3D?
   * 
   * If true:
   * Animate the camera position changing postion to (x: 3120, y: 1865, z: 2225) over 3 seconds.
   * This position is the perfect angle to view the scene in 3D from.
   * 
   * Animate (using GSAP) our controls.target position back to 0 (xyz) over 2 seconds.
   * Same as calling controls.reset().
   * 
   * Set contorls minPolarAngle & maxPolarAngle to the same position to lock orbit controls rotation on a ceratin horizontal axis.
   * Have done this to ensure that the user does not rotate under our scene.
   * This also makes for a nicer rotation experience for the user by only needing to worry about rotation on one axis.
   * 
   * Enable rotation in orbit controls.
   * 
   * 
   * If False:
   * Using GSAP, revert camera position back to original birds eye view position (same as when user is displayed the scene).
   * 
   * Using GSAP, revert controls.target position back to 0 (xyz).
   * 
   * Set contorls minPolarAngle & maxPolarAngle back.
   * 
   * Disable rotation.
   * 
   */
  toggleThreeD = (goThreeD: boolean) => {

    if(goThreeD) {

      gsap.to(this.camera.position, {
        x:        3120, 
        y:        1865, 
        z:        2225, 
        duration: 3
      });
      gsap.to(this.controls.target, {
        x:        0, 
        y:        0, 
        z:        0, 
        duration: 2
      });

      this.controls.minPolarAngle = this.controls.maxPolarAngle = 1.1178632068631476;
      this.controls.enableRotate  = true;
      this.controls.mouseButtons  = {
        LEFT:   THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
      };

      return;

    }

    gsap.to(this.camera.position, {
      x:        0.15, 
      y:        9000, 
      z:        19, 
      duration: 3
    });
    gsap.to(this.controls.target, {
      x:        0, 
      y:        0, 
      z:        0, 
      duration: 2
    });

    this.controls.minPolarAngle = this.controls.maxPolarAngle = 0.0021111737630217517;
    this.controls.enableRotate  = false;
    this.controls.mouseButtons  = {
      LEFT:   THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT:  THREE.MOUSE.PAN
    };

  }

}
