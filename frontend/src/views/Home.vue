<template onload="filtros">
  <v-app id="musica" style="background: #110C3A">
    <v-card color="#110C3A" height="50px">
      <!-- BARRA SUPERIOR -->
      <v-toolbar
        style="background: #110C3A;
        background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
        background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
        dark
      >
        <!-- Icono Barra Lateral -->
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- Título -->
        <v-toolbar-title>
          <span style="font-size: 20pt; font-family: 'Helvetica'; weight:black">
            MUSIC ~  {{ userName }}</span
          >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Corazón -->
        <v-btn icon @click="cambiarPantalla('Favoritas')">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <!-- Botón Cerrar Sesión -->
        <v-btn icon @click="cambiarPantalla('Entrada')">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="850"
      color="#110C3A"
    >
      <!-- CONTENIDO -->
      <v-main> 
        <!-- CARRUSEL DE PREVISUALIZACIONES -->
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          align="center"
          justify="center"
        >
          <v-carousel-item
            v-for="(slide, i) in this.slides"
            :key="i"
            :src="slide.src"
            :position="slide.position"
          >
            <v-row class="fill-height" align="center" justify="center">
              <div :class="slide.class">{{ slide.text }}</div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <!-- FORMAS DE BÚSQUEDA -->
        <v-card
          dark
          height="100px"
          style="background: #110C3A;
        background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
        background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
        >
          <v-toolbar
            height="120px"
            dark
            style="background: #110C3A;
          background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
          background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
          >
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Género:
              <v-combobox :items="generos" v-model="genre" outlined dense rounded ></v-combobox>
            </v-toolbar-title>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Artista:
               <v-combobox :items="artistas" v-model="artist" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Búsqueda por título:
              <v-text-field
                rounded
                outlined
                dense
                label="Search"
                v-model="busqueda"
                v-on:keyup.enter="getSong()"
              ></v-text-field>
            </v-toolbar-title>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Ordenar por:
              <v-combobox
                :items="types"
                label="Cualquiera"
                v-model="type"
                multiple="multiple"
                outlined
                dense
                rounded
              ></v-combobox>
            </v-toolbar-title>
            <!-- Separador -->
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <!-- BOTONES -->
        <v-card color="2F123F" height="50px">
          <v-toolbar
            height="50px"
            dark
            style="background: #110C3A;
          background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
          background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
          >
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="getSong()" style="background: #4C1E45">Buscar</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-btn @click="randomSong()" style="background: #4C1E45">¡Recomendación aleatoria!</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-btn @click="personalizedSong()" style="background: #4C1E45">¡Recomendación personalizada!</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <v-card color="2F123F" height="50px">
          <v-toolbar
            height="50px"
            dark
            style="background: #110C3A;
          background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
          background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
          >
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="colaborativeFilter()" style="background: #4C1E45">¡Recomendación personalizada según los gustos de otros usuarios similares a ti!</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
      </v-main>
      <!-- CONTENEDOR DE CANCIONES -->
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-row dense>
            <v-col cols="12">
              <!-- Bucle que recorre todos los elementos de la lista itemsMusic -->
              <v-col v-for="(song, i) in songs" :key="i" cols="flex">
                <v-card :color="song.color" dark>
                  <!-- Ponemos los datos de la canción -->
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="song.name"
                      ></v-card-title>
                      <v-card-subtitle v-text="song.artist"></v-card-subtitle>
                      <v-card-text v-text="song.genre"></v-card-text>
                    </div>
                    <table height="50%">
                      <tr>
                        <td valign="middle" align="center">
                          <iframe :src="song.preview" width="300" height="80" margin="10px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </td>
                        <td valign="middle" align="center">
                          <span style="color:transparent">holaaaa</span>
                          <!-- Botón Dislike -->
                          <v-btn icon @click="addDislike(song)">
                            <v-icon> {{ song.iconD }} </v-icon>
                          </v-btn>
                          <!-- Botón Corazón -->
                          <v-btn icon @click="addFavs(song)">
                            <v-icon> {{ song.iconF }} </v-icon>
                          </v-btn>
                          <span style="color:transparent">holaaaa</span>
                        </td>
                        <td valign="middle" align="center">
                          <v-avatar class="ma-3" size="125" tile>
                            <v-img :src="song.cover"></v-img>
                          </v-avatar>
                        </td>
                      </tr>
                    </table>
                  </div>
                </v-card>
              </v-col>          
            </v-col>
            <v-col cols="12">
              <!-- Bucle que recorre todos los elementos de la lista itemsMusic -->
              <v-col cols="flex">
            <div class="d-flex flex-no-wrap justify-space-between">
            <v-btn v-if="visible" id="botonMostrarMas" dark cols="flex" valign="middle" align="center" @click="getAllRecommendSongs()" style="background: #4C1E45;">¡Mostrar más!</v-btn>
            </div>
              </v-col></v-col>
          </v-row>
        </v-layout>
      </v-container>
      <!-- MENÚ DESPLEGABLE IZQUIERDO -->
      <v-navigation-drawer
        temporary
        absolute
        v-model="drawer"
        color="#110C3A"
        dark
        style="background: #110C3A;
        background: -webkit-linear-gradient(to left, #110C3A, #351442, #4C1E45;
        background: linear-gradient(to left,  #110C3A, #351442, #4C1E45);"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon large>mdi-menu</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Menú</v-list-item-title>
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>
        <!-- Lista de elementos -->
        <v-list dense class="pa-0" flat>
          <v-list-item-group>
            <!-- Bucle que recorre los elementos de la lista items -->
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="cambiarPantalla(item.link)"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
</template>

<script>
  const axios = require("axios");
  const direccionIp = "http://127.0.0.1:3000";
  document.cookie = 'same-site-cookie=foo; SameSite=Lax'; 
  document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
  export default {
    props: {
      source: String
    },
    name: "App",
    data() {
      return {
        name: "inicio",
        userName: "",
        busqueda: "",
        drawer: false,
        genre: "Cualquiera",
        artist: "Cualquiera",
        changeIcon: "",
        dni: this.$route.query.dni,
        art: "",
        visible: false,
        type: [],
        num: 0,
        aux: [],
        songs: [],
        generos: [],
        artistas: [],
        favs: [],
        hateds: [],
        historial: [],
        usuariosVecinos: [],
        vecinosDepurados: [],
        songsNoDepuradas: [],
        songsDepuradas: [],
        slides: [
          {
            position: "center",
            text: "Descubre nuevos artistas",
            src:
              "https://elnuevopais.net/wp-content/uploads/2017/09/Bad-Bunny.jpg",
            class: "display-3"
          },
          {
            position: "center",
            text: "Encuentra música adaptada a tus gustos",
            src:
              "https://s1.eestatic.com/2020/07/03/invertia/empresas/Musica-Festivales_de_musica-Turismo-Mad_Cool-Benidorm-Coronavirus-Enfermedades_infecciosas-Infecciones-Impacto_coronavirus-Empresas_502461416_155038081_1706x960.jpg",
            class: "display-3 white--text"
          },
          {
            position: "center",
            text: "Descubre música de forma aleatoria",
            src:
              "https://ocioenlasierra.com/wp-content/uploads/2019/09/concierto-fiesta-1.jpg",
            class: "display-3"
          },
          {
            position: "center",
            text: "Recomendaciones sólo para tí",
            src:
              "https://image.freepik.com/foto-gratis/dj-profesional-mezclador-musica-fiesta-concierto-electronico_118086-2831.jpg",
            class: "display-3 white--text"
          }
        ],
        items: [
          { title: "Inicio", icon: "mdi-home", link: "Home" },
          //{ title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
          { title: "Favoritos", icon: "mdi-heart", link: "Favoritas" },
          { title: "Ayuda", icon: "mdi-help", link: "Help" },
          { title: "Cerrar Sesión", icon: "mdi-exit-to-app", link: "Entrada"}
        ],
        types: ["Más Animadas primero", "Menos Animadas primero","Más Bailables primero", "Menos Bailables primero", "Más Enérgicas primero", "Más Tranquilas primero", "Más Populares primero", "Menos Populares primero"],
        colors: ["#952175", "#00ACC1", "#FFB300", "#E91E63", "#8BC34A"],
      };  
    },

      /////////////////////
     //     MOUNTED     //
    /////////////////////
    mounted() {
      console.log("ESTOY EN MOUNTED DE " + this.dni);
      this.filtros();
      console.log("SALGO DE MOUNTED\n\n");
    },

      /////////////////////
     //      WATCH      //
    /////////////////////
    watch:{
      genre:function () {
        if(this.genre != "" && this.genre != "Cualquiera"){
          this.rellenaArtistaG(this.genre);
        }else{
          this.filtros();
          this.rellenarArtistas();
        }
      },
      type:function() {
        if(this.type.length > 2){
          alert("Puede aplicar un máximo de 2 opciones de ordenación.");
          for(var i = 2; i < this.type.length; i++){
            this.type.splice(i, 1);
          }
        }
      },
    },

      /////////////////////
     //     MÉTODOS     //
    /////////////////////
    methods: {

      /****** CAMBIAR PANTALLA ******/
      cambiarPantalla(pantalla) {
        console.log(this.$route.path);
        if (pantalla == "Home") {
          this.songs = [];
          this.filtros();
          this.drawer = !this.drawer;
        }
        else{
          this.$router.push({ name: pantalla, query:{dni: this.dni} });
        }
      },

      /****** GET NAME ******/
      getName(){
        axios.post(direccionIp + "/getUserName", {
          dni: this.dni
        }).then(response => {
          var json = {msg: 'Error'};
          if(JSON.stringify(response.data) == JSON.stringify(json)){
              alert("Datos mal introducidos");
          }
          else{
            console.log(response.data);
            this.userName = response.data;
          }
        })
      },

      /****** ESTÁ EN FAVORITAS ******/
      estaEnFavs(song, i){
        console.log("Estoy en saber si una cancion esta en fav.");
        if(i == 0){
          this.getFavs();
        }   
        var estaEnFav = false;
        setTimeout(() => {
          for(var i = 0; i < this.favs.length; i++){
            if(this.favs[i].name == song.name){
              estaEnFav = true;
              break;
            }
          }
        }, 100);
        return estaEnFav;
      },

      /****** AÑADIR A FAVORITAS ******/
      addFavs(song){
        console.log("Canción añadida a favoritas.");
        this.getFavs();
        this.getHateds();
        var aux = 3;
        var has_like = false;
        var has_dislike = false;
        setTimeout(() => {
          console.log(this.favs.length);
          for(var i = 0; i < this.favs.length; i++){
            if(this.favs[i].name == song.name){
              alert("Canción eliminada de favoritos.");
              song.iconF = 'mdi-heart-outline';
              this.filtros();
              has_like = true;
              aux = 0;
              break;
            }
            else{
              console.log("Esta canción no estaba en favoritos");
            }
          }
          if(has_like == false){
            for(var j = 0; j < this.hateds.length; j++){
              if(this.hateds[j].name == song.name){
                alert("Canción eliminada de lista de canciones que no te gustan.");
                song.iconD = 'mdi-thumb-down-outline';
                this.filtros();
                has_dislike = true;
                aux = 1;
                break;
              }
              else{
                console.log("Esta canción no estaba en canciones que no te gustan");
              }
            }
          }
          if(has_like == true || has_dislike == true){
            console.log("Borro relaciones existentes");
            axios.post(direccionIp + "/postDeleteRelation", {
              name: song.name,
              artist: song.artist,
              dni: this.dni,
              type: aux,
            }).then(respuesta => {
              console.log(respuesta.data);
            });
          }
          else{
            console.log("No existian relaciones");
          }
          this.getFavs();
          console.log(this.favs);
          if(has_like == false){
            console.log("La añado a favoritos " + song.name);
            axios.post(direccionIp + "/postNewSongLiked", {
              name: song.name,
              dni: this.dni,
              artist: song.artist,
            }).then(respuesta => {
              console.log(respuesta.data);
              song.iconF = 'mdi-heart';
              this.filtros();
              //alert("Canción añadida a canciones favoritas.");
            });
          }
        }, 100);
        console.log("Salgo de añadir a favoritos");
      },

      /****** AÑADIR A NO ME GUSTAN ******/
      addDislike(song){
        console.log("Canción añadida a canciones que no te gustan.");
        this.getFavs();
        this.getHateds();
        var aux = 3;
        var has_like = false;
        var has_dislike = false;
        setTimeout(() => {
          for(var i = 0; i < this.hateds.length; i++){
            if(this.hateds[i].name == song.name){
              alert("Canción eliminada de canciones que no te gustan.");
              song.iconD = 'mdi-thumb-down-outline';
              this.filtros();
              has_dislike = true;
              aux = 1;
              break;
            }
          }
          if(has_dislike == false){
            for(var j = 0; j < this.favs.length; j++){
              if(this.favs[j].name == song.name){
                alert("Canción eliminada de favoritas.");
                song.iconF = 'mdi-heart-outline';
                this.filtros();
                has_like = true;
                aux = 0;
                break;
              }
            }
          }
          if(has_like == true || has_dislike == true){
            axios.post(direccionIp + "/postDeleteRelation", {
              name: song.name,
              dni: this.dni,
              artist: song.artist,
              type: aux,
            }).then(respuesta => {
              console.log(respuesta.data);
            });
          }
          if(has_dislike == false){
            axios.post(direccionIp + "/postNewSongHated", {
              name: song.name,
              dni: this.dni,
              artist: song.artist,
            }).then(respuesta => {
              console.log(respuesta.data);
              song.iconD = 'mdi-thumb-down';
              this.filtros();
              //alert("Canción añadida a canciones que no te gustan.");
            });
          }
        }, 100);
      },

      /****** CARGAR LAS OPCIONES DE FILTROS ******/
      filtros() {
        this.genre="Cualquiera";
        this.artist="Cualquiera";
        this.rellenarGeneros();
        this.rellenarArtistas();
        this.getName();
      },

      /****** RELLENAR GÉNEROS ******/
      rellenarGeneros() {
        console.log("ESTOY EN RELLENAR GENEROSSS");
        this.generos = [];
        if(this.generos.length <= 0){
          axios.get(direccionIp + "/getGeneros").then(respuesta => {
            for (var i = 0; i < respuesta.data.length; i++) {
              if(respuesta.data[i] != null){
                this.generos.push(respuesta.data[i]);
              }
            }
          });
          this.generos.push("Cualquiera");
          console.log("SALGO DE RELLENAR GENEROS\n\n");
        }
      },

      /****** RELLENAR ARTISTAS ******/
      rellenarArtistas() {
        console.log("ESTOY EN RELLENAR ARTISTASSS");
        this.artistas = [];
        axios.get(direccionIp + "/getArtistas").then(respuesta => {
          for (var i = 0; i < respuesta.data.length; i++) {
            if(respuesta.data[i] != null){
                this.artistas.push(respuesta.data[i]);
              }
          }
        });
      
        this.artistas.push("Cualquiera");
        console.log("SALGO DE RELLENAR ARTISTAS\n\n");
      },

      /****** RELLENA ARTISTA GENERO ******/
      rellenaArtistaG(genre) {
        console.log("ESTOY EN RELLENAR ARTISTAS DE UN GENERO " + genre);
          axios.get(direccionIp + "/getArtistasG", {
            params: {
              genre: genre,
            }
          }).then(respuesta => {
            this.artistas = [];
            for (var i = 0; i < respuesta.data.length; i++) {
              this.artistas.push(respuesta.data[i]);
            }
          });
        this.artistas.push("Cualquiera");
        console.log("SALGO DE RELLENAR ARTISTAS DE UN GENERO\n\n");
      },

      /****** RANDOM SONG ******/
      randomSong() {
        console.log("ESTOY EN RANDOM SONG");
        this.songs = [];
        this.getFavs();
        this.getHateds();
        setTimeout(() =>{
          var random = Math.floor(Math.random() * this.generos.length);
          var g = this.generos[random];
          axios.get(direccionIp + "/getRandomSongs",{
            params:{
              genre: g,
              dni: this.dni,
            },
          }).then(response => {
            if(response.data[0] == " ERROR"){
              alert(response.data[0]);
            }
            else {
              if(response.data[0] == undefined){
                this.randomSong();
              }
              else {
                var valida = false;
                do{
                  var randomm = Math.floor(Math.random() * response.data.length);
                  var inFav = false;
                  var inHated = false;
                  for(var x = 0; x < this.favs; x++){
                    if(response.data[randomm].name == this.favs[x].name){
                      inFav = true;
                      break;
                    }
                  }
                  if(inFav == false){
                    for(var y = 0; y < this.hateds; y++){
                      if(response.data[randomm].name == this.hateds[y].name){
                        inHated = true;
                        break;
                      }
                    }
                  }
                  if(inFav == false && inHated == false){
                    this.songs.push(response.data[randomm]);
                    valida = true;
                  }
                } while(valida == false);
                this.songs[0].color = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.songs[0].iconF = 'mdi-heart-outline';
                this.songs[0].iconD = 'mdi-thumb-down-outline';
              }
            }
          });
        }, 200);
        this.type = [];
        this.artist = "Cualquiera";
        this.busqueda = "";
        this.genre = "Cualquiera";
        console.log("SALGO DE RANDOM SONG\n\n");
      },

      /****** GET SONG ******/
      getSong() {
        console.log("ESTOY EN GET SONG");
        this.songs = [];
        this.getFavs();
        this.getHateds();
        for(var j = 0; j < this.type.length; j++){
          for(var i = 0; i < this.types.length; i++){
            if(this.type[j] == this.types[i]){
              if(i == 0){
                this.aux[j] = "+animada";
              }
              else if(i == 1){
                this.aux[j] = "-animada";
              }
              else if(i == 2){
                this.aux[j] = "+bailable";
              }
              else if(i == 3){
                this.aux[j] = "-bailable";
              }
              else if(i == 4){
              this.aux[j] = "+energica";
              }
              else if(i == 5){
                this.aux[j] = "-energica";
              }
              else if(i == 6){
                this.aux[j] = "+popular";
              }
              else if(i == 7){
                this.aux[j] = "-popular";
              }
            }
          }
        }
        if(this.type.length == 0){
          this.aux[0] = "No";
        }
        axios.get(direccionIp + "/getSongs", { 
          params:{
            genre: this.genre,
            artist: this.artist,
            type: this.aux,
            busqueda: this.busqueda,
          },
        }).then(
        respuesta => {
          if(respuesta.data[0] == "No hay canciones que cumplan estos criterios de búsqueda."){
            alert(respuesta.data[0]);
          }else{
            this.num = 0;
            for(var i = 0; i < respuesta.data.length; i++){
              this.songs.push(respuesta.data[i]);
              this.songs[i].color = this.colors[this.num];
              this.songs[i].iconF = 'mdi-heart-outline';
              this.songs[i].iconD = 'mdi-thumb-down-outline';
              this.num = this.num + 1;
              if(this.num == this.colors.length){
                this.num = 0;
              }
            }
            for(var k = 0; k < this.songs.length; k++){
              if(this.favs.length > 0){
                for(var l = 0; l < this.favs.length; l++){
                  if(this.songs[k].name == this.favs[l].name){
                    this.songs[k].iconF = 'mdi-heart';
                    l = this.favs.length;
                  }
                }
              }
              if(this.hateds.length > 0){
                for(var m = 0; m < this.hateds.length; m++){
                  if(this.songs[k].name == this.hateds[m].name){
                    this.songs[k].iconD = 'mdi-thumb-down';
                    m = this.hateds.length;
                  }
                }
              }
            }
          }
        });
        this.aux = [];
        this.type = [];
        this.artist = "Cualquiera";
        this.busqueda = "";
        this.genre = "Cualquiera";
        console.log("SALGO DE GET SONG\n\n");
      },

      /****** GET FAVS ******/
      getFavs() {
        this.favs = [];
        console.log("ESTOY en GETFAVS");
        axios.post(direccionIp + "/getFavs",{ 
            dni: this.dni, 
        }).then(respuesta => {
          var json = {msg: 'Error'};
          if(JSON.stringify(respuesta.data) == JSON.stringify(json)){
            console.log('No tienes canciones favoritas.')
          }else{
            this.favs = respuesta.data;
          }
        });
      },

      /****** GET HATEDS ******/
      getHateds() {
        this.hateds = [];
        console.log("ESTOY en GETHATEDS");
        axios.post(direccionIp + "/getHateds",{ 
            dni: this.dni, 
          }).then(respuesta => {
          var json = {msg: 'Error'};
          if(JSON.stringify(respuesta.data) == JSON.stringify(json)){
            console.log('No tienes canciones odiadas.')
          }else{
            this.hateds = respuesta.data;
          }
        });
      },

      /****** PERSONALIZED SONG ******/
      personalizedSong(){
        console.log("Estamos en la función PERSONALIZED SONG");
        var freqGenre = "";
        var freqArtist = "";
        var mostFrecGenre = 0;
        var mostFrecArtist = 0;
        var posibleGenres = [];
        var posibleArtists = [];
        this.songs = [];
        this.getFavs();
        this.getHateds();
        setTimeout(() =>{
          for (var i = 0; i < this.favs.length; i++) {
            var countGenre = 1;
            var countArtist = 1;
            for (var j = i; j < this.favs.length; j++) {
              if (this.favs[i].genre == this.favs[j].genre) {
                countGenre++;
              }
              if (mostFrecGenre < countGenre) {
                mostFrecGenre = countGenre;
                freqGenre = this.favs[i].genre;
              }
              if (this.favs[i].artist == this.favs[j].artist) {
                countArtist++;
              }
              if (mostFrecArtist < countArtist) {
                mostFrecArtist = countArtist;
                freqArtist = this.favs[i].artist;
              }
            }
          }
          this.rellenaArtistaG(freqGenre);
          var generoArtista = false;
          setTimeout(()=> {
            for(var w = 0; w < this.artistas.length; w++){
              if(this.artistas[w] == freqArtist){
                generoArtista = true;
                break;
              }
            }
            if(generoArtista == false){
              freqArtist = "";
            }
            if (freqGenre == "" && freqArtist == "") {
              alert("No se puede dar una recomendación personalizada ya que no hay datos suficientes. "  
                    + "La recomendación será aleatoria.");
              var random = Math.floor(Math.random() * this.generos.length);
              freqGenre = this.generos[random];   
              this.rellenaArtistaG(freqGenre);
              var random2 = Math.floor(Math.random() * this.artistas.length);
              freqArtist = this.artistas[random2];
            }
            else if(freqArtist == ""){
              console.log("No hay artista frecuente");
              axios.get(direccionIp + "/getArtistasG", {
                params:{
                  genre: freqGenre,
                },
              }).then(respuesta => {
                if(respuesta.data[0] == undefined){
                  this.personalizedSong();
                }
                else{
                  var au = 0;
                  for (var i = 0; i < respuesta.data.length; i++) {
                    posibleArtists.push(respuesta.data[i]);
                    au = i;
                  }
                  if(au >= 1){
                    var random3 = Math.floor(Math.random() * posibleArtists.length);
                    freqArtist = posibleArtists[random3]; 
                  }
                  else {
                    freqArtist = "";
                  }
                }
              });   
            }
            else if(freqGenre == ""){
              console.log("No hay genero frecuente");
              axios.get(direccionIp + "/getGenerosA", {
                params:{
                  artist: freqArtist,
                },
              }).then(respuesta => {
                for (var i = 0; i < respuesta.data.length; i++) {
                  posibleGenres.push(respuesta.data[i]);
                }
              });
              var random4 = Math.floor(Math.random() * posibleGenres.length);
              freqGenre = posibleGenres[random4];      
            }
            if(this.art != ""){
              this.artist = freqArtist;
            }
            else{
              this.artist = "";
              this.art = "";
            }
            this.genre = freqGenre;
            axios.get(direccionIp + "/getPersonalizedSongs", {
              params:{
                genre: this.genre,
                artist: this.artist,
                dni: this.dni,
              },
            }).then(response => {
              if(response.data[0] == "No hay canciones que cumplan estos criterios de búsqueda."){
                alert(response.data[0]);
              }else{
                if(response.data[0] == undefined){
                  this.personalizedSong();
                }
                else{
                  var valida = false;
                  do{
                    var randomm = Math.floor(Math.random() * response.data.length);
                    var inFav = false;
                    var inHated = false;
                    for(var x = 0; x < this.favs; x++){
                      if(response.data[randomm].name == this.favs[x].name){
                        inFav = true;
                        break;
                      }
                    }
                    if(inFav == false){
                      for(var y = 0; y < this.hateds; y++){
                        if(response.data[randomm].name == this.hateds[y].name){
                          inHated = true;
                          break;
                        }
                      }
                    }
                    if(inFav == false && inHated == false){
                      this.songs.push(response.data[randomm]);
                      valida = true;
                    }
                  } while(valida == false);
                  this.songs[0].color = this.colors[Math.floor(Math.random() * this.colors.length)];
                  this.songs[0].iconF = 'mdi-heart-outline';
                  this.songs[0].iconD = 'mdi-thumb-down-outline';
                }
              }
            });
            this.type = [];
            this.artist = "Cualquiera";
            this.busqueda = "";
            this.genre = "Cualquiera";
          }, 100);
        }, 200);
        console.log("Salimos de la función PERSONALIZED SONG");
      },

      /****** COLABORATIVE FILTER ******/
      colaborativeFilter: function(){
        console.log("Estamos en la función COLABORATIVE FILTER Máximo de 5 canciones recomendadas");   
        // 1. Guardamos las canciones favoritas del usuario Principal
        var oldFavs = this.favs.length;
        this.getFavs();
        setTimeout(() =>{
          console.log(this.favs);
          if(this.favs.length >= 5){
            if(this.favs.length == oldFavs){
              this.num = 0;  
              this.songs = [];
              if(this.songsDepuradas.length > 5){
                this.visible = true;
                alert("Mostrando las 5 canciones más recomendadas ordenadas de más a menos recomendadas. Pulsa el botón 'Mostrar Más' para ver todas las canciones recomendadas.");
              }
              else{
                if(this.songsDepuradas.length >= 1){
                  alert("Mostrando las canciones más recomendadas ordenadas de más a menos recomendadas. Sigue descubriendo música para obtener más recomendaciones.");
                }
                else{
                  alert("No hay canciones recomendadas para ti.");
                }  
              }
              //Recomendamos las 5 canciones con más coincidencias                 
              for(var i = 0; i < this.songsDepuradas.length; i++){
                this.songs.push(this.songsDepuradas[i]);
                this.songs[i].color = this.colors[this.num];
                this.songs[i].iconF = 'mdi-heart-outline';
                this.songs[i].iconD = 'mdi-thumb-down-outline';
                this.num = this.num + 1;
                if(this.num == this.colors.length){
                  break;
                }
              }
            }
            else{
              this.usuariosVecinos = [];
              //2. Buscamos a los vecinos (usuarios que les gustan las mismas canciones que a nosotros)
              this.buscarUsuariosVecinos();
              this.vecinosDepurados = [];
              setTimeout(() =>{
                //3. Nos quedamos con los que mas veces aparecen
                this.depurarUsuariosVecinos();
                setTimeout(() => {
                  if(this.vecinosDepurados.length < 1){
                    alert("No hay suficientes usuarios con gustos similares a los tuyos como para hacer una recomendación.");
                  }
                  else{
                    //4. Buscamos los que tengan un num de canciones favoritas (distintas de las que ama y odia el us principal) similar
                    this.depurarUsuariosPorCanciones();
                    setTimeout(() => {
                      //5. Buscamos las canciones mas coincidentes entre los usuarios
                      this.depurarCancionesRecomendadas();
                      setTimeout(() => {
                        this.songs = [];
                        //Reordenamos las canciones
                        this.reordenarRecomendacion();
                        //Ponemos color a las canciones
                        this.num = 0;  
                        if(this.songsDepuradas.length > 5){
                          this.visible = true;
                          alert("Mostrando las 5 canciones más recomendadas ordenadas de más a menos recomendadas. Pulsa el botón 'Mostrar Más' para ver todas las canciones recomendadas.");
                        }
                        else{
                          if(this.songsDepuradas.length >= 1){
                            alert("Mostrando las canciones más recomendadas ordenadas de más a menos recomendadas. Sigue descubriendo música para obtener más recomendaciones.");
                          }
                          else{
                            alert("No hay canciones recomendadas para ti.");
                          }  
                        }
                        //Recomendamos las 5 canciones con más coincidencias                 
                        for(var i = 0; i < this.songsDepuradas.length; i++){
                          this.songs.push(this.songsDepuradas[i]);
                          this.songs[i].color = this.colors[this.num];
                          this.songs[i].iconF = 'mdi-heart-outline';
                          this.songs[i].iconD = 'mdi-thumb-down-outline';
                          this.num = this.num + 1;
                          if(this.num == this.colors.length){
                            break;
                          }
                        }
                      }, 200);
                    }, 200);
                  }
                }, 300);
              }, 300);
            }
          }
          else{
            alert("No tiene suficientes canciones favoritas como para realizar una recomendación personalizada.");
          }
        }, 500);
        console.log("Salimos de la función COLABORATIVE FILTER");
      },

      /****** BUSCAR USUARIOS VECINOS ******/
      getAllRecommendSongs(){
        console.log("Mostrar todas las recomendaciones");
        this.num = 0; 
        for(var i = 5; i < this.songsDepuradas.length; i++){
          this.songs.push(this.songsDepuradas[i]);
          this.songs[i].color = this.colors[this.num];
          this.songs[i].iconF = 'mdi-heart-outline';
          this.songs[i].iconD = 'mdi-thumb-down-outline';
          this.num = this.num + 1;
          if(this.num == this.colors.length){
            this.num = 0;
          }
        }
        this.visible = false;
      },

      /****** BUSCAR USUARIOS VECINOS ******/
      buscarUsuariosVecinos(){
        for(var i = 0; i < this.favs.length; i++){
          axios.post(direccionIp + "/getNeighbours",  {
            name: this.favs[i].name,
          }).then((response) => {
            var mensaje = {msg: 'Error, no hay usuarios vecinos'};
            if(JSON.stringify(response.data[0]) == JSON.stringify(mensaje)){
              alert('Ups, se detectó un error, no hay usuarios vecinos.')
            }else{
              for(var j = 0; j < response.data.length; j++){
                this.usuariosVecinos.push(response.data[j]);
                console.log(response.data[j]);
              }
            }
          })
          .catch((error) => {
              console.log(error);
          });   
        }
      },

      /****** DEPURAR USUARIOS VECINOS ******/
      depurarUsuariosVecinos(){
        console.log("VECINOS DEPURADOS");
        for(var i = 0; i < this.usuariosVecinos.length; i++){
          var aux = 0;
          for(var j = 0; j < this.usuariosVecinos.length; j++){
            if(this.usuariosVecinos[i] == this.usuariosVecinos[j]){
              aux++;
            }
            //Buscamos vecinos con al menos 2 coincidencias
            if(aux >= 2){
              var existe = false;
              if(this.vecinosDepurados.length > 0){
                for(var k = 0; k < this.vecinosDepurados.length; k++){
                  if(this.vecinosDepurados[k] == this.usuariosVecinos[i]){
                    existe = true;
                    break;
                  }
                }
                if(existe == false){
                  console.log(this.usuariosVecinos[i]);
                  this.vecinosDepurados.push(this.usuariosVecinos[i]);
                }
              }else{
                console.log(this.usuariosVecinos[i]);
                this.vecinosDepurados.push(this.usuariosVecinos[i]);
              }
              break;
            }
          }
        }      
        //Eliminamos al propio usuario de la lista, al usuario actual
        var borrar = this.vecinosDepurados.indexOf(this.dni);
        this.vecinosDepurados.splice( borrar, 1 );
        console.log("VECINOS DEPURADOS = "+this.vecinosDepurados.length);
      },

      /****** DEPURAR USUARIOS POR CANCIONES ******/
      depurarUsuariosPorCanciones(){
        this.songsNoDepuradas = [];
        for(var i = 0; i < this.vecinosDepurados.length; i++){
          console.log("DEPURAMOS POR CANCIONES");
          axios.post(direccionIp + "/getSongsColaborativeFilter", {
            usuario: this.vecinosDepurados[i],
            dni: this.dni,
          })
          .then((response) => {
            var mensaje = {
              msg: 'Error, no hay canciones recomendadas por filtrado colaborativo'
            };
            if(JSON.stringify(response.data[0]) == JSON.stringify(mensaje)){
              alert('No hay canciones que mostrar por filtrado colaborativo.')
            } else {
              for(var j = 0; j < response.data.length; j++){
                console.log(response.data[j]);
                this.songsNoDepuradas.push(response.data[j]);
              }
            }
          })
          .catch((error) => {
              console.log(error);
          });
        }
      },

      /****** DEPURAR CANCIONES RECOMENDADAS ******/
      depurarCancionesRecomendadas() {
        console.log("Estamos en la función DEPURAR CANCIONES RECOMENDADAS");
        this.songsDepuradas = [];
        for(var i = 0; i < this.songsNoDepuradas.length; i++){
          var aux = 0;
          for(var j = 0; j < this.songsNoDepuradas.length; j++){
            if(this.songsNoDepuradas[i].name == this.songsNoDepuradas[j].name){
              aux++;
            }
            //Buscamos vecinos con al menos 2 coincidencias
            if(aux >= 2){
              var existe = false;
              var cont = 0;
              for(var x = 0; x < this.songsNoDepuradas.length; x++){
                if(this.songsNoDepuradas[i].name == this.songsNoDepuradas[x].name){
                  cont++;
                }
              }
              if(this.songsDepuradas.length > 0){
                for(var k = 0; k < this.songsDepuradas.length; k++){
                  if(this.songsDepuradas[k].name == this.songsNoDepuradas[i].name){
                    existe = true;
                    break;
                  }
                }
                if(existe == false){
                  this.songsNoDepuradas[i]['num'] = cont;
                  this.songsDepuradas.push(this.songsNoDepuradas[i]);
                }
              }else{
                this.songsNoDepuradas[i]['num'] = cont;
                this.songsDepuradas.push(this.songsNoDepuradas[i]);
              }
              break;
            }
          }
        }
        console.log("Salimos de la función DEPURAR CANCIONES RECOMENDADAS");
      },

      /****** REORDENAR RECOMENDACIÓN ******/
      reordenarRecomendacion() {
        console.log("Reordenamos las canciones");
        this.songsDepuradas.sort(function (a, b) {
          if (a.num < b.num) {
            return 1;
          }
          if (a.num > b.num) {
            return -1;
          }
          return 0;
        });
      },
    }
  };
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>