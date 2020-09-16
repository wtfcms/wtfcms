import './set-public-path'
import Vue from 'vue';

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import ElementUI from 'element-ui'

import '@/styles/index.scss' // global css

import App from './App.vue';
import router from './router/index';
import store from './store'
// import singleSpaVue from 'single-spa-vue';


import './icons' // icon
import i18n from './lang' // Internationalization
// import './permission' // permission control

// import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// const vueLifecycles = singleSpaVue({
//   Vue,
//   appOptions: {
//     render: (h) => h(App),
//     router,
//     store,
//     i18n
//   },
// });

// export const bootstrap = [
//   vueLifecycles.bootstrap,
// ];

// export function mount(props) {
//   return vueLifecycles.mount(props);
// }

// export const unmount = [
//   vueLifecycles.unmount,
// ];

// let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
  //   mode: 'history',
  //   routes,
  // });

  window.vueApp = instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
