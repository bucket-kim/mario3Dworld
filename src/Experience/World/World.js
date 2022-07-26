import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import marioLand from "./marioLand.js";
import Cloud from "./Cloud.js";
import Ocean from "./Ocean.js";
import Water from "./Water.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );

    // this.scene.add(testMesh);

    this.resources.on("ready", () => {
      // setup
      this.environment = new Environment();
      this.marioLand = new marioLand();
      this.cloud = new Cloud();
      this.ocean = new Ocean();
      this.water = new Water();
    });
  }

  update() {
    if (this.cloud) {
      this.cloud.update();
    }
    if (this.ocean) {
      this.ocean.update();
    }
    if (this.water) {
      this.water.update();
    }
  }
}
