import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector("canvas.webgl"));

// import * as THREE from "three";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import buttonVertex from "./Experience/Shaders/Button/vertexShader.glsl";
// import buttonFragment from "./Experience/Shaders/Button/fragmentShader.glsl";

// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
// camera.position.set(0, 3, 5);
// let renderer = new THREE.WebGLRenderer();
// renderer.setSize(innerWidth, innerHeight);
// //renderer.setClearColor(0x404040);
// document.body.appendChild(renderer.domElement);

// let controls = new OrbitControls(camera, renderer.domElement);

// let light = new THREE.DirectionalLight(0xffffff, 0.5);
// light.position.setScalar(1);
// scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// let uniforms = {
//   globalBloom: { value: 1 },
// };

// // texture
// new THREE.TextureLoader().load(
//   "https://threejs.org/examples/textures/hardwood2_diffuse.jpg",
//   (tex) => {
//     //console.log(tex);

//     let img = tex.image;

//     let c = document.createElement("canvas");
//     let min = Math.min(img.width, img.height);
//     c.width = c.height = min;
//     let ctx = c.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     let c2 = document.createElement("canvas");
//     c2.width = c2.height = min;
//     let ctx2 = c2.getContext("2d");
//     ctx2.clearRect(0, 0, min, min);

//     ["#f00", "#0f0", "#ff0", "#f0f", "#0ff"].forEach((col, i, a) => {
//       let id = i - (a.length - 1) / 2;
//       let dist = id * 150;
//       //console.log(dist, col, i, c.width, c.height);
//       ctx.beginPath();
//       ctx.arc(min * 0.5 + dist, min * 0.5, 25, 0, 2 * Math.PI);
//       ctx.fillStyle = col;
//       ctx.fill();
//     });

//     let cTex = new THREE.CanvasTexture(c);
//     let c2Tex = new THREE.CanvasTexture(c2);

//     setInterval(() => {
//       ctx2.clearRect(0, 0, min, min);
//       let id = THREE.MathUtils.randInt(0, 4) - 2;
//       let dist = id * 150;
//       ctx2.beginPath();
//       ctx2.arc(min * 0.5 + dist, min * 0.5, 25, 0, 2 * Math.PI);
//       ctx2.fillStyle = "#fff";
//       ctx2.fill();
//       c2Tex.needsUpdate = true;
//     }, 125);

//     let g = new THREE.PlaneGeometry(5, 5);
//     g.rotateX(Math.PI * -0.5);
//     let m = new THREE.MeshStandardMaterial({
//       roughness: 0.6,
//       metalness: 0.5,
//       map: cTex,
//       emissiveMap: c2Tex,
//       onBeforeCompile: (shader) => {
//         shader.uniforms.globalBloom = uniforms.globalBloom;
//         shader.fragmentShader = `
//             uniform float globalBloom;
//           ${shader.fragmentShader}
//         `.replace(
//           `#include <dithering_fragment>`,
//           `#include <dithering_fragment>
//             vec3 col = texture2D( map, vUv).rgb;
//             float em = texture2D( emissiveMap, vUv ).g;
//             col *= em;
//             gl_FragColor.rgb = mix(gl_FragColor.rgb, col, globalBloom);

//           `
//         );
//         console.log(shader.fragmentShader);
//       },
//     });
//     let o = new THREE.Mesh(g, m);
//     scene.add(o);
//   }
// );

// window.onresize = function () {
//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();

//   renderer.setSize(width, height);

//   bloomComposer.setSize(width, height);
//   finalComposer.setSize(width, height);
// };

// // bloom
// const renderScene = new RenderPass(scene, camera);

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1.5,
//   0,
//   0.1
// );

// const bloomComposer = new EffectComposer(renderer);
// bloomComposer.renderToScreen = false;
// bloomComposer.addPass(renderScene);
// bloomComposer.addPass(bloomPass);

// const finalPass = new ShaderPass(
//   new THREE.ShaderMaterial({
//     uniforms: {
//       baseTexture: { value: null },
//       bloomTexture: { value: bloomComposer.renderTarget2.texture },
//     },
//     vertexShader: buttonVertex,
//     fragmentShader: buttonFragment,
//     defines: {},
//   }),
//   "baseTexture"
// );
// finalPass.needsSwap = true;

// const finalComposer = new EffectComposer(renderer);
// finalComposer.addPass(renderScene);
// finalComposer.addPass(finalPass);

// renderer.setAnimationLoop((_) => {
//   renderer.setClearColor(0x000000);
//   uniforms.globalBloom.value = 1;

//   bloomComposer.render();

//   renderer.setClearColor(0x202020);
//   uniforms.globalBloom.value = 0;

//   finalComposer.render();
//   //renderer.render(scene, camera);
// });
