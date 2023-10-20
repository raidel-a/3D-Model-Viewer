import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { configureScene } from "./sceneConfig"; // Ensure correct path

// Constants and Variables
const { ROTATE, PAN } = THREE.MOUSE;
const webglCanvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: webglCanvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Setup
const scene = new THREE.Scene();
configureScene(scene);
const camera = setupCamera();
const controls = setupControls(camera, webglCanvas);

// Fetch model data and populate dropdown
fetch("/models.json")
  .then((response) => response.json())
  .then((data) => {
    populateDropdown(data);

    const lastSelectedModel = localStorage.getItem("selectedModel");
    if (lastSelectedModel) {
      document.getElementById("modelSelector").value = lastSelectedModel;
    }

    loadModel(scene); // Load the initial or last selected model once the dropdown is populated
  })
  .catch((error) => console.error("Error fetching model data:", error));

// Event Listeners
document
  .getElementById("modelSelector")
  .addEventListener("change", () => loadModel(scene));
document
  .getElementById("toggleRotation")
  .addEventListener("click", toggleAutoRotate);

document
  .getElementById("shadedModeButton")
  .addEventListener("click", () => switchRenderMode("shaded"));
document
  .getElementById("wireframeModeButton")
  .addEventListener("click", () => switchRenderMode("wireframe"));

function switchRenderMode(mode) {
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.material.wireframe = mode === "wireframe";
    }
  });

  // Save the current render mode to local storage
  localStorage.setItem("selectedRenderMode", mode);
}

const lastSelectedRenderMode =
  localStorage.getItem("selectedRenderMode") || "shaded"; // default to 'shaded' if not found in local storage
switchRenderMode(lastSelectedRenderMode); // Apply the render mode

if (lastSelectedRenderMode === "wireframe") {
  document.getElementById("wireframeModeButton").classList.add("selected");
} else {
  document.getElementById("shadedModeButton").classList.add("selected");
}
switchRenderMode(); // Apply the initial or last selected render mode

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Helper Functions
function setupCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1, 1, 1);
  return camera;
}

function setupControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;
  controls.enableDamping = true;
  controls.rotationSpeed = 0.5;
  controls.mouseButtons = {
    LEFT: ROTATE,
    RIGHT: PAN,
  };
  return controls;
}

function populateDropdown(models) {
  const modelSelector = document.getElementById("modelSelector");
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.path;
    option.innerText = model.name;
    modelSelector.appendChild(option);
  });
}

function loadModel(scene) {
  const loader = new GLTFLoader();
  const selectedModelPath = document.getElementById("modelSelector").value;

  // Feedback: Show spinner
  document.getElementById("loadingSpinner").style.display = "block";

  loader.load(
    selectedModelPath,
    (gltf) => {
      // Remove previous models
      scene.children.forEach((child) => {
        if (child.isMesh || child.isGroup) {
          scene.remove(child);
        }
      });
      scene.add(gltf.scene);

      // Save the current selection to local storage
      localStorage.setItem("selectedModel", selectedModelPath);

      // Feedback: Hide spinner
      document.getElementById("loadingSpinner").style.display = "none";
    },
    undefined,
    (error) => {
      console.error("An error occurred:", error);

      // Feedback: Hide spinner, show error
      document.getElementById("loadingSpinner").style.display = "none";
      const errorMessageDiv = document.getElementById("errorMessage");
      errorMessageDiv.innerText = "Failed to load the model. Please try again.";
      errorMessageDiv.style.display = "block";

      // Hide error message after 5 seconds
      setTimeout(() => {
        errorMessageDiv.style.display = "none";
      }, 5000);
    }
  );
}

function toggleAutoRotate() {
  controls.autoRotate = !controls.autoRotate;
}
