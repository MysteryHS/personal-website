<template>
    <div class="page">
        <h1 class="title">Contactez moi</h1>
        <h3 class="subtitle">Pour construire un site web, une application mobile, si mon profil vous intéresse ou
            simplement pour discuter !
        </h3>
        <div class="info">
            <div class="container">
                <h5>EMAIL</h5>
                <p>{{ mail.start + '@' + mail.end }}</p>
            </div>
            <div class="container">
                <h5>ADRESSE</h5>
                <p>Caen, France</p>
            </div>
            <div class="container">
                <h5>CV</h5>
                <a href="/CV.pdf" download=""><button class="cvbut">CV.PDF</button></a>
            </div>
            <div class="container">
                <h5>TELEPHONE</h5>
                <p>06.47.73.29.77</p>
            </div>
            <div class="container">
                <h5>SITES</h5>
                <div>
                    <a href="https://github.com/MysteryHS"><img class="logo" src="~/assets/logos/github.png"
                            alt="" /></a>
                    <a href="https://fr.linkedin.com/in/mat%C3%A9o-ducastel-9a5999204/fr"><img class="logo"
                            src="~/assets/logos/LinkedIn.png" alt="" /></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mail: {
                start: 'ducastel.mateo',
                end: 'laposte.net'
            }
        }
    }
}
</script>

<style scoped>
.page {
    margin-left: 20%;
    color: var(--text);
}

.title {
    font-size: 3rem;
}

.subtitle {
    font-size: 1.5rem;
    width: 60%;
}

.info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

}

h5 {
    font-size: large;
}

.cvbut {
    background-color: var(--primary);
    color: var(--action-primary);
    border: 1px solid var(--action-primary);
    padding: 5px 10px;
    cursor: pointer;
}

.logo {
    height: 2rem;
    width: 2rem;
    padding-right: 1rem;
}
</style>