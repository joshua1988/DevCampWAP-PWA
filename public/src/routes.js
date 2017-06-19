import Login from './components/login/Login.vue';
import Body from './components/main/Body.vue';
import List from './components/main/List.vue';
import InfoSummary from './components/main/InfoSummary.vue';
import Header from './components/common/Header.vue';

export const routes = [
  { path : '/', component: Login },
  {
    path : '/home',
    // Named Router
    components: {
      nestedHeader: Header,
      default: Body,
      summaryView: InfoSummary
    }
  },
]