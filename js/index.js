import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

/* ALTERNATIVE IMPORT */
// import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

class App {
  _renderer;
  _camera;
  _scene;
  _controls;

  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._SetRenderer();
    this._SetCamera();
    this._SetScene();
    this._SetControls();
    this._Animate();
  }

  _SetRenderer() {
    this._renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas"),
      antialias: true,
    });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener("resize", () => this._OnWindowResize(), false);
  }

  _SetCamera() {
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 0, 25);
  }

  _SetScene() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0xffffff);
    /* fading geometry to a specific color
    based on the distance from the camera */
    this._scene.fog = new THREE.FogExp2(0x89b2eb, 0.002);

    const spotLight = new THREE.SpotLight(0xeeeece);
    spotLight.position.set(1000, 1000, 1000);
    this._scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xddddce);
    spotLight2.position.set(-500, -500, -500);
    this._scene.add(spotLight2);

    this.addTorus()
  }

  _SetControls() {
    const canvas = this._renderer.domElement;
    this._controls = new OrbitControls(this._camera, canvas);
  }

  _Animate() {
    requestAnimationFrame((time) => this._Animate());

    this._torus.rotation.x += 0.01;
    this._torus.rotation.y += 0.005;
    this._torus.rotation.z += 0.01;

    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  addTorus(){
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xfcc742,
      emissive: 0x111111,
      specular: 0xffffff,
      metalness: 1,
      roughness: 0.55,
      // wireframe: true,
    });
    this._torus = new THREE.Mesh(geometry, material);

    this._scene.add(this._torus);
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new App();
});