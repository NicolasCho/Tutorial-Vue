<template>
  <div id="app">
    <!-- 12: Adicionando o formulario -->
    <Formulario />

    <!--
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->

    <!-- 2:CRIANDO O COMPONENT NOTE NO APP.VUE
    <Note/>
     -->

    <!-- 6:PASSANDO INFORMAÇÕES AO COMPONENT (forma estática[sem v-bind])
    <Note title="Receita de miojo" content="Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque
      em uma vasilha e aproveite seu snack :)"> 
    </Note>
    <Note title="Sorvete de banana" content="Coloque a banana no congelador e espere.">
    </Note>
    -->

    <!-- 9: MULTIPLOS COMPONENTS https://5balloons.info/passing-data-to-components-with-props-in-vuejs/
                                 https://stackoverflow.com/questions/47608379/vue-language-server-elements-in-iteration-expect-to-have-v-bindkey-directiv -->
    <!-- OBS: para passar dados, utilizar ":" antes do atributo -->
    <!-- OBS2: para v-for necessita do atributo ":key" -->
    <div class='card-container'>
        <Note v-for="note in appData" :key="note.id" :title="note.title" :content="note.content" />
    </div>
  </div>
</template>



<!-- 2:CRIANDO O COMPONENT NOTE NO APP.VUE 
<script>
import Note from './components/Note.vue'

export default {
  name: 'App',
  components: {
    Note
  }
}
</script>
-->

<!-- 8:RECEBENDO PROPS COM OS DADOS -->
<script>
import Note from './components/Note.vue'
import Formulario from './components/Formulario.vue'

export default {
  name: 'App',
  props:["appData"],
  components: {
    Note,
    Formulario,
  },
}
</script>
 

 <!-- 9: MULTIPLOS COMPONENTS-->
<style >


.card-container{
  display:flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 3rem;
}
</style>
