import * as THREE from "three";
import Experience from "../Experience";

export default class marioLand {
  constructor() {
    console.log("mario");
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    console.log(this.debug);
  }
}
