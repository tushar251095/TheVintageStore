import { createStore } from "vuex";

export default createStore({
  state: {
    product_id:0,
    category_id:0
  },
  mutations: {
    STORE_ID_SAVE(state,id){
     
     state.product_id=id;
     
    },
    STORE_CategoryID_SAVE(state,id){
      state.category_id=id;
     }
  },
  actions: {
   saveid({commit}, payload){
    return new Promise((resolve, reject) => {
      try{
        commit('STORE_ID_SAVE', payload)
        resolve(true)
      }catch(error){
       commit('save Error', error)
       reject(false)
      }
    });
   },
   savecatid({commit},payload){
    return new Promise((resolve, reject) => {
      try{
        commit('STORE_CategoryID_SAVE', payload)
        resolve(true)
      }catch(error){
       commit('save Error', error)
       reject(false)
      }
    });
   }
  },
  modules: {},
});
