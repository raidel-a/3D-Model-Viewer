import * as THREE from "three";

export function configureScene(scene, texturePath = "./assets/images/Grid.png") {
  // Set the background
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(texturePath, function (texture) {
    scene.background = texture;
  });

  // Add lights or other scene-related configuration
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
  scene.add(ambientLight);
}