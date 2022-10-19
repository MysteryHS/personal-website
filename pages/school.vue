<template>
    <div class="mainContainer">
        <h1 class="h1">{{$t('school.title')}}</h1>
        <div class="container">
            <div class="item" v-for="(item, index) in 4" :key="index">
                <div class="before-arrow"></div>
                <div class="after-arrow"></div>
                <div class="arrow">
                    <div class="title">{{ $t(`school.data.${index}.title`) }}</div>
                </div>
                <ul>
                    <li v-if="$t(`school.data.${index}.place`)">{{ $t(`school.data.${index}.place`) }}</li>
                    <li v-if="$t(`school.data.${index}.desc`)">{{ $t(`school.data.${index}.desc`) }}</li>
                    <li v-if="$t(`school.data.${index}.option`)">{{ $t(`school.data.${index}.option`) }}</li>
                    <li v-if="$t(`school.data.${index}.result`)">{{ $t(`school.data.${index}.result`)}}</li>
                </ul>
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

.item {
    width: 300px;
}

.title {
    color: var(--text);
    font-size: x-large;
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

ul {
    margin: 0 auto;
    height: 250px;
    width: 70%;
    display: flex;
    border-left: 5px solid var(--tertiary);
    margin-left: 25%;
    flex-direction: column;
    color: var(--text);
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