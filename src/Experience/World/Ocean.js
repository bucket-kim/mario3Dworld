import * as THREE from "three";
import Experience from "../Experience";
import oceanVertex from "../Shaders/Ocean/vertexShader.glsl";
import oceanFragment from "../Shaders/Ocean/fragmentShader.glsl";

export default class Ocean {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time;

    this.setOcean();
  }

  setOcean() {
    // set up ocean mesh
    this.color = {};
    this.color.depthColor = "#4599f4";
    this.color.surfaceColor = "#d1fcfc";

    this.ocean = {};
    this.ocean.geometry = new THREE.PlaneGeometry(50, 50, 1024, 1024);
    this.ocean.material = new THREE.ShaderMaterial({
      uniforms: {
        uBigWavesElevation: {
          value: 0.02,
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
          value: 0.05,
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
      vertexShader: oceanVertex,
      fragmentShader: oceanFragment,
    });

    console.log(this.ocean.material.uniforms.uBigWavesFrequency.value);

    this.ocean.mesh = new THREE.Mesh(this.ocean.geometry, this.ocean.material);
    this.ocean.mesh.rotation.x = -Math.PI * 0.5;
    this.ocean.mesh.position.y = 0.05;

    this.scene.add(this.ocean.mesh);
  }

  update() {
    this.ocean.material.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}
