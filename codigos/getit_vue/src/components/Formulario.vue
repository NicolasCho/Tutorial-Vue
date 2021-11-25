<!-- 11: CRIANDO O FORMULARIO COM POST REQUEST-->
<!-- TWO-WAY BINDING (v-model):explicar binding automaticao -->
<template>
    <form class="form-card">
        <input
        class="form-card-title"
        type="text"
        name="titulo"
        v-model="form.title"
        placeholder="Título"
        />
        <textarea
        class="autoresize"
        name="detalhes"
        v-model="form.content"
        placeholder="Digite o conteúdo..."
        ></textarea>
        <button class="btn" v-on:click="postNote">Criar</button>
    </form>
</template>



<!-- 11:Criando um post request -->
<script>
import axios from "axios";

export default {
  name: 'Formulario',
  methods: {
     postNote() {
       axios
         .post("http://localhost:8000/api/notes/", {title:this.form.title, content:this.form.content})
         .then((res) => {
           this.user = res.data;
         })
         .catch((error) => {
           console.log(error);
         });
     },
   },
   data: function(){
    return{
       form:{
           title:'',
           content:''
       }
    }
   }
}
</script>

<style>
.form-card{
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 40rem;
    height: 8rem;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.5);
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem 0.4rem 0.5rem;
  }

input{
    border: none;
    margin-top: 0.5rem;
    font-size: 1.5rem;
    padding-bottom: 1rem;
}

textarea{
    border: none;
    font-size: 1rem;

}

.btn{
    display: block;
    background-color: #f7d943;
    border: none;
    border-radius: 0.2rem;
    height: 2rem;  
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
}
</style>