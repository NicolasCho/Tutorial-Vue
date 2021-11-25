import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

Vue.config.productionTip = false

//https://br.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html


/* RENDER INICIAL
new Vue({
  render: h => h(App),
}).$mount('#app')
*/

/* 7:CRIANDO DADOS PARA MULTIPLOS COMPONENTS  https://stackoverflow.com/questions/44426862/vue-how-do-i-pass-data-to-component-in-render-method
new Vue({
  data: {
    notes:[
        {
        id: 1,
        title: "Receita de miojo",
        content:
          "Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque em uma vasilha e aproveite seu snack :)",
      },
      {
        id: 2,
        title: "Sorvete de banana",
        content: "Coloque a banana no congelador e espere.",
      }
    ]
  },
  render(h){
    return h(App, {props: {appData: this.notes}})
  },
}).$mount('#app')
*/

// 10:RECEBENDO DADOS DO AXIOS
new Vue({
  data: {
    notes:[]
  },
  mounted() {
    axios.get("http://localhost:8000/api/notes/").then(res => this.notes = res.data)
  },
  render(h){
    return h(App, {props: {appData: this.notes}})
  },
}).$mount('#app')