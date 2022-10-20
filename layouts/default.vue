<template>
    <div class="main" @mouseup="stopDrag()" @mousemove="drag($event)">
        <NuxtLink to="/">
            <img src="/assets/logos/home.png" alt="home logo" class="home" />
        </NuxtLink>
        <div class="language">
            <span class="fr lang" :class="{filter: !isFrench}" @click="onToggleLanguage('fr')">🇫🇷</span>
            <span class="en lang" :class="{filter: isFrench}" @click="onToggleLanguage('en')">🇬🇧</span>
        </div>
        <div class="dropZone" id="drop">
            <slot />
        </div>
        <div class="bottomContainer" @mousemove="onMouseMove($event)" @mousedown="startDrag($event)">
            <button class="reloadButton" @click="addCardsBack">
                <img src="/assets/logos/reload.png" class="reload" alt="reload logo">
            </button>
            <div class="cardContainer">
                <Card v-for="(item, index) in cards" :key="index" :id="item.id" :logo="item.logo" :art="item.art"
                    :cardId="item.id" class="smallCard" :style="{
                        'transform': `rotate(${getTransform(item.id)}deg) translateX(${getPositionXOnDrag(item.id)}px) translateY(${getPositionYOnDrag(item.id)}px)`,
                        ...getPlayedStyle(item.id),
                    
                    }" :class="[
                        getOpacitySmallCard(item.id),
                        getOrigin(index),
                        getPlayableClass(item.id),
                        getSelectedClass(item.id),
                        getMarginTransition(item.id),
                        getStopDragTransition(item.id),
                    ]" />
            </div>
            <div class="cardContainer">
                <Card v-for="(item, index) in cards" :key="index" :logo="item.logo" :cardId="item.id" :art="item.art"
                    class="bigCard inHand" :class="[getOpacityBigCard(item.id)]" />
            </div>
        </div>
    </div>
</template>
  
<script>
import Card from '~/components/Card.vue';

