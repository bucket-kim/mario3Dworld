import * as THREE from "three";
import Experience from "../Experience";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import buttonVertex from "../Shaders/Button/vertexShader.glsl";
import buttonFragment from "../Shaders/Button/fragmentShader.glsl";

export default class Button {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.sizes = this.experience.sizes;

    this.buttonArr = [];

    this.setModel();
  }

  setModel() {
    // set model
    this.model = {};
    this.model.geometry = this.resources.items.button.scene;

    // button texture
    this.model.buttonTexture = this.resources.items.marioButtonsTexture;
    this.model.buttonTexture.encoding = THREE.sRGBEncoding;
    this.model.buttonTexture.flipY = false;

    this.model.buttonMaterial = new THREE.MeshBasicMaterial({
      map: this.model.buttonTexture,
    });

    this.model.geometry.traverse((child) => {
      if (child.name.includes("button")) {
        child.material = this.model.buttonMaterial;
        child.receiveShadow = true;
      }
    });

    this.model.mesh = new THREE.Mesh(
      this.model.geometry.children,
      this.model.buttonMaterial
    );

    this.scene.add(this.model.mesh);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);

    this.raycaster.setFromCamera(this.mouse, this.camera.instance);

    this.intersects = this.raycaster.intersectObjects(
      this.model.geometry.children,
      true
    );

    const mouseMove = (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerWidth) * 2 + 1;
    };

    window.addEventListener("pointermove", mouseMove);
  }

  update() {}
}
