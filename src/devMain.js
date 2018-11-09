// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/dark.css';

Vue.config.productionTip = false

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})