import * as THREE from "three";
import Experience from "../Experience";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setModel();
  }

  setModel() {
    this.water = {};
    this.water.geometry = this.resources.items.water.scene;

    this.water.material = new THREE.MeshStandardMaterial({
      color: 0xa2faa,
    });

    this.scene.add(this.water.geometry);

    this.water.geometry.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.water.material;
      }
    });
  }
}
