import * as THREE from "three";
import Experience from "../Experience";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import buttonVertex from "../Shaders/Button/vertexShader.glsl";
import buttonFragment from "../Shaders/Button/fragmentShader.glsl";

export default class Button {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.renderer = this.experience.renderer;
    this.sizes = this.experience.sizes;

    this.bloom_layer = 1;

    this.raycaster = new THREE.Raycaster();
    this.buttons = [];

    this.mouse = new THREE.Vector2(0, 0);

    // raycasting

    this.setBloom();
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
      if (child instanceof THREE.Mesh) {
        child.material = this.model.buttonMaterial;
        child.receiveShadow = true;
        child.layers.enable(this.bloom_layer);
        child.userData.isContainer = true;

        // raycast
        // console.log(child.position);
      }
      this.renderer.renderer.domElement.addEventListener("mousemove", (e) => {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera.instance);

        this.intersects = this.raycaster.intersectObjects(
          this.model.geometry.children,
          true
        );

        if (this.intersects.length > 0) {
          // console.log(this.intersects[0].object);
        }
      });
    });

    this.scene.add(this.model.geometry);
  }

  setBloom() {
    this.materials = {};

    this.darkMat = new THREE.MeshBasicMaterial({
      color: "black",
    });

    this.darkenNonBloom = (obj) => {
      if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
        this.materials[obj.uuid] = obj.material;
        obj.material = this.darkMat;
      }
    };

    this.restoreMat = (obj) => {
      if (this.materials[obj.uuid]) {
        obj.material = this.materials[obj.uuid];
        delete this.materials[obj.uuid];
      }
    };

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.sizes.width, this.sizes.height),
      1.5,
      1,
      0.1
    );
    this.bloomPass.strength = 1;
    this.bloomPass.radius = 0.2;
    this.bloomPass.threshold = 0;

    this.bloomLayer = new THREE.Layers();
    this.bloomLayer.set(this.bloom_layer);

    this.renderPass = new RenderPass(this.scene, this.camera.instance);

    this.bloomComposer = new EffectComposer(this.renderer.renderer);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(this.renderPass);
    this.bloomComposer.addPass(this.bloomPass);

    this.finalComposer = new EffectComposer(this.renderer.renderer);
    this.finalComposer.addPass(this.renderPass);

    this.shaderPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: {
            value: null,
          },
          bloomTexture: {
            value: this.bloomComposer.renderTarget2.texture,
          },
        },
        vertexShader: buttonVertex,
        fragmentShader: buttonFragment,
        defines: {},
      }),
      "baseTexture"
    );

    this.shaderPass.needsSwap = true;

    this.finalComposer.addPass(this.shaderPass);
  }

  update() {
    this.bloomPass.strength = Math.sin(this.time.elapsed * 0.0025);

    this.scene.traverse(this.darkenNonBloom);
    this.bloomComposer.render();
    this.scene.traverse(this.restoreMat);
    this.finalComposer.render();
    this.renderer.renderer.setClearColor(0x000000);
    this.renderer.renderer.setClearAlpha(0);
  }
}
