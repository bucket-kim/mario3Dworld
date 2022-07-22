import * as THREE from "three";
import Experience from "../Experience";

export default class marioLand {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.model = {};
    this.model.geometry = this.resources.items.cloud.scene;

    // land texture
    this.model.cloudTexture = this.resources.items.cloudTexture;
    this.model.cloudTexture.encoding = THREE.sRGBEncoding;
    this.model.cloudTexture.flipY = false;

    this.model.cloudMaterial = new THREE.MeshBasicMaterial({
      map: this.model.cloudTexture,
    });

    this.scene.add(this.model.geometry);

    this.model.geometry.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.model.cloudMaterial;
      }
    });
  }

  update() {
    // this.model.geometry.traverse((child) => {
    //   let randomNumb = Math.random();
    //   if (child instanceof THREE.Mesh) {
    //     child.position.x = Math.sin(this.time.elapsed * 0.0005) * 0.75 - 4;
    //   }
    // });
    this.model.geometry.position.x = Math.sin(this.time.elapsed * 0.0005) * 0.5;
  }
}
