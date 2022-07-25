import * as THREE from "three";
import Experience from "../Experience";

export default class marioLand {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    const getRandNumb = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.random() * (max - min + 1) + min;
    };

    this.randNum = (getRandNumb(1, 3.5) / 10).toFixed(2);

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
    this.model.geometry.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.includes("001")) {
          child.position.x =
            Math.sin(this.time.elapsed * 0.0005) * this.randNum -
            2.998856544494629;
          return;
        }
        if (child.name.includes("002")) {
          child.position.x =
            Math.cos(this.time.elapsed * 0.0005) * 0.15 - 3.1958062648773193;
          // console.log(child.position.x);
        }
        if (child.name.includes("003")) {
          child.position.x =
            Math.sin(this.time.elapsed * 0.0005) * this.randNum -
            3.2886857986450195;
        }
        if (child.name.includes("004")) {
          child.position.x =
            Math.cos(this.time.elapsed * 0.0005) * this.randNum -
            3.116790294647217;
          // console.log(child.position.x);
        }
        if (child.name.includes("005")) {
          child.position.x =
            Math.cos(this.time.elapsed * 0.0005) * this.randNum -
            3.340785503387451;
        }
        if (child.name.includes("006")) {
          child.position.x =
            Math.sin(this.time.elapsed * 0.0005) * this.randNum -
            3.724377393722534;
          // console.log(child.position.x);
        }
        if (child.name.includes("007")) {
          child.position.x =
            Math.cos(this.time.elapsed * 0.0005) * this.randNum -
            3.9110183715820312;
          // console.log(child.position.x);
        }
        if (child.name.includes("008")) {
          child.position.x =
            Math.sin(this.time.elapsed * 0.0005) * this.randNum -
            4.181217193603516;
          // console.log(child.position.x);
        }
        if (child.name.includes("009")) {
          child.position.x =
            Math.cos(this.time.elapsed * 0.0005) * this.randNum -
            4.342790126800537;
        }
      }
    });
  }
}
