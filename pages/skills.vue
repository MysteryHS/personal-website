<template>
    <div class="skillPage">
        <div class="grid">
            <div class="title">Soft Skills</div>
            <div class="title">{{$t("skills.technical.title")}}</div>
            <div class="title">{{$t("skills.languages.title")}}</div>
            <ul class="flex">
                <li>{{$t("skills.soft.orga")}}</li>
                <li>{{$t("skills.soft.dyna")}}</li>
                <li>{{$t("skills.soft.propo")}}</li>
            </ul>

            <div class="threeContainer" ref="threeContainer"></div>
            <ul class="flex">
                <li>{{$t("skills.languages.fr")}}</li>
                <li>{{$t("skills.languages.en")}}</li>
                <li>{{$t("skills.languages.es")}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
    mounted() {
        const scene = new THREE.Scene();
        const width = 500
        const height = 500
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 1000);

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff, 0);

        const positions = [[1.618, 1, 0], [1, 0, 1.618], [0, 1.618, 1]]
        const skills = ["HTML", "CSS", "JS", "VueJS", "Flutter", "Python", "Django", "Java", "C", "Tailwind", "SQL", "C++"]

        let allPositions = []

        const deepCopy = (arr) => {
            let copy = [];
            arr.forEach(elem => {
                if (Array.isArray(elem)) {
                    copy.push(deepCopy(elem))
                } else {
                    copy.push(elem)
                }
            })
            return copy;
        }

        function getArrayWith(array, ratio = 1) {
            let result = [[]]
            for (let value of array) {
                for (let arr of result) {
                    arr.push(value * ratio)
                }
                if (value != 0) {
                    let copy = deepCopy(result)
                    for (let copArr of copy) {
                        copArr.splice(-1, 1)
                        copArr.push(value * -ratio)
                    }
                    result = result.concat(copy)
                }
            }
            return result
        }


        for (let arr of positions) {
            allPositions = allPositions.concat(getArrayWith(arr, .3))
        }

        for (let [index, arr] of allPositions.entries()) {
            let text = this.makeTextSprite(skills[index])
            text.position.set(arr[0], arr[1], arr[2]);
            scene.add(text)
        }

        camera.position.z = 1.8

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target = new THREE.Vector3(0, 0, 0); // set the center
        orbit.minDistance = camera.position.z; // the minimum distance the camera must have from center
        orbit.maxDistance = camera.position.z; // the maximum distance the camera must have from center
        orbit.zoomSpeed = 0.3; // control the zoomIn and zoomOut speed
        orbit.rotateSpeed = 0.3; // control the rotate speed
        orbit.autoRotate = true;
        orbit.enableDamping = true;
        orbit.dampingFactor = 0.1;

        function animate() {
            requestAnimationFrame(animate);
            orbit.update();
            renderer.render(scene, camera);
        };

        animate();

        this.$refs.threeContainer.appendChild(renderer.domElement);

    },
    methods: {
        makeTextSprite(message, parameters) {
            if (parameters === undefined) parameters = {};

            var fontface = parameters.hasOwnProperty("fontface") ?
                parameters["fontface"] : "Arial";

            var fontsize = parameters.hasOwnProperty("fontsize") ?
                parameters["fontsize"] : 20;

            var borderThickness = 4;

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = "Bold " + fontsize + "px " + fontface;


            context.lineWidth = borderThickness;


            // text color
            context.fillStyle = "rgb(255, 255, 255)";

            context.fillText(message, borderThickness, fontsize + borderThickness);

            // canvas contents will be used for a texture
            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial(
                { map: texture });
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.center.set(0.15, 0.9);
            return sprite;
        },
    }
}
</script>

<style scoped>
.title {
    font-size: 2.5rem;
    color: var(--text);
    text-align: center;
}

.skillPage {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.flex {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}

ul {
    padding: 0;
}

ul li {
    color: var(--text);
    list-style-type: none;
    font-size: x-large;
    padding-bottom: 2rem;
}
</style>