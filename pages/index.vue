<template>
  <div class="pres">
    <p class="heading">{{ $t('hello') }}</p>
    <p>{{$t('index.pres')}}</p>
    <p>{{$t('index.move')}}</p>
    <p>{{$t('index.download1')}}<a href="/CV.pdf" download="">{{$t('index.download2')}}</a></p>
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