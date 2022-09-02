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

    // this.setOcean();
    this.test();
  }

  setOcean() {
    // set up ocean mesh
    this.color = {};
    this.color.depthColor = "#3cacf2";
    this.color.surfaceColor = "#d1fcfc";

    this.ocean = {};
    this.ocean.geometry = new THREE.PlaneGeometry(50, 50, 1024, 1024);
    this.ocean.material = new THREE.ShaderMaterial({
      uniforms: {
        uBigWavesElevation: {
          value: 0.02,
        },
        uBigWavesFrequency: {
          value: new THREE.Vector2(1.0, 1.5),
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
          value: 0.01,
        },
        uColorMultiplier: {
          value: 10.0,
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

    this.ocean.mesh = new THREE.Mesh(this.ocean.geometry, this.ocean.material);
    this.ocean.mesh.rotation.x = -Math.PI * 0.5;
    this.ocean.mesh.position.y = 0.05;

    this.scene.add(this.ocean.mesh);
  }
  test() {
    this.params = {
      foamColor: 0xffffff,
      waterColor: 0x14c6a5,
      threshold: 0.1,
    };

    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * this.renderer.pixelRatio,
      window.innerHeight * this.renderer.pixelRatio
    );
    this.renderTarget.texture.minFilter = THREE.NearestFilter;
    this.renderTarget.texture.magFilter = THREE.NearestFilter;
    this.renderTarget.texture.generateMipmaps = false;
    this.renderTarget.stencilBuffer = false;
    this.renderTarget.depthTexture = new THREE.DepthTexture();
    this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
    this.renderTarget.depthTexture.minFilter = THREE.NearestFilter;
    this.renderTarget.depthTexture.magFilter = THREE.NearestFilter;

    // deatph material
    this.depthMaterial = new THREE.MeshDepthMaterial();
    this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
    this.depthMaterial.blending = THREE.NoBlending;

    this.dudvMap = new THREE.TextureLoader().load(
      "https://i.imgur.com/hOIsXiZ.png"
    );
    this.dudvMap.wrapS = this.dudvMap.wrapT = THREE.RepeatWrapping;

    this.uniforms = {
      time: {
        value: 0,
      },
      threshold: {
        value: 0.1,
      },
      tDudv: {
        value: null,
      },
      tDepth: {
        value: null,
      },
      cameraNear: {
        value: 0,
      },
      cameraFar: {
        value: 0,
      },
      resolution: {
        value: new THREE.Vector2(),
      },
      foamColor: {
        value: new THREE.Color(),
      },
      waterColor: {
        value: new THREE.Color(),
      },
    };

    this.ocean = {};
    this.ocean.geo = new THREE.PlaneGeometry(50, 50);
    this.ocean.mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib["fog"],
        this.uniforms,
      ]),
    });

    this.ocean.mesh = new THREE.Mesh(this.ocean.geo, this.ocean.mat);
    this.ocean.mesh.rotation.x = -Math.PI * 0.5;

    this.scene.add(this.ocean.mesh);
  }

  update() {
    // this.ocean.material.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}
