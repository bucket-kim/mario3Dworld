import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControl();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );

    this.instance.position.set(2, 4, 9);
    this.scene.add(this.instance);
  }

  setOrbitControl() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;

    this.controls.minDistance = 1;
    this.controls.maxDistance = 10;

    this.controls.zoomSpeed = 0.25;

    const minPan = new THREE.Vector3(-3, -0.75, -2);
    const maxPan = new THREE.Vector3(3, 1, 2);
    const _v = new THREE.Vector3();
    this.controls.addEventListener("change", () => {
      _v.copy(this.controls.target);
      this.controls.target.clamp(minPan, maxPan);

      _v.sub(this.controls.target);
      this.instance.position.sub(_v);
    });
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
