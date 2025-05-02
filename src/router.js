import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ContactView from './views/ContactView.vue'
import LoginView from './views/LoginView.vue'
import UserView from './views/UserView.vue'

// ! EXAMPLE VIEWS TO DELETE
import ExampleHomeView from './views/example/ExampleHomeView.vue'
import E_Call from './views/example/E_Call.vue'
import E_InputText from './views/example/E_InputText.vue'
import E_InputTextIcon from './views/example/E_InputTextIcon.vue'
import E_InputCheckbox from './views/example/E_InputCheckbox.vue'
import E_InputBtnCheckbox from './views/example/E_InputBtnCheckbox.vue'
import E_InputDate from './views/example/E_InputDate.vue'
import E_InputEmail from './views/example/E_InputEmail.vue'
import E_InputNumber from './views/example/E_InputNumber.vue'
import E_InputPassword from './views/example/E_InputPassword.vue'
import E_InputRadio from './views/example/E_InputRadio.vue'
import E_InputRange from './views/example/E_InputRange.vue'
import E_InputSelect from './views/example/E_InputSelect.vue'
import E_InputTime from './views/example/E_InputTime.vue'
import E_InputDatetime from './views/example/E_InputDatetime.vue'
import E_InputTextArea from './views/example/E_InputTextArea.vue'
import E_InputSearch from './views/example/E_InputSearch.vue'
import E_InputTel from './views/example/E_InputTel.vue'
import E_SlackMsg from './views/example/E_SlackMsg.vue'
import E_todoTyped from './views/example/E_todoTyped.vue'
import E_Toast from './views/example/E_Toast.vue'
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%

const fullRoutes = {

  public: [ // Aggiungi le rotte publiche qui, visibili sia da autenticacto che da non autenticato.
    { path: '/', name: 'home', component: HomeView },
    { path: '/contact', name: 'contact', component: ContactView },
    // { path: '/esempio/:slug', name: 'esempio.show', component: EsempioShow, props: true },

    // ! EXAMPLE VIEWS TO DELETE
    { path: '/example', name: 'example.home', component: ExampleHomeView },
    { path: '/example/call', name: 'example.call', component: E_Call },
    { path: '/example/slackMsg', name: 'example.slackMsg', component: E_SlackMsg },
    { path: '/example/toast', name: 'example.toast', component: E_Toast },
    { path: '/example/InputText', name: 'example.InputText', component: E_InputText },
    { path: '/example/InputTextIcon', name: 'example.InputTextIcon', component: E_InputTextIcon },
    { path: '/example/InputCheckbox', name: 'example.InputCheckbox', component: E_InputCheckbox },
    { path: '/example/InputBtnCheckbox', name: 'example.InputBtnCheckbox', component: E_InputBtnCheckbox },
    { path: '/example/InputDate', name: 'example.InputDate', component: E_InputDate },
    { path: '/example/InputEmail', name: 'example.InputEmail', component: E_InputEmail },
    { path: '/example/InputNumber', name: 'example.InputNumber', component: E_InputNumber },
    { path: '/example/InputPassword', name: 'example.InputPassword', component: E_InputPassword },
    { path: '/example/InputRadio', name: 'example.InputRadio', component: E_InputRadio },
    { path: '/example/InputRange', name: 'example.InputRange', component: E_InputRange },
    { path: '/example/InputSelect', name: 'example.InputSelect', component: E_InputSelect },
    { path: '/example/InputTime', name: 'example.InputTime', component: E_InputTime },
    { path: '/example/InputDatetime', name: 'example.InputDatetime', component: E_InputDatetime },
    { path: '/example/InputTextArea', name: 'example.InputTextArea', component: E_InputTextArea },
    { path: '/example/InputSearch', name: 'example.InputSearch', component: E_InputSearch },
    { path: '/example/InputTel', name: 'example.InputTel', component: E_InputTel },
    { path: '/example/todoTyped', name: 'example.todoTyped', component: E_todoTyped },

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

const routesList = Object.keys(fullRoutes).reduce((acc, key) => {
  acc[key] = fullRoutes[key].map(route => (`[${route.path}]: ${route.name}`));
  return acc;
}, {});

const routerRoutes = [...fullRoutes.public, ...fullRoutes.notAuth, ...fullRoutes.auth];
const router = createRouter({ history: createWebHistory(), routes: routerRoutes })

export { router, routes, routesList };