

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

import ocean from '../img/ocean.jpg'

export default class Sketch {
    constructor(options) {
        this.time = 0;
        this.container = options.dom
        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;


        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 100, 2000);
        this.camera.position.z = 600;
        console.log('-', Math.atan((this.height / 2) / 600 ) * (180 / Math.PI))
        this.camera.fov = 2 * Math.atan( (this.height / 2) / 600 ) * (180 / Math.PI)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.resize()
        this.setupResize()
        this.addObject()
        this.render()
    }



    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }


    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix()
    }

    addObject() {
        this.geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                oceanTexture: { value: new THREE.TextureLoader().load(ocean) }
            },
            side: THREE.DoubleSide,
            fragmentShader: fragment,
            vertexShader: vertex,
            wireframe: true
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    render() {
        this.time += 0.05;

        this.material.uniforms.time.value = this.time;

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch({
    dom: document.getElementById('container')
})
