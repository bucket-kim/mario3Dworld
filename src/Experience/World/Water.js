import * as THREE from "three";
import Experience from "../Experience";
import waterVertex from "../Shaders/Ocean/vertexShader.glsl";
import waterFragment from "../Shaders/Ocean/fragmentShader.glsl";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.water = {};
    this.water.geometry = this.resources.items.water.scene;

    this.color = {};
    this.color.depthColor = "#3cacf2";
    this.color.surfaceColor = "#d1fcfc";

    this.water.material = new THREE.ShaderMaterial({
      uniforms: {
        uBigWavesElevation: {
          value: 0.0,
        },
        uBigWavesFrequency: {
          value: new THREE.Vector2(4.0, 1.5),
        },
        uTime: {
          value: 0,
        },
        uBigWaveSpeed: {
          value: 0.75,
        },
        uDepthColor: {
          value: new THREE.Color(this.color.depthColor),
        },
        uSurfaceColor: {
          value: new THREE.Color(this.color.surfaceColor),
        },
        uColorOffset: {
          value: 0.02,
        },
        uColorMultiplier: {
          value: 5.0,
        },
        uSmallWavesElevation: {
          value: 0.0,
        },
        uSmallWavesFrequency: {
          value: 2,
        },
        uSmallWavesSpeed: {
          value: 0.2,
        },
        uSmallIterations: {
          value: 2,
        },
      },
      vertexShader: waterVertex,
      fragmentShader: waterFragment,
    });

    this.water.geometry.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.water.material;
      }
    });
    this.scene.add(this.water.geometry);
  }

  update() {
    this.water.material.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}