export default {
    name: "IndexPage",
    components: { Card },
    data() {
        return {
            isFrench: true,
            cardWidth: 0,
            idRemoved: -1,
            idSelected: -1,
            idMarginRight: -1,
            idMarginLeft: -1,
            idPlayed: -1,
            idPlayable: -1,
            idStopDrag: -1,
            idHover: -1,
            animationDuration: 300,
            cards: [
                {
                    id: 1,
                    logo: 'briefcase.png',
                    route: '/projects',
                    art: 'exp.svg',
                },
                {
                    id: 2,
                    logo: 'studies.png',
                    route: '/school',
                    art: 'school.svg',
                },
                {
                    id: 3,
                    logo: 'coding.png',
                    route: '/skills',
                    art: 'dev.svg',
                },
                {
                    id: 4,
                    logo: 'profil.svg',
                    route: '/about',
                    art: 'infos.svg',
                }
            ],
            removedCard: [],
            isDragging: false,
            startingCoorAbs: {
                x: 0,
                y: 0,
            },
            currentCoorAbs: {
                x: 0,
                y: 0,
            }
        }
    },
    mounted() {
        this.cardWidth = document.querySelector('.smallCard').clientWidth
    },
    computed: {
        middle: function () {
            return (this.cards.length + 1) / 2
        },
        isAnimatingPlay: function () {
            return this.idMarginLeft != -1 || this.idMarginRight != -1
        },
        marginMiddle: function () {
            return Math.round(((this.convertRemToPixels(-1) * 4 + this.cardWidth) / 2))
        },
        marginEdge: function () {
            return this.convertRemToPixels(-1) * 3 + this.cardWidth
        }
    },
    methods: {
        onToggleLanguage(param) {
            if (this.$i18n.locale != param) {
                this.isFrench = !this.isFrench
                this.$i18n.locale = param
            }
        },
        convertRemToPixels(rem) {
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        },
        hoverCard(id) {
            if (this.idPlayed == -1) {
                this.idHover = id
            }
        },
        leaveHover() {
            this.idHover = -1
        },
        getTransform(id) {
            let index = this.cards.findIndex(card => card.id == id)
            if (this.idSelected == id) {
                return 0
            }
            if (this.idPlayed != -1 && (this.idMarginLeft != -1 || this.idMarginRight != -1)) {
                let indexPlayed = this.cards.findIndex(card => card.id == this.idPlayed)
                let middle = this.cards.length / 2
                let newIndex = index < indexPlayed ? index : index - 1
                return (newIndex + 1 - middle) * 6
            }
            return (index + 1 - this.middle) * 6
        },
        getOpacityBigCard(id) {
            return this.idHover == id && this.idSelected != id && this.idStopDrag != id ? '' : 'disapear'
        },
        getOpacitySmallCard(id) {
            return this.idHover != id || this.idSelected == id || this.idStopDrag == id ? '' : 'hide'
        },
        getPlayableClass(id) {
            return this.idPlayable == id ? 'playable' : 'inHand'
        },
        getSelectedClass(id) {
            return this.idSelected == id ? 'isSelected' : ''
        },
        getPlayedStyle(id) {
            let index = this.cards.findIndex(card => card.id == id)
            let playedIndex = this.cards.findIndex(card => card.id == this.idPlayed)
            if (index == playedIndex) {
                return {
                    transition: `opacity ${this.animationDuration / 1000}s`,
                    position: 'absolute',
                    width: `${this.cardWidth}px`,
                    opacity: '0'
                }
            }
            if (playedIndex != -1 && index + 1 == playedIndex && this.idMarginRight != id) {
                setTimeout(() => {
                    this.idMarginRight = id
                }, 10)
                return {
                    marginRight: index == this.cards.length - 2 ? `${this.marginEdge}px` : `${this.marginMiddle}px`
                }
            }
            if (playedIndex != -1 && index - 1 == playedIndex && this.idMarginLeft != id) {
                setTimeout(() => {
                    this.idMarginLeft = id
                }, 10)
                return {
                    marginLeft: index == 1 ? `${this.marginEdge}px` : `${this.marginMiddle}px`
                }
            }
            return {}
        },
        getMarginTransition(id) {
            return this.isAnimatingPlay && this.idPlayed != id ? 'transition-margin defaultMargin' : ''
        },
        getOrigin(index) {
            let indexPlayed = this.cards.findIndex(item => item.id == this.idPlayed)
            if (indexPlayed >= this.middle && index == this.middle - 1) {
                return 'originLeft'
            }
            return (index + 1) > this.middle ? 'originLeft' : 'originRight'
        },
        getPositionXOnDrag(id) {
            return this.idSelected == id ? - this.currentCoorAbs.x : 0
        },
        getPositionYOnDrag(id) {
            return this.idSelected == id ? - this.currentCoorAbs.y : 0
        },
        getStopDragTransition(id) {
            return this.idStopDrag == id ? 'transition-transform isSelected' : ''
        },
        getIdFromCoor(x, y) {
            for (let ele of document.elementsFromPoint(x, y)) {
                if (ele.id != "") {
                    return parseInt(ele.id)
                }
            }
            return NaN
        },
        startDrag(event) {
            if (!this.isDragging && !this.isAnimatingPlay) {
                let id = this.getIdFromCoor(event.clientX, event.clientY)
                if (id) {
                    this.idSelected = id
                    this.isDragging = true
                    this.startingCoorAbs.x = event.clientX
                    this.startingCoorAbs.y = event.clientY
                }
            }
        },
        onMouseMove(event) {
            if (!this.isDragging) {
                this.idHover = this.getIdFromCoor(event.clientX, event.clientY)
            }
        },
        stopDrag() {
            if (this.isDragging) {
                if (this.idPlayable == this.idSelected) {
                    this.idPlayed = this.idSelected
                    let index = this.cards.findIndex(item => item.id == this.idPlayed)
                    let size = this.cards.length
                    this.currentCoorAbs.x += ((size - 1 - index) - index) * (this.marginMiddle + this.convertRemToPixels(1))
                    this.$router.push({ path: this.cards[index].route });
                    setTimeout(() => {
                        this.removedCard.push(this.cards[index])
                        this.cards.splice(index, 1)
                        this.currentCoorAbs.x = 0
                        this.currentCoorAbs.y = 0
                        this.idPlayable = -1
                        this.idSelected = -1
                        this.idPlayed = -1
                        this.idMarginRight = -1
                        this.idMarginLeft = -1
                    }, this.animationDuration)
                } else {
                    this.idStopDrag = this.idSelected
                    this.currentCoorAbs.x = 0
                    this.currentCoorAbs.y = 0
                    this.idSelected = -1
                    setTimeout(() => {
                        this.idStopDrag = -1
                        this.idPlayable = -1
                    }, this.animationDuration)
                }
                this.isDragging = false
                this.idHover = -1
            }
        },
        drag(event) {
            if (this.isDragging) {
                this.currentCoorAbs.x = this.startingCoorAbs.x - event.clientX
                this.currentCoorAbs.y = this.startingCoorAbs.y - event.clientY
                let verif = false
                for (let ele of document.elementsFromPoint(event.clientX, event.clientY)) {
                    if (ele.id == "drop") {
                        verif = true
                        break
                    }
                }
                if (verif) {
                    this.idPlayable = this.idSelected
                } else {
                    this.idPlayable = -1
                }
            }
        },
        addCardsBack() {
            this.cards.push(...this.removedCard)
            this.cards.sort((n1, n2) => n1.id - n2.id)
            this.removedCard = []
        }
    }
}
</script>
  
