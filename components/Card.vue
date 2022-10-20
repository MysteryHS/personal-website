<template>
    <div class="card">
        <img :src="artURL" class="cardArt" draggable="false" alt="card art">
        <div class="bottomContainer"></div>
        <div class="logoContainer">
            <img :src="logoURL" class="logo" />
        </div>
        <div class="textContainer">
            <p class="title">{{ $t(`card.data.${cardId-1}.title`) }}</p>
            <p class="description">{{ $t(`card.data.${cardId-1}.desc`) }}</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        cardId: {
            type: Number,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        art: {
            type: String,
            required: true,
        }
    },
    computed: {
        logoURL() {
            return this.logo != undefined ? `/assets/logos/${this.logo}` : ''
        },
        artURL() {
            return this.art != undefined ? `/assets/cardArt/${this.art}` : ''
        }
    }
}
</script>

<style scoped>
@font-face {
    font-family: cardTitleFont;
    src: url("~/assets/fonts/Belwe-Bd-BT-Bold-Font.woff");
}

.card {
    aspect-ratio: 1/1.41;
    border-radius: 1rem;
    overflow: hidden;
}

.title {
    margin: 0;
    text-align: center;
    margin-left: 25%;
    font-size: large;
}

.cardArt {
    border-radius: 1rem;
    height: 70%;
    width: 100%;
    object-fit: cover;
    background: var(--primary);
}

.bottomContainer {
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 115%;
    height: 60%;
    background-image: linear-gradient(-20deg, #bb7413, #e7d25c);
    border-radius: 2rem;
    transform: skew(19deg, -15deg);
}

.textContainer {
    position: absolute;
    top: 55%;
    width: 100%;
    color: white;
}

.description {
    margin: 13% 10%;
}

.logoContainer {
    aspect-ratio: 1;
    width: 20%;
    background-color: var(--primary);
    position: absolute;
    top: 45%;
    left: 10%;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.7);
}

.logo {
    width: 80%;
    color: white;
    fill: white;
}
</style>
