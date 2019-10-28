<template>
  <div>
    {{$route.params.idUser}}
    <b-button v-on:click="getUserName"></b-button>
  </div>

</template>

<script>
import PouchDB from 'pouchdb';

const db = new PouchDB('db-questionnaire');
// const id = this.$route.params.idUser;

export default {
  name: 'Questionnaire',

  methods: {
    getUserName() {
      // console.log(id);
      // eslint-disable-next-line no-undef
      db.get(this.$route.params.idUser).then(doc => doc.name()).catch((err) => {
        console.log(err);
      });
    },
  },
};


</script>

<style scoped>

</style>
