<template>
  <div>
    <b-container>
    <b-form @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Adresse Mail :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nom :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Entrez votre nom"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Entreprise :" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.companyName"
          required
        ></b-form-input>
      </b-form-group>

<!--      <b-form-group id="input-group-4">-->
<!--        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">-->
<!--          <b-form-checkbox value="me">Check me out</b-form-checkbox>-->
<!--          <b-form-checkbox value="that">Check that out</b-form-checkbox>-->
<!--        </b-form-checkbox-group>-->
<!--      </b-form-group>-->

      <b-button type="submit" v-on:click="insertUser" variant="primary" to="/questionnaire">
        Submit
      </b-button>
<!--      <b-button type="reset" variant="danger">Reset</b-button>-->
    </b-form>
    </b-container>
  </div>
<!--  <script src="https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js"></script>-->
<!--  <script src="../main.js"></script>-->
<!--  <script src="../../node_modules/pouchdb/dist/pouchdb.min.js"></script>-->

</template>
<script>

// eslint-disable-next-line import/extensions
import PouchDB from 'pouchdb';
// eslint-disable-next-line no-undef
const db = new PouchDB('db-questionnaire');
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        companyName: '',
      },
      show: true,
    };
  },
  methods: {
    // onSubmit(evt) {
    //   evt.preventDefault();
    //   alert(JSON.stringify(this.form));
    // },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    insertUser() {
      db.put({
        email: this.form.email,
        name: this.form.name,
        age: this.form.companyName,
      });

      // db.changes().on('change', () => {
      //   console.log('Ch-Ch-Changes');
      // });

      db.replicate.to('http://127.0.0.1:5984/db-questionnaire');
    },
  },
};
</script>

<style scoped>

</style>
