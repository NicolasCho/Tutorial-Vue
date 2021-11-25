<!-- 1:CRIANDO O PRIMEIRO COMPONENT 
<template>
    <div class="card">
      <h3 class="card-title">Receita de miojo</h3>
      <div class="card-content">
        <p>
          Bata com um martelo antes de abrir o pacote. Misture o tempero,
          coloque em uma vasilha e aproveite seu snack :)
        </p>
      </div>
    </div>
</template>
-->

<!-- 5: MELHORANDO O COMPONENT PARA RECEBER INFORMAÇÕES (passando props) 
<template>
    <div class="card">
      <h3 class="card-title">{{title}}</h3>
      <div class="card-content">{{content}}</div>
    </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    title:String,
    content:String
  }
}
</script>
-->

<!--BONUS:adicionando rotação aos cartoes-->
<template>
    <div class="card" v-bind:style="styleObject">
      <h3 class="card-title">{{title}}</h3>
      <div class="card-content">{{content}}</div>
    </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    title:String,
    content:String
  },
  methods:{
    randomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  data:function(){
    return{
      styleObject: {
        transform: `rotate(${this.randomInt(-5, 5)}deg)`
      }
    }
  }
}
</script>


<!-- 3: css -->
<style >
.card {
  width: 200px;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  margin: 10px 5px;
  padding: 10px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  border-radius: 5px;
  font-family: "Permanent Marker", cursive;
}

.card-title {
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: #4c4c4c;
}
</style>