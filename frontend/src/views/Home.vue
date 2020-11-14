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
        <v-btn icon @click="cambiarPantalla('/favoritas')">
          <v-icon>mdi-heart</v-icon>
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
                v-model="type"
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
        <v-card color="2F123F" height="100px">
          <v-toolbar
            height="100px"
            dark
            style="background: #110C3A;
          background: -webkit-linear-gradient(to right, #110C3A, #351442, #4C1E45, #351442, #110C3A;
          background: linear-gradient(to right,  #110C3A, #351442, #4C1E45, #351442, #110C3A);"
          >
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="getSong()" style="background: #4C1E45">Buscar</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="personalizedSong()" style="background: #4C1E45">¡Recomiéndame algo personalizado!</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn @click="randomSong()" style="background: #4C1E45">¡Recomiéndame cualquier cosa!</v-btn>
            <!-- Separador -->
            <v-spacer></v-spacer>
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
                          <!-- Botón Corazón -->
                          <v-btn icon @click="addFavs(song)">
                            <v-icon>mdi-heart</v-icon>
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
        num: 0,
        aux: "",
        songs: [],
        generos: [],
        artistas: [],
        favs: [],
        historial: [],
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
          //{ title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
          { title: "Favoritos", icon: "mdi-heart", link: "/favoritas" },
          { title: "Ayuda", icon: "mdi-help", link: "/help" }
        ],
        types: ["Cualquiera", "Más Animadas primero", "Menos Animadas primero","Más Bailables primero", "Menos Bailables primero", "Más Enérgicas primero", "Más Tranquilas primero", "Más Populares primero", "Menos Populares primero"],
        colors: ["#952175", "#00ACC1", "#FFB300", "#E91E63", "#8BC34A"],
      };  
    },

      /////////////////////
     //     MOUNTED     //
    /////////////////////
    mounted() {
      console.log("ESTOY EN MOUNTED");
      this.filtros();
      console.log("SALGO DE MOUNTED\n\n");
    },

      /////////////////////
     //     MÉTODOS     //
    /////////////////////
    methods: {

      /****** CAMBIAR PANTALLA ******/
      cambiarPantalla(pantalla) {
        if (pantalla == "/") {
          this.$router.push({path: "/" });
        }
        else{
          this.$router.push({ path: pantalla });
        }
      },

      /****** AÑADIR A FAVORITAS ******/
      addFavs(song){
        console.log("Canción añadida a favoritas.");
        axios.post(direccionIp + "/addFav", {
            name: song.name,
            artist: song.artist,
        }).then(respuesta => {
          console.log(respuesta.data)
        });
        this.favs.push(song);
      },

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

      /****** RELLENAR ARTISTAS ******/
      rellenaArtistaG(genre) {
        console.log("ESTOY EN RELLENAR ARTISTASSS");
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
          this.type = "Cualquiera";
          this.artist = "Cualquiera";
          this.busqueda = "";
          this.genre = "Cualquiera";
        console.log("SALGO DE RANDOM SONG\n\n");
      },

      /****** GET SONG ******/
      getSong() {
        console.log("ESTOY EN GET SONG");
        this.songs = [];
        if(this.type != "Cualquiera" && this.type != ""){
          for(var i = 0; i < this.types.length; i++){
            if(this.type == this.types[i]){
              if(i == 1){
                this.aux = "+animada";
              }
              else if(i == 2){
                this.aux = "-animada";
              }
              else if(i == 3){
                this.aux = "+bailable";
              }
              else if(i == 4){
                this.aux = "-bailable";
              }
              else if(i == 5){
              this.aux = "+energica";
              }
              else if(i == 6){
                this.aux = "-energica";
              }
              else if(i == 7){
                this.aux = "+popular";
              }
              else if(i == 8){
                this.aux = "-popular";
              }
            }
          }
        }
        var param = {
          genre: this.genre,
          artist: this.artist,
          type: this.aux,
          busqueda: this.busqueda,
        };
        this.historial.push(param);
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
                this.songs[i]["color"] = this.colors[this.num];
                this.num = this.num + 1;
                if(this.num == this.colors.length){
                  this.num = 0;
                }
              }
            }
          });
          this.aux = "";
        console.log("SALGO DE GET SONG\n\n");
      },

      /****** GET FAVS ******/
      getFavs() {
          console.log("ESTOY en GETFAVS");
          axios.get(direccionIp + "/getFavs").then(respuesta => {
             for(var i = 0; i < respuesta.data.length; i++){
                this.favs.push(respuesta.data[i]);
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
        if (freqGenre == "" && freqArtist == "") {
          console.log("No se puede dar una recomendación personalizada ya que no hay datos suficientes. La recomendación será aleatoria.");
          var random = Math.floor(Math.random() * this.generos.length);
          freqGenre = this.generos[random];      
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
            for (var i = 0; i < respuesta.data.length; i++) {
              posibleArtists.push(respuesta.data[i]);
            }
          });
          var random3 = Math.floor(Math.random() * this.posibleArtists.length);
          freqArtist = this.posibleArtists[random3];      
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
          var random4 = Math.floor(Math.random() * this.posibleGenres.length);
          freqGenre = this.posibleGenres[random4];      
        }
        this.genre = freqGenre,
        this.artist = freqArtist,
        console.log("GENERO FRECUENTE: " + this.genre);
        console.log("ARTISTA FRECUENTE: " + this.artist);

        axios.get(direccionIp + "/getPersonalizedSongs", {
          params:{
            genre: this.genre,
            artist: this.artist,
          },
        }).then(response => {
          if(response.data[0] == "No hay canciones que cumplan estos criterios de búsqueda."){
            alert(response.data[0]);
          }else{
            var randomm = Math.floor(Math.random() * response.data.length);
            var randomC1 = Math.floor(Math.random() * this.colors.length);
            this.songs.push(response.data[randomm]);
            this.songs[0]["color"] = this.colors[randomC1];
          }
        });
        if(this.songs.length == 0){
          axios.get(direccionIp + "/getPersonalizedSongs", {
            params:{
              genre: this.genre,
              artist: "",
            },
          }).then(response => {
            if(response.data[0] == "No hay canciones que cumplan estos criterios de búsqueda."){
              alert(response.data[0]);
            }else{
              var randommm = Math.floor(Math.random() * response.data.length);
              var randomC2 = Math.floor(Math.random() * this.colors.length);
              this.songs.push(response.data[randommm]);
              this.songs[0]["color"] = this.colors[randomC2];
            }
          });
        }
        this.type = "Cualquiera";
        this.artist = "Cualquiera";
        this.busqueda = "";
        this.genre = "Cualquiera";
        console.log("Salimos de la función PERSONALIZED SONG");
      },
    }
  };
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
