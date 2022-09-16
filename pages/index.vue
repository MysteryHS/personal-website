<template>
  <div class="pres">
    <p class="heading">Bienvenue !</p>
    <p>Je suis Ducastel Matéo, étudiant en informatique à l'ENSICAEN</p>
    <p>Découvrez mon CV en déplaçant les cartes</p>
    <p>Ou téléchargez le en <a href="/CV.pdf" download="">cliquant ici</a></p>
  </div>
</template>

<script>

</script>

<style scoped>
.heading {
  color: var(--action-secondary);
  margin-bottom: 5rem;
}

.pres {
  color: var(--text);
  margin-left: 10%;
  font-size: xx-large;
}

a {
  text-decoration: underline var(--action-secondary);
  color: var(--action-secondary);
}
</style>