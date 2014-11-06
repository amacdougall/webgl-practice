var renderer = null,
    scene = null,
    camera = null,
    cube = null,
    animating = false;

function onLoad() {
  var container = document.getElementById("container");

  // append a WebGL renderer to the container div
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // create a new Three.js scene
  var scene = new THREE.Scene();

  // add a camera to the scene
  var camera = new THREE.PerspectiveCamera(
    45, // FOV
    container.offsetWidth / container.offsetHeight, // aspect
    1, // near
    4000 // far
  );
  camera.position.set(0, 0, 3); // x y z
  scene.add(camera);

  // add a directional light
  var light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(0, 0, 1);
  scene.add(light);

  var mapURL = "images/SFA3_Zangief.gif";
  var map = THREE.ImageUtils.loadTexture(mapURL);

  var material = new THREE.MeshPhongMaterial({map: map});
  var geometry = new THREE.CubeGeometry(1, 1, 1);
  cube = new THREE.Mesh(geometry, material);

  cube.rotation.x = Math.PI / 5;
  cube.rotation.y = Math.PI / 5;

  scene.add(cube);

  renderer.domElement.addEventListener("mouseup", function(e) {
    e.preventDefault();
    animating = !animating;
  }, false);

  (function run() {
    renderer.render(scene, camera);

    if (animating) {
      cube.rotation.y -= 0.01;
    }

    requestAnimationFrame(run);
  })();
}
