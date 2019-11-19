<template>
  <b-container>
<!--    On récupère le score dans l'url pour l'afficher -->
    <h1>Votre score est de {{this.$route.params.score}} !</h1>
    <b-button variant="primary" @click="SC_toHome">Retour à l'accueil</b-button>
  </b-container>
</template>

<script>
export default {
  name: 'Resultat',

  methods: {
    // Cette méthode permet de retourner à la page de connexion
    SC_toHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

</style>
