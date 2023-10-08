import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
renderer.setSize( window.innerWidth - 25, window.innerHeight - 25);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xFFB5D4D6);
// Load and set the texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load("./src/assets/images/Grid.png", function(texture) {
    scene.background = texture;
});

const camera = new THREE.PerspectiveCamera
  (45, window.innerWidth / window.innerHeight);
camera.position.set(0,1,3);

// Stores the initial position
const initialPosition = new THREE.Vector3(0, 1, 3);

// Add event listener for middle mouse button
canvas.addEventListener('mousedown', function(event) {
    // Middle mouse button was clicked
    if (event.button === 1) {
        camera.position.copy(initialPosition);
    }
});

const loader = new GLTFLoader();
loader.load('./src/assets/models/Wellhead.glb', function(gltf) {scene.add(gltf.scene);})
//     // Assuming gltf.scene is your 3D model
//     // Set the position of the light to be the same as the 3D model
//     light1.position.copy(gltf.scene.position);
//     light2.position.copy(gltf.scene.position);
//     light3.position.copy(gltf.scene.position);
//     // Attempt at setting camera position to to model

// Creates a point light
// const light1 = new THREE.PointLight( 0xfffff,20,100);
// light1.position.set(50,30,50);
// scene.add(light1);

// const light2 = new THREE.PointLight( 0xffffff,10,100);
// light2.position.set(-50,30,50);
// scene.add(light2);

// const light3 = new THREE.PointLight( 0xffffff,20,100);
// light3.position.set(0,30,-5);
// scene.add(light3);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.45);
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	// MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
};

// Enable rotation
controls.autoRotate = true;
// The speed at which the object rotates, in degrees per frame.
controls.autoRotateSpeed = -0.5; // 30 seconds per round when fps is 60

function animate() {

  requestAnimationFrame(animate);

  // Update the controls
    controls.update();
    renderer.render(scene,camera);
}

animate()