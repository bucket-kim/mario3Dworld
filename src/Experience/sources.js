export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "/textures/environmentMap/px.png",
      "/textures/environmentMap/nx.png",
      "/textures/environmentMap/py.png",
      "/textures/environmentMap/ny.png",
      "/textures/environmentMap/pz.png",
      "/textures/environmentMap/nz.png",
    ],
  },
  {
    name: "marioLand",
    type: "gltfModel",
    path: "/models/land.glb",
  },
  {
    name: "marioLandTexture",
    type: "texture",
    path: "/textures/modelTexture/bake-land.png",
  },
];
