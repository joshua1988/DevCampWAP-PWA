import Login from './components/login/Login.vue';
import Main from './components/main/Main.vue';
import Header from './components/common/Header.vue';

export const routes = [
  { path : '/', component: Login },
  {
    path : '/main',
    component: Main,
    children: [
      {
        path: '/',
        component: Header
      }
    ]
  },
]
