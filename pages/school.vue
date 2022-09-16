<template>
    <div class="mainContainer">
        <h1 class="h1">Parcours Scolaire</h1>
        <div class="container">
            <div v-for="(item, index) in timelineItems" :key="index">
                <div class="before-arrow"></div>
                <div class="after-arrow"></div>
                <div class="arrow">
                    <div class="title">{{ item.title }}</div>
                </div>
                <div class="bottom">
                    <ul>
                        <li v-if="item.place">{{ item.place }}</li>
                        <li v-if="item.desc">{{ item.desc }}</li>
                        <li v-if="item.option">{{ item.option }}</li>
                        <li v-if="item.result">{{ item.result }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

definePageMeta({
    layout: 'default'
})

export default {
    data() {
        return {
            timelineItems: [
                {
                    title: '2017-2018',
                    place: 'Lycée Yves Thépot',
                    desc: 'Bac Scientifique',
                    option: 'Science de l\'ingénieur',
                    result: 'Mention Très bien'
                },
                {
                    title: '2018-2020',
                    place: 'Université de Rennes 1',
                    desc: 'Licence de Mathématiques',
                    option: 'Option défi Mathématiques',
                    result: 'Mention Bien'
                },
                {
                    title: '2020-2021',
                    place: 'Université de Caen',
                    desc: 'Licence d\'Informatique',
                    option: 'Option Intelligence Artificielle',
                    result: 'Mention Bien'
                },
                {
                    title: '2021-2024',
                    place: 'ENSICAEN',
                    desc: 'Ingénieur Informatique',
                    option: '',
                    result: 'En cours'
                }
            ]
        }
    }
}
</script>

<style scoped>
.mainContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    color: var(--text);
    font-size: x-large;
    width: 100%;
    padding-top: 35.5px;
    padding-left: 70px;
    position: relative;
}

.container {
    display: flex;
    justify-content: center;
    transform: translateX(-35px);
}

.arrow {
    height: 100px;
    width: 200px;
    background-color: var(--tertiary);
    margin: 0 50px;
}

.before-arrow {
    background-color: var(--primary);
    transform: translateX(15px) translateY(15px) rotate(45deg);
    height: 70.7px;
    width: 70.7px;
    position: absolute;
}

.after-arrow {
    background-color: var(--tertiary);
    transform: translateX(215px) translateY(15px) rotate(45deg);
    height: 70.7px;
    width: 70.7px;
    position: absolute;
}

.bottom {
    height: 250px;
    width: 70%;
    border-left: 5px solid var(--tertiary);
    margin-left: 25%;
    color: var(--text);
}

ul {
    margin: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.h1 {
    color: var(--text);

    padding-bottom: 4rem;
}

a {
    text-decoration: underline var(--action-secondary);
    color: var(--action-secondary);
}
</style>