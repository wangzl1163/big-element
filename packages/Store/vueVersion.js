import * as Vue from 'vue';

export default {
   state: {
      vueVersion: Vue.default ? Vue.default.version : Vue.version
   },
   isVue2() {
      return this.state.vueVersion.startsWith('2.')
   },
   isVue3(){
      return this.state.vueVersion.startsWith('3.')
   }
}