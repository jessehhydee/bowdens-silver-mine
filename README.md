# Run Project

1) npm install
2) ng serve --open

Login credentials:

Username: admin
Password: admin01

# Screenshots

![alt text](https://github.com/jessehhydee/bowdens-silver-mine/blob/main/src/assets/screenshots/landing.png?raw=true)

![alt text](https://github.com/jessehhydee/bowdens-silver-mine/blob/main/src/assets/screenshots/terrain.png?raw=true)

# Learnings

### Textures

I had the following set up to load textures because without loading textures the imported textures were flouresent.
I had dfficulty figuring out how to add multiple textures in the case of Mining_Facilities.
As you can see below, I had set up an array however only the last texture in the array waas being added.
Obviously, this is due to each material as it is added, overwritinng the previous material in the array.

After reading the following again, I came across the fix: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
All I need to to fix the issues was: renderer.outputEncoding = THREE.sRGBEncoding;

```javascript

loadGltf = () => {

const onLoad = async (gltf: any) => {

  let textures: any = [];

  switch(gltf.parser.json.images[0].uri) {
    case 'Textures/LowResAerial.jpg':
      textures = await getTextures(['assets/3d/Textures/LowResAerial.jpg']);
      this.outerTerrain = gltf;
      break;
    case 'Textures/Existing.jpg':
      textures = await getTextures(['assets/3d/Textures/Existing.jpg']);
      setBox(gltf.scene);
      this.preMiningView = gltf;
      break;
    case 'Textures/Year 16.jpg':
      textures = await getTextures(['assets/3d/Textures/Year 16.jpg']);
      this.miningView = gltf;
      break;
    case 'Textures/ConcreteBare0428_4_seamless_L.jpg':
      textures = await getTextures([
        'assets/3d/Textures/ConcreteBare0428_4_seamless_L.jpg',
        'assets/3d/Textures/130_metal-rufing-texture-seamless-green.jpg',
        'assets/3d/Textures/130_metal-rufing-texture-seamless.jpg',
        'assets/3d/Textures/185_metal-rufing-texture-seamless-2.jpg',
        'assets/3d/Textures/Berms.jpg',
        'assets/3d/Textures/MetalFloorsBare0037_5_S Grey.jpg',
        'assets/3d/Textures/roads uv.jpg',
        'assets/3d/Textures/Rom 02.jpg',
        'assets/3d/Textures/Rom pad.jpg',
        'assets/3d/Textures/WoodFine0058_30_seamless_M.jpg' 
      ]);
      this.miningFacilitiesView = gltf;
      break;
  }

  gltf.scene.traverse((node: any) => { 
        
    if(!node.isMesh) return;
    textures.forEach((el: THREE.MeshStandardMaterial) => {
      node.material.map = el;
    });

  });

  if(gltf === this.outerTerrain || gltf === this.preMiningView) this.scene.add(gltf.scene);

}

const getTextures = async (textureURLs: any) => {

  let textures: any = [];
  for(let i = 0; i < textureURLs.length; i++) {
    const texture   = this.textureLoader.load(textureURLs[i]);
    texture.flipY   = false;
    textures.push(
      texture
    );
  }

  return textures;
  
}

```

## Orbit Controls Manipulation

When animating the 3d to 2d transition, to land at the exact points everytime when toggled, 'controls.reset()' needed to occur.
The problem with this is that it was jumpy and not animated, so took away from the effect. 

After looking into what .reset() did, I found that changing controls.target xyz back to 0 worked as an alternative.
Now I could animate the reset() process by changing controls.target xyz back to 0 within the GSAPs .to() method.

```javascript

gsap.to(this.controls.target, {
  x:        0, 
  y:        0, 
  z:        0, 
  duration: 2
});

```

# Performance

I have changed all ground view images size to below 400kb.
They all exceeded over 3mb each before the change.
