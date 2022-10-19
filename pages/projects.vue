<template>
    <div class="container">
        <carousel class="carousel" ref="myCarousel">
            <slide v-for="(slide, index) in projects" class="slide" :key="slide">
                <h1 class="title">{{ $t(`projects.${index}.title`) }}</h1>
                <div class="contentContainer">
                    <div class="placeHolder">
                        <img class="techLogo" v-for="i in 3" :key="i" :src="`/assets/projects/${slide.images}${i}.png`"
                            alt="illustration of the project">

                    </div>
                    <div class="textContainer">
                        <p>{{ $t(`projects.${index}.motivation`) }}</p>
                        <p>{{ $t(`projects.${index}.desc`) }}</p>
                        <div class="techContainer">
                            <div v-for="tech of slide.tech" class="tech" :key="tech">
                                <p>{{ tech.title }}</p>
                                <img class="techLogo" :src="`/assets/logos/${tech.logo}`" alt="logo">
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
    components: {
        Carousel, Slide, Pagination, Navigation
    },
    setup() {
        const myCarousel = ref(null);
        setTimeout(() => {
            if (myCarousel.value) {
                myCarousel.value.restartCarousel()
            }
        }, 600)
        return {
            myCarousel
        }
    },
    data() {
        return {
            projects: [
                {
                    title: 'Application mobile Adoka Mini',
                    motivation: 'Une application mobile créée lors de mon stage en Licence 3 dans l\'entreprise Amifor pour mettre en avant leur application web',
                    description: `Cette application est une version simplifiée de leur application web Adoka, qui permet de passer des tests pour connaître
                    ses intelligences principales (Logico-Mathématique, Verbale, etc.. ). Celles-ci permettent d'adapter les enseignements en fonction des 
                    intelligences les plus présentes dans un groupe.`,
                    tech: [
                        { title: 'VueJS', logo: 'vuejs.png' },
                        { title: 'Ionic', logo: 'ionic.png' },
                        { title: 'Capacitor', logo: 'capacitor.png' }
                    ],
                    images: "Adoka_mini"
                },
                {
                    'title': 'Application mobile Cliday',
                    'motivation': `Une application mobile réalisée pour la bourse Coddity que j'ai remportée.`,
                    'description': `Le sujet de la bourse était centrée sur le réchauffement climatique, j'ai donc développer une application qui permet de 
                    réaliser un quiz avec de nouvelles questions quotidiennement sur des thèmes proches de celui du climat. Une page de statistiques avec un 
                    graphe est disponible pour voir son amélioration si on s\'enregistre avec un compte.`,
                    'tech': ['Django', 'Flutter'],
                    tech: [
                        { title: 'Django', logo: 'django.png' },
                        { title: 'Flutter', logo: 'flutter.png' }
                    ],
                    images: "Cliday"
                },
            ]
        }
    },
}
</script>

<style scoped>
.title {
    text-align: center;
}

.contentContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    height: 75%;
    margin: 0 80px;
}

.placeHolder {
    width: 100%;
    height: 100%;
}

.placeHolder img {
    width: 30%;
    height: auto;
    border: 1px solid var(--action-primary);
    margin-left: 20px;
}

.textContainer {
    text-align: justify;
    font-size: x-large;
    display: flex;
    flex-direction: column;
}

.carousel {
    width: 95%;
    color: var(--text);
}

.techLogo {
    width: auto;
    height: 30px;
}

.techContainer {
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
}

.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slide {
    display: block;
}

.tech {
    display: flex;
}

.tech p {
    margin: 0;
    margin-right: 10px;
}
</style>