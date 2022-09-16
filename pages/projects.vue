<template>
    <div class="container">
        <Splide class="carousel" @splide:move="move" :options="{ rewind: true, height: '35rem', perPage: 1 }"
            aria-label="My Favorite Images">
            <SplideSlide v-for="(slide, i) of projects" :key="slide">
                <div v-if="i == index || showSlide">
                    <h1 class="title">{{ slide.title }}</h1>
                    <div class="contentContainer">
                        <div class="placeHolder"></div>
                        <div class="textContainer">
                            <p>{{ slide.motivation }}</p>
                            <p>{{ slide.description }}</p>
                            <div class="techContainer">
                                <div v-for="tech of slide.tech" :key="tech">
                                    {{ tech.title }}
                                    <img class="techLogo" :src="`/assets/logos/${tech.logo}`" alt="logo">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script>
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
//TODO verif on unmounted ou qqch comme ca, et n'afficher qu'un slide dans ce cas

export default {
    components: {
        Splide, SplideSlide
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
                    ]
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
                    ]
                },
            ]
        }
    },

    setup() {
        const showSlide = ref(true)
        const index = ref(0)

        function move(_, newIndex) {
            index.value = newIndex
            console.log(index.value)
        }

        onBeforeUnmount(() => {
            showSlide.value = false
            console.log("TEST")
        })

        return {
            move,
            showSlide,
            index
        }
    }
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
    background-color: violet;
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
</style>