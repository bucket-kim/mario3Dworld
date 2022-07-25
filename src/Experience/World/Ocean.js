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

    this.renderTarget();
    this.setOcean();
  }

  renderTarget() {
    this.pixelRatio = this.renderer.renderer.getPixelRatio();

    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * this.pixelRatio,
      window.innerHeight * this.pixelRatio
    );

    this.renderTarget.texture.minFilter = THREE.NearestFilter;
    this.renderTarget.texture.magFilter = THREE.NearestFilter;
    this.renderTarget.texture.generateMipmaps = false;

    this.renderTarget.depthTexture = new THREE.DepthTexture();
    this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
    this.renderTarget.depthTexture.minFilter = THREE.NearestFilter;
    this.renderTarget.depthTexture.maxFilter = THREE.NearestFilter;

    this.depthMaterial = new THREE.MeshDepthMaterial();
    this.depthMaterial.depthPacking = THREE.RGBADepthPacking;
    this.depthMaterial.blending = THREE.NoBlending;
  }

  setOcean() {
    // depth material

    // setting up uniforms
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
        value: new THREE.Color(0xffffff),
      },
      waterColor: {
        value: new THREE.Color(0xa2faa),
      },
    };

    // set up ocean mesh
    this.ocean = {};
    this.ocean.geometry = new THREE.PlaneGeometry(50, 50);
    this.ocean.material = new THREE.ShaderMaterial({
      defines: {
        DEPTH_PACKING:
          this.renderer.supportsDepthTextureExtension === true ? 0 : 1,
        ORTHOGRAPHIC_CAMERA: 0,
      },
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib["fog"],
        this.uniforms,
      ]),
      vertexShader: oceanVertex,
      fragmentShader: oceanFragment,
      fog: true,
    });

    this.ocean.material.uniforms.cameraNear.value = this.camera.near;
    this.ocean.material.uniforms.cameraFar.value = this.camera.far;
    this.ocean.material.uniforms.resolution.value.set(
      window.innerWidth * this.renderer.pixelRatio,
      window.innerHeight * this.renderer.pixelRatio
    );

    this.ocean.material.uniforms.tDudv.value = this.dudvMap;
    this.ocean.material.uniforms.tDepth.value = this.renderTarget.depthTexture;

    this.ocean.mesh = new THREE.Mesh(this.ocean.geometry, this.ocean.material);
    this.ocean.mesh.rotation.x = -Math.PI * 0.5;
    this.ocean.mesh.position.y = 0.0;

    this.scene.add(this.ocean.mesh);
  }

  update() {
    this.ocean.mesh.visible = false;
    this.scene.overrideMaterial = this.depthMaterial;

    this.renderer.renderer.setRenderTarget(this.renderTarget);
    this.renderer.renderer.render(this.scene, this.camera.instance);
    this.renderer.renderer.setRenderTarget(null);

    this.scene.overrideMaterial = null;
    this.ocean.mesh.visible = true;

    this.ocean.material.uniforms.time.value = this.time.elapsed * 0.0001;
  }
}
