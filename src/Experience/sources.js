export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "/textures/environmentMap2/px.png",
      "/textures/environmentMap2/nx.png",
      "/textures/environmentMap2/py.png",
      "/textures/environmentMap2/ny.png",
      "/textures/environmentMap2/pz.png",
      "/textures/environmentMap2/nz.png",
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
  {
    name: "marioItemTexture",
    type: "texture",
    path: "/textures/modelTexture/bake-items.png",
  },
  {
    name: "marioButtonsTexture",
    type: "texture",
    path: "/textures/modelTexture/bake-buttons.png",
  },
  {
    name: "cloud",
    type: "gltfModel",
    path: "/models/cloud.glb",
  },
  {
    name: "cloudTexture",
    type: "texture",
    path: "/textures/modelTexture/bake-clouds.png",
  },
  {
    name: "water",
    type: "gltfModel",
    path: "/models/water.glb",
  },
  {
    name: "button",
    type: "gltfModel",
    path: "/models/buttons.glb",
  },
];
