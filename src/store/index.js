// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
const req = require.context('./modules', false, /\.js$/);
let allModules = {};
req.keys().forEach(key => {
    let name = key.substring(2, key.length - 3);
    allModules[name] = req(key).default;
});

export default new Vuex.Store({
    modules: {
        ...allModules
    },
    getters
});