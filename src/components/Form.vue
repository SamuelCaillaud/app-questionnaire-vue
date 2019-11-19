<template>
  <div>
    <h1><strong>Connexion</strong></h1>
    <b-container>
    <b-form v-if="SC_show">
      <b-form-group
        id="input-group-1"
        label="Adresse Mail :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="SC_form.SC_email"
          type="email"
          required
          placeholder="Entrez votre email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nom :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="SC_form.SC_name"
          required
          placeholder="Entrez votre nom"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Entreprise :" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="SC_form.SC_companyName"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        @click="SC_insertUser">
        Connexion
      </b-button>
    </b-form>
    </b-container>
  </div>

</template>
<script>
import PouchDB from 'pouchdb';


// eslint-disable-next-line camelcase
const SC_db = new PouchDB('db-questionnaire');
// eslint-disable-next-line camelcase
const SC_shortid = require('shortid');

export default {
  data() {
    return {
      SC_form: {
        SC_email: '',
        SC_nom: '',
        SC_entreprise: '',
      },
      SC_show: true,
    };
  },
  methods: {
    SC_insertUser() {
      // eslint-disable-next-line camelcase
      const SC_id = SC_shortid.generate();
      SC_db.put({
        SC__id: SC_id,
        SC_email: this.SC_form.SC_email,
        SC_nom: this.SC_form.SC_name,
        SC_entreprise: this.SC_form.SC_companyName,
      });

      // db.changes().on('change', () => {
      //   console.log('Ch-Ch-Changes');
      // });

      SC_db.replicate.to('http://127.0.0.1:5984/db-questionnaire');
      // eslint-disable-next-line camelcase
      this.$router.push(`/questionnaire/${SC_id}`);
    },
  },
};
</script>

<style scoped>

</style>
