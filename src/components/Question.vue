<template>
  <div>
    <b-container>
<!--  On met dans le titre la question-->
      <h1>{{SC_questions[SC_i]}}</h1>
      <b-form-group label="Choisissez une réponse :"  >
        <b-form-radio v-model="SC_selected" value="oui">Oui</b-form-radio>
        <b-form-radio v-model="SC_selected" value="non">Non</b-form-radio>
        <b-form-radio v-model="SC_selected" value="jsp">Je ne sais pas</b-form-radio>
        <b-form-radio v-model="SC_selected" value="peutetre">Peut-être</b-form-radio>
      </b-form-group>
<!--  Tant qu'on est pas à la dernière question, on ne change pas la page -->
      <div v-if="SC_i < 5">
        <b-button @click="validateQuestion">Question Suivante</b-button>
      </div>
      <div v-if="SC_i>= 5">
        <b-button @click="validateQuestionnaire">Terminer le questionnaire</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import PouchDB from 'pouchdb';
// eslint-disable-next-line camelcase
import SC_json from '../json/data.json'; // On importe le fichier json qui contient les questions et leurs réponses associées

// eslint-disable-next-line camelcase
const SC_db = new PouchDB('db-questionnaire');

export default {
  name: 'Questionnaire',
  props: ['idUser', 'count'],
  myJson: SC_json,
  data() {
    return {
      SC_selected: [], // Must be an array reference!
      SC_i: 0,
      SC_score: 0,
    };
  },

  created() {
    this.SC_recupUser();
  },
  methods: {
    // Cette méthode permet de récupérer les informations de l'utilisateur
    SC_recupUser() {
      SC_db.get(this.$route.params.idUser)
        .then((doc) => {
          this.nom = doc.nom;
          this.email = doc.email;
          this.entreprise = doc.entreprise;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // cette méthode permet de valider une question
    validateQuestion() {
      if (this.SC_selected === this.SC_reponses[this.SC_i]) {
        this.SC_score = this.SC_score + 1;
      }
      this.SC_selected = [];
      this.SC_i = this.SC_i + 1;
    },

    // cette méthode permet de valider la dernière question et de montrer le résultat
    validateQuestionnaire() {
      if (this.SC_selected === this.SC_reponses[this.SC_i]) {
        this.SC_score = this.SC_score + 1;
      }
      this.$router.push(`/resultat/${this.SC_score}`);
    },
  },

  computed: {
    // Ce champ computed récupère toutes les questions du fichier json
    SC_questions() {
      return SC_json.questions.map(item => item.libelle);
    },
    // Ce champ computed récupère toutes les réponses du fichier json
    SC_reponses() {
      return SC_json.questions.map(item => item.reponse);
    },
  },
};
</script>

<style scoped>

</style>
