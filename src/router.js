import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ContactView from './views/ContactView.vue'
import LoginView from './views/LoginView.vue'
import UserView from './views/UserView.vue'

// ! EXAMPLE VIEWS TO DELETE
import ExampleHomeView from './views/example/ExampleHomeView.vue'
import E_Call from './views/example/E_Call.vue'
import E_InputText from './views/example/E_InputText.vue'
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%

const fullRoutes = {
  
  public: [ // Aggiungi le rotte publiche qui, visibili sia da autenticacto che da non autenticato.
    { path: '/', name: 'home', component: HomeView },
    { path: '/contact', name: 'contact', component: ContactView },
    // { path: '/esempio/:slug', name: 'esempio.show', component: EsempioShow, props: true },

    // ! EXAMPLE VIEWS TO DELETE
    { path: '/example', name: 'example.home', component: ExampleHomeView },
    { path: '/example/call', name: 'example.call', component: E_Call },
    { path: '/example/inputText', name: 'example.inputText', component: E_InputText },

  ],


  
  notAuth: [ // Aggiungi le rotte visibili solo se non sei autenticato qui, se necessario.
    { path: '/login', name: 'login', component: LoginView },
  ],


  
  auth: [ // Aggiungi le rotte visibili solo se autenticato qui, se necessario.
    { path: '/user', name: 'user', component: UserView },
  ],
};

// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
const routes = Object.keys(fullRoutes).reduce((acc, key) => {
  acc[key] = fullRoutes[key].map(route => route.name);
  return acc;
}, {});

const routerRoutes = [...fullRoutes.public, ...fullRoutes.notAuth, ...fullRoutes.auth];
const router = createRouter({ history: createWebHistory(), routes: routerRoutes })

export { router, routes };