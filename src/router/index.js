import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// eslint-disable-next-line import/extensions
import Questionnaire from '../views/Questionnaire';
// eslint-disable-next-line import/extensions
import Resultats from '../views/Resultats';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/questionnaire/:idUser',
    name: 'questionnaire',
    component: Questionnaire,
  },
  {
    path: '/resultat/:score',
    name: 'resultat',
    component: Resultats,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
