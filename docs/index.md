# Vue.js

Este tutorial tem como objetivo ser uma rápida introdução ao framework Vue.js. Ele abordará 
desde a instalação e preparação do ambiente até a realização de requisições por meio do Axios.
O tutorial seguirá o desenvolvimento de um app para criação de e visualização de notas (post-it's). 

!!! warning "Servidor back-end"

    Antes de iniciar o tutorial recomenda-se que tenha criado um servidor que proverá os dados a serem 
    recebidos nesta aplicação. Assim, recomenda-se a realização destes handouts:

    * [Tutorial Django](https://barbaratieko.github.io/tecweb/aulas/04-django/)
    * [Django REST Framework](https://barbaratieko.github.io/tecweb/aulas/08-django-rest/)


## O Vue.js

O Vue é um framework Javascript open source utilizado principalmente para a criação de single-page applications (aplicações de páginas únicas) e interfaces de usuário.
Trata-se de um framework progressivo, ou seja, [é possível utilizar o Vue em apenas uma parte de sua aplicação caso você já possua uma aplicação server side](https://vuejs.org/).
O Vue vêm ganhando rápida visibilidade nos ultimos tempos, firmando-se como um dos frameworks mais populares atualmente (junto ao Angular e ao React).  


## Instalação e setup
1. Antes de iniciar um projeto em Vue.js devemos garantir que uma versão do [Node.js](https://nodejs.org/en/) esteja instalada em sua máquina.
2. Neste tutorial utilizaremos a interface de linha de comandos (CLI) do Vue para acelerar a criação do projeto. Para instalar a CLI, abra um terminal e digite:
    
        npm install vue -g @vue/cli

3. Para iniciar um novo projeto utilizando a linha de comando basta escolher um diretório para armazenar o projeto e utilizar o seguinte comando no terminal:

        vue create <nome do projeto>

    No caso, substitua "nome do projeto" pelo nome que gostaria de dar ao projeto. Para o tutorial utilizaremos o nome "getit".

4. Em seguida selecione a opção 

        Default ([Vue 2] babel, eslint) 

    utilizando as teclas direcionais do teclado e pressione enter.

5. Ao terminar de criar o projeto, você poderá executar o app utilizando:

        npm run serve

    O app deverá estar disponível em [`http://localhost:8080/`](http://localhost:8080/)

!!! info "Extensão para o VS Code"

    Para auxiliar no desenvolvimento de arquivos .vue no VS Code
    recomenda-se utilizar a extensão [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

## Iniciando o desenvolvimento
### Estrutura do projeto
Neste tutorial vamos editar majoritariamente os arquivos contidos no diretório `src`, localizado na pasta do projeto.
Este diretório contém:

* `main.js`: serve como ponto de entrada da aplicação. É geralmente o arquivo em que os components e bilbiotecas utilizados no projeto são registrados.
* `App.vue`: componente chamado pelo main.js, ou seja, componente de mais alto nível e renderizado na página inicial.
* `components`: diretório para armazenar os componentes criados no projeto
* `assets`: diretório para armazenar arquivos estáticos, como css's e imagens

### Single file components
Components podem ser utilizados para fragmentar o desenvolvimento do app em blocos menores, facilitando a compreensão, manuseio e teste do código.
Além disso, é muito comum separar o template, da lógica e do estilo em arquivos diferentes quando trabalhamos com outros frameworks ou tecnologias para o desenvolvimento front-end.
Para o Vue.js, entretanto, é possível utilizar-se dos chamados `single file components` (os arquivos .vue) que permitem agrupar os três fatores mencionados em um só arquivo, 
sem a necessidade de criar um `.html`, `.css` e um `.js` para a construção de um component. 

No caso do aplicativo a ser desenvolvido por este tutorial, por exemplo, criaremos um .vue para o component que representará uma nota (postit)

### Criando o primeiro component
Crie o arquivo `src/components/Note.vue` com o seguinte conteúdo:
    
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

Depois subtitua o conteúdo do `src/App.vue` para mostrar o component criado:

    <template>
      <div id='App'>
        <Note/>
      </div>
    </template>

    <script>
    import Note from './components/Note.vue'

    export default {
        name: 'App',
        components: {
            Note
        }
    }
    </script>

Note que as tags `template` e `script` delimitam o template da lógica no single file component.

Nos códigos acima, criamos um template Note que será visualizado quando App.vue for chamado. Observe que o componente foi importado na parte do script e adicionado na parte do template do App.vue

Para adicionar estilo e dar a aparência de um post-it a nota criada, podemos adicionar o seguinte trecho ao `Note.vue` (depois do script):

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

Para utilizar fontes, adicione o seguinte trecho em `public/index.html`, logo após a tag `link` e antes da tag `title`:

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
      integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
      crossorigin="anonymous"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&family=Permanent+Marker&display=swap"
      rel="stylesheet"
    />

!!! info "Apagando os exemplos"

    Quando você iniciou o projeto, um arquivo "HelloWorld.vue" deve ter sido criado na pasta `components`.
    Você está livre para apagá-lo se desejar.

### Passando informações às notas
Ao adicionar os códigos acima ao projeto, percebe-se que adicionar mais notas ao App.vue iria apenas renderizar o mesmo 
cartão multiplas vezes. Para resolver o problema, podemos fazer com que cada cartão receba parâmetros que mudem o conteúdo
a ser renderizado. Para isso utilizamos props.

Modifique o `Note.vue` de forma a receber os props. Para isso, substitua a parte do `template` por:

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

Observe que os props a serem recebidos são do tipo String e são definidos na parte do script do component.

Agora podemos passar parâmetros quando chamarmos o Note no App.vue. Para testar, substitua
a tag `Note` no `App.vue` por:

    <div id='App'>
      <Note title="Receita de miojo" content="Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque
        em uma vasilha e aproveite seu snack :)"> 
      </Note>
      <Note title="Sorvete de banana" content="Coloque a banana no congelador e espere.">
      </Note>
    </div>

Note que agora foram renderizados duas notas com títulos e conteúdos diferente.

## Renderizando múltiplos components

Apesar de termos feito um avanço ao passar os parâmetros para as notas, ainda estamos passando informação diretamente pelo código na chamada da tag `Note`, 
além disso limitamos o número de notas para apenas a quantidade criada no no App.vue.
Assim, para melhorar, podemos renderizar notas a partir de uma array com as informações que desejamos incluir, tendo uma quantidade variável de notas a serem renderizadas.

Para simular uma array de dados, substitua o código no `main.js` por:

    import Vue from 'vue'
    import App from './App.vue'

    Vue.config.productionTip = false

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

Para que os dados sejam recebidos, substitua a parte do `script` do `App.vue` por:

    <script>
    import Note from './components/Note.vue'

    export default {
        name: 'App',
        props:["appData"],
        components: {
            Note
        },
    }
    </script>

Dos códigos acima, foi criado uma array de dados definida como **notes** no `main.js`. Esta array é passada como um prop denominado `appData`
para o `App.vue`.

Para renderizar os múltiplos components utilizaremos a diretiva `v-for` do Vue. Assim, substitua o conteúdo do `template` do `App.vue` por:

    <template>
        <div id='App'>
            <div class='card-container'>
                <Note v-for="note in appData" :key="note.id" :title="note.title" :content="note.content" />
            </div>
        </div>
    </template>

!!! info "Diretivas"

    Diretivas no Vue.js são atributos especiais no HTML (template) que permite a manipulação do DOM (Modelo de Objeto de Documento).
    Assim, o v-for, por exemplo, permite que iteremos sobre os dados no appData e criemos um component Note para cada
    valor da array recebida.

Aproveite e altere o estilo da página de forma a organizar as notas recebendo uma quantidade variável de informação.
Adicione ao final do `App.vue`:

    <style >
    .card-container{
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 3rem;
    }
    </style>

## Fazendo requisições
### Preparando para fazer as requisições
Agora que nosso aplicativo consegue obter informações de arrays e disponibiliza-la na forma de anotações, podemos receber dados de 
servidores externos à nossa aplicação. Utilizaremos o axios para tanto. Instale-o com o comando:

    npm i axios

No servidor que atuará como um back-end e disponibilizará os dados para nossa aplicação (handouts recomendados no começo do tutorial), 
instale o seguinte módulo:

    pip install django-cors-headers

E no arquivo `getit/settings.py`, adicione a seguinte linha ao `INSTALLED_APPS`:

    INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
    ]

Em `MIDDLEWARE` adicione na primeira linha:

    MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
    ]

E finalmente, no final do arquivo adicione: 

    CORS_ORIGIN_ALLOW_ALL = True

Assim, o servidor Django deve estar pronto para aceitar as requisições vindas do nosso aplicativo

### Utilizando o axios
Para realizar uma requisição do tipo GET com o axios, importe o axios e substitua a instância `Vue` no `main.js` por:

    import Vue from 'vue'
    import App from './App.vue'
    import axios from "axios";

    Vue.config.productionTip = false

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

Assim, os dados não virão de uma array criada no código, e sim de uma requisição feita para um servidor externo.

### Criando um formulário
Agora que conseguimos pegar dados utilizando requisições, vamos criar um formulário que mandará dados ao servidor externo
e este adicionará à lista de notas, fazendo com que as notas disponibilizadas no nosso aplicativo aumente.

Crie o arquivo `src/components/Formulario.vue` que será o componente para nosso formulário:

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

Vamos analisar a implementação do formulário.

Na parte do `script` temos os dados serem enviados como **data** (no caso, o elemento `form` dentro de data).
Ao olhar para a parte do `template` vemos que a diretiva `v-model` faz referência aos dados à serem mandados na nossa request.
A diretiva `v-model` é utilizada para criar interligações de mão dupla (two-way binding) entre os dados declarados no `script` (o elemento `form`)
e os valores colocados nos elementos `input, textarea e select` do `template`. 

Assim, a diretiva atualiza **automaticamente** os valores com base 
nas entradas de cada elemento. Se o valor no `script` fosse alterado, isso seria visível na página (`template`) e se o valor na página for alterado
(como uma entrada do usuário, por exemplo), o valor no `script` é alterado para cada instância, caracterizando a mão dupla.

Logo, quando o usuário aperta o botão de enviar, uma requisição do tipo POST é feita, enviando os dados que estão preenchidos no campo de texto.

Para adicionar o formulário ao nosso aplicativo basta inserir a linha seguinte no `App.vue`, logo abaixo do primeiro div do `template`:

    <Formulario/>

Adicione também o formulário aos components em `scripts`:

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

Com isso você deve ser capaz de postar novas notas no aplicativo.

## Rotação dos cartões
Para adicionar rotação aleatória aos cartões, substitua o `template` e o `script`
do `Note.vue` para:

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