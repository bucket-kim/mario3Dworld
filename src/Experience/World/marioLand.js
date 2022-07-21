import * as THREE from "three";
import Experience from "../Experience";

export default class marioLand {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setModel();
  }

  setModel() {
    this.model = {};
    this.model.geometry = this.resources.items.marioLand.scene;

    // land texture
    this.model.landTexture = this.resources.items.marioLandTexture;
    this.model.landTexture.encoding = THREE.sRGBEncoding;
    this.model.landTexture.flipY = false;

    // item texture
    this.model.itemTexture = this.resources.items.marioItemTexture;
    this.model.itemTexture.encoding = THREE.sRGBEncoding;
    this.model.itemTexture.flipY = false;

    this.model.landMaterial = new THREE.MeshBasicMaterial({
      map: this.model.landTexture,
    });

    this.model.itemMaterial = new THREE.MeshBasicMaterial({
      map: this.model.itemTexture,
    });

    this.scene.add(this.model.geometry);

    this.model.geometry.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log(child.name);
        if (child.name.includes("land")) {
          child.material = this.model.landMaterial;
        }

        if (child.name.includes("items")) {
          console.log("hi");
          child.material = this.model.itemMaterial;
        }
      }
    });
  }
}
