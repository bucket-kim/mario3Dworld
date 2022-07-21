import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import marioLand from "./marioLand.js";

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
    });
  }

  update() {}
}
