# Interactive 3D Model Viewer

## Description
This project is an interactive 3D model viewer built with Three.js. It allows you to load GLTF models, set up a scene with lighting and background texture, and control the camera movement with OrbitControls.

## Installation
1. Clone this repository.
2. Install the necessary dependencies: npm install, npm install three
      npm create vite@latest
3. Run the project: npm run dev

## Usage
Open the web page in your browser. You can interact with the 3D model using your mouse:
- Left click and drag to rotate the model.
- Middle click to reset the camera to its initial position.
- Right click and drag to pan the view.
- Scroll to zoom in and out.
- When being interacted with model will auto-rotate

## Code Structure
The main JavaScript file sets up a Three.js scene, including a WebGL renderer, a perspective camera, and OrbitControls for the camera. It also loads a GLTF model into the scene.

## Contributing
Contributions are welcome! Please read the contributing guidelines first.

## Contact
If you have any questions, feel free to reach out.

## License
This project is licensed under the FIU License.


# Refrences (incomplete)
https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event

https://developer.mozilla.org/en-US/docs/Web/API/Window

https://github.com/mrdoob/three.js

https://threejs.org/docs/#api/en/math/Color

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls.autoRotate

https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls.listenToKeyEvents

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas

https://www.coding-dude.com/wp/wp-content/uploads/2020/09/HTML5-canvas-cheat-sheet.pdf