import * as THREE from "three";

export function configureScene(scene) {
  // Set the background
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("./assets/images/Grid.png", function (texture) {
    scene.background = texture;
  });

  // Add lights or other scene-related configuration
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  // Add any other scene configuration here
}