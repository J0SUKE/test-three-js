import './css/style.css';
import * as THREE from "three";
import { EqualDepth, MeshStandardMaterial } from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

console.log(THREE);
//scene 

let canvasElement = document.querySelector(".webgl");

let size = {
    width:window.innerWidth,
    height:window.innerHeight
}
const{width,height} = size;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
camera.position.set(-2,2,2)

const renderer = new THREE.WebGLRenderer({
    canvas:canvasElement
});

renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;

renderer.setSize(width,height);

//Objects
let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,30,30),
    new MeshStandardMaterial({
        color:"#f5425d",
        roughness:0.4
    })
)
sphere.position.y = 0.5;
sphere.castShadow=true;
scene.add(sphere);

let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshStandardMaterial(
        {
            color:"#383838",
            roughness:0.4
        }
    )
)
floor.rotation.x = -Math.PI/2;
floor.receiveShadow=true;
scene.add(floor)

//lights
let ambientLight = new THREE.AmbientLight("white",.5)
scene.add(ambientLight);

let directionalLIght = new THREE.DirectionalLight("white",.8);
directionalLIght.position.set(1,2,1);


directionalLIght.castShadow=true;
directionalLIght.shadow.mapSize.width = 2048; // default
directionalLIght.shadow.mapSize.height = 2048; // default

directionalLIght.shadow.camera.near = 0.5; // default
directionalLIght.shadow.camera.far = 5; // default


console.log(directionalLIght);

// let helper = new THREE.CameraHelper(directionalLIght.shadow.camera)
// scene.add(helper);



scene.add(directionalLIght);

//scene.add(new THREE.DirectionalLightHelper(directionalLIght,0.3,"white"))

//controls
const controls = new OrbitControls( camera, canvasElement);

//helper
//scene.add(new THREE.AxesHelper(1));


renderer.render(scene,camera);

let clock = new THREE.Clock()

let animate=()=>{
    
    let elapsedTime = clock.getElapsedTime()

    renderer.render(scene,camera);
    controls.update();

    sphere.position.y = (Math.sin(elapsedTime)/2)+1;

    requestAnimationFrame(animate);
}

animate();