<style>
body {
    margin: 0;
}

@font-face {
    font-family: "mainFont";
    src: url("@/assets/fonts/Roboto-Regular.woff") format('woff');
}


:root {
    --primary: #000814;
    --secondary: #001D3D;
    --tertiary: #003566;
    --text: white;
    --action-primary: #ffc300;
    --action-secondary: #fec45d;
    --timing-animation: .3s;
    --vc-clr-primary: #ffc300;
    --vc-clr-secondary: #ffe4b5;
}


.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary);
    overflow: hidden;
}

.language {
    font-size: xx-large;
    user-select: none;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 50;
}

.lang {
    margin: 10px;
    transition: filter 1s;
}

.filter {
    filter: grayscale(100%);
}

.noFilter {
    filter: grayscale(0%);
}

.dropZone {
    background-color: var(--primary);
    flex: 1 1 auto;
    font-family: mainFont;
    display: flex;
    align-items: center;
}

.bottomContainer {
    position: relative;
    height: 18rem;
    width: 100vw;
    user-select: none;
}

.cardContainer {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    transform: translateY(4rem);
    user-select: none;
}

.smallCard {
    box-sizing: border-box;
    margin: -1rem;
    user-select: none;
}

.bigCard {
    margin: -1rem;
    transform: scale(1.5) translateY(-7rem);
    user-select: none;
}

.isSelected {
    z-index: 20;
}

.playable {
    box-shadow: #58b3cd 0px 2px 15px 12px;
}

.inHand {
    box-shadow: rgb(15, 204, 0) 0px 2px 15px 12px;
}

.defaultMargin {
    margin: -1rem;
}

.transition-transform {
    transition: transform var(--timing-animation);
}

.transition-margin {
    transition-property: margin, transform, transform-origin;
    transition-duration: var(--timing-animation);
    transition-timing-function: ease-in-out;
}

.hide {
    opacity: 0;
}

.disapear {
    visibility: hidden;
}

.originLeft {
    transform-origin: 0% 100%;
}

.originRight {
    transform-origin: 100% 100%;
}

.reloadButton {
    position: absolute;
    right: 50px;
    bottom: 200px;
    height: 50px;
    border-radius: 100%;
    aspect-ratio: 1;
    background-color: #ffc300;
    cursor: pointer;
    z-index: 50;
}

.home {
    height: 40px;
    aspect-ratio: 1;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 50;
}

.reload {
    height: 100%;
    aspect-ratio: 1;
}
</style>