import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import file_upload from './file_upload'
import travel from './travel'
import travel_category from './travel_category'
import restaurant_category from './restaurant_category'
import restaurant from './restaurant'
import settings from './settings'
Vue.use(Vuex);
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      file_upload,
      travel,
      travel_category,
      restaurant_category,
      restaurant,
      settings,
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store
}
