import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    // this.setSunLight();
    this.setEnvMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);
  }

  setEnvMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    // this.scene.environment = this.environmentMap.texture;
    // this.scene.background = this.environmentMap.texture;

    // this.scene.rotation.y = 10;

    // this.scene.rotation.y = Math.PI * 0.5;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.sphere = {};
    this.sphere.geo = new THREE.SphereGeometry(30, 32, 16);

    this.skyTexture = this.resources.items.skyTexture;
    this.skyTexture.encoding = THREE.sRGBEncoding;

    this.sphere.mat = new THREE.MeshBasicMaterial({
      map: this.skyTexture,
    });
    this.sphere.mat.side = THREE.DoubleSide;
    this.sphere.mesh = new THREE.Mesh(this.sphere.geo, this.sphere.mat);
    this.sphere.mesh.rotation.y = Math.PI * 3.15;
    this.sphere.mesh.position.y = -1;

    this.scene.add(this.sphere.mesh);

    // this.environmentMap.updateMaterial();

    // debug

    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterial);
    }

    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);
    }
  }
}
