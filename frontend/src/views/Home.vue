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
            MUSIC</span
          >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Corazón -->
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <!-- Hoja 750 o 800 -->
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="800"
      color="#110C3A"
    >
      <!-- Hoja -->
      <!--<v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="50"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>-->

      <!-- CONTENIDO -->
      <v-content>
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
        <!-- FORMAS DE BÚSQUEDA color="2F123F" -->
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
            <v-toolbar-title>
              Género:
              <v-combobox :items="generos" v-model="genre" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Artista:
               <v-combobox :items="artistas" v-model="artist" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Búsqueda por título:
              <v-text-field
                rounded
                outlined
                dense
                label="Search"
                v-model="busqueda"
                v-on:keyup.enter="send()"
              ></v-text-field>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
              Tipo de canción:
              <v-combobox
                :items="types"
                v-model="type"
                outlined
                dense
                rounded
              ></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <!-- BOTONES -->
        <v-card color="2F123F" height="100px">
          <v-toolbar
            height="100px"
            dark
            style="background: #110C3A;
          background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
          background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
          >
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="getSong()" style="background: #4C1E45">Buscar</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="personalizedSong()" style="background: #4C1E45">¡Recomiéndame algo personalizado!</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="randomSong()" style="background: #4C1E45">¡Recomiéndame cualquier cosa!</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
      </v-content>
      <!-- CONTENEDOR DE CANCIONES -->
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-row dense>
            <v-col cols="12">
              <!-- Bucle que recorre todos los elementos de la lista itemsMusic -->
              <v-col v-for="(song, i) in songs" :key="i" cols="flex">
                <!-- Ponemos la imagen -->
                <!-- QUE ME DEVUELVA EL COLOR -->
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
                    <v-avatar class="ma-3" size="125" tile>
                      <v-img :src="song.src"></v-img>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-col>
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
              :to="item.link"
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
  export default {
    props: {
      source: String
  },
  name: "App",
  data() {
    return {
      name: "inicio",
      busqueda: "",
      drawer: false,
      genre: "Cualquiera",
      artist: "Cualquiera",
      type: "Cualquiera",
      generos: [],
      artistas: [],
      historial: [],
      num: 0,
      songs: [],
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
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
        { title: "Favoritos", icon: "mdi-heart", link: "/favoritas" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ],
      types: ["Bailable", "Tranquila", "Alegre", "Triste"],
      colores:[],
      colors: ["#952175", "#00ACC1", "#FFB300", "#E91E63", "#8BC34A"],
    };
  },

    /////////////////////
   //     MOUNTED     //
  /////////////////////
  mounted() {
    console.log("ESTOY EN MOUNTED");
    this.filtros();
    axios.get(direccionIp + "/getRandomSongs").then(response => {
      this.aleatorios(response.data);
    });
    console.log("SALGO DE MOUNTED\n\n");
  },

    /////////////////////
   //     MÉTODOS     //
  /////////////////////
  methods: {

    /****** CARGAR LAS OPCIONES DE FILTROS ******/
    filtros() {
      this.rellenarGeneros();
      this.rellenarArtistas();
    },

    /****** RELLENAR GÉNEROS ******/
    rellenarGeneros() {
      console.log("ESTOY EN RELLENAR GENEROSSS");
      if(this.generos.length <= 0){
        axios.get(direccionIp + "/getGeneros").then(respuesta => {
          for (var i = 0; i < respuesta.data.length; i++) {
            this.generos.push(respuesta.data[i]);
          }
        });
        this.generos.push("Cualquiera");
        console.log("SALGO DE RELLENAR GENEROS\n\n");
      }
    },

    /****** RELLENAR ARTISTAS ******/
    rellenarArtistas() {
      console.log("ESTOY EN RELLENAR ARTISTASSS");
      axios.get(direccionIp + "/getArtistas").then(respuesta => {
        for (var i = 0; i < respuesta.data.length; i++) {
          this.artistas.push(respuesta.data[i]);
        }
      });
      this.artistas.push("Cualquiera");
      console.log("SALGO DE RELLENAR ARTISTAS\n\n");
    },

    /****** RANDOM SONG ******/
    randomSong() {
      console.log("ESTOY EN RANDOM SONG");
      this.songs = [];
      var random = Math.floor(Math.random() * this.generos.length);
      var g = this.generos[random];
      axios.get(direccionIp + "/getRandomSongs",{
          params:{
            genre: g,
          },
        }).then(respuesta => {
          if(respuesta.data[0] == "No hay canciones"){
            alert(respuesta.data[0]);
          }else{
            var random = Math.floor(Math.random() * respuesta.data.length);
            var random2 = Math.floor(Math.random() * this.colors.length);
            this.songs.push(respuesta.data[random]);
            this.songs[0]["color"] = this.colors[random2];
          }
        });
      console.log("SALGO DE RANDOM SONG\n\n");
    },

    getSongColor: function() {
      console.log(this.colors.length);
      console.log(this.num);
      if (this.num >= this.colors.length) {
        this.num = 0;
        console.log(this.colors[this.num]);
        return this.colors[this.num];
      } else if (this.num < this.colors.length()) {
        this.num = this.num + 1;
        return this.colors[this.num];
      }
    },

    /////////////////////
    // RECOMENDACIONES //
    /////////////////////

    aleatorios(response) {
      console.log("ESTOY EN ALEATORIOOOOS");
      for (var i = 0; i < response.length; i++) {
        this.songs.push(response[i]);
      }
      this.songs = [];
    },

    getSong() {
      console.log("ESTOY EN GET SONG");
      this.songs = [];
      var param = {
        genre: this.genre,
        artist: this.artist,
        type: this.type,
        busqueda: this.busqueda,
      };
      this.historial.push(param);
      axios.get(direccionIp + "/getSongs", { 
        params:{
          genre: this.genre,
          artist: this.artist,
          type: this.type,
          busqueda: this.busqueda,
        },
      }).then(
        respuesta => {
          if(respuesta.data[0] == "No hay canciones que cumplan estos criterios de búsqueda."){
            alert(respuesta.data[0]);
          }else{
            console.log(respuesta.data.length);
            this.num = 0;
            for(var i = 0; i < respuesta.data.length; i++){
              this.songs.push(respuesta.data[i]);
              this.songs[i]["color"] = this.colors[this.num];
              this.num = this.num + 1;
              if(this.num == this.colors.length){
                this.num = 0;
              }
            }
          }
        });
      console.log("SALGO DE GET SONG\n\n");
    },

    recommend: function() {
      var searchGenre = "";
      var searchArtist = "";
      var searchType = "";
      console.log("Estamos en funcion RECOMMEND");

      //var mostSearchGenre = 0;
      //var mostSearchArtist = 0;
      //var mostSearchType = 0;

      //Bucle anidado For para buscar en el historial y recomendar

      //Recomendación aleatoria
      //HAY QUE COMPROBAR QUE DADOS LOS SIGUIENTES PARAMETROS EXISTE UNA CANCION
      //¿SIEMPRE SALE EL MISMO? COMO LE RECOMENDAMOS UNA COMPLETAMENTE ALEATORIA?
      if (searchGenre == "") {
        var random = Math.floor(Math.random() * this.genres.length);
        searchGenre = this.transform(this.genres[random]);
        console.log("GENERO: ", searchGenre);
      }
      if (searchArtist == "") {
        var random2 = Math.floor(Math.random() * this.artists.length);
        searchArtist = this.transform(this.artists[random2]);
      }
      if (searchType == "") {
        var random3 = Math.floor(Math.random() * this.types.length);
        searchType = this.transform(this.types[random3]);
      }

      var params = {
        genre: searchGenre,
        artist: "", //searchArtist,
        busqueda: "",
        type: "" //searchType,
      };

      this.$http.post("http://localhost:3000/getSongs", params).then(
        response => {
          if (
            response.body &&
            response.body.length &&
            response.body[0].message != "Error"
          ) {
            var random4 = Math.floor(Math.random() * response.body.length);
            this.songs = [response.body[random4]];
          } else {
            response.body = [
              {
                name:
                  "¡Ups! No se ha encontrado ninguna canción que cumpla los parámetros",
                year: "--"
              }
            ];
            this.songs = response.body;
          }
        },
        response => {
          alert("Ha habido un error en el envío: " + response.body);
        }
      );
      console.log("SALIMOS de funcion RECOMMEND\n\n");
    }
  }
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
