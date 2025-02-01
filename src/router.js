import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import ContactView from './pages/ContactView.vue'
import UserView from './pages/UserView.vue'

// Definizione delle rotte complete
const fullRoutes = {
  // Aggiungi le rotte publiche qui, visibili sia da autenticacto che da non autenticato.
  public: [ 
    { path: '/', name: 'home', component: HomeView },
    { path: '/contact', name: 'contact', component: ContactView },
    // { path: '/esempio/:slug', name: 'esempio.show', component: EsempioShow, props: true },
  ],

  // Aggiungi le rotte visibili solo se non sei autenticato qui, se necessario.
  notAuth: [ 
    { path: '/user', name: 'user', component: UserView },
  ],

  // Aggiungi le rotte visibili solo se autenticato qui, se necessario.
  auth: [ 
    
  ],
};



// funzione interna che crea l'Object routes che contiene gli array con i
const routes = Object.keys(fullRoutes).reduce((acc, key) => {
  acc[key] = fullRoutes[key].map(route => route.name);
  return acc;
}, {});

const routerRoutes = [...fullRoutes.public, ...fullRoutes.notAuth, ...fullRoutes.auth];
const router = createRouter({ history: createWebHistory(), routes: routerRoutes })

export { router, routes };