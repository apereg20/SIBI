<template>
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
            MUSIC</span>
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Corazón -->
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-spacer></v-spacer>
      <v-container fluid>
        <v-row dense>
          <!-- Lista de productos mostrados -->
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
                    <table height="50%">
                      <tr>
                        <td valign="middle" align="center">
                          <iframe :src="song.preview" width="300" height="80" margin="10px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </td>
                        <td valign="middle" align="center">
                          <span style="color:transparent">holaaaa</span>
                          <!-- Botón Corazón -->
                          <v-btn icon>
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
      </v-container>
    <v-spacer></v-spacer>
    <v-container justify="center" align="center" style="font-size: 20pt; font-family: 'Helvetica'; weight:black; color:white" text-color="white">Historial de la aplicación.</v-container>
    <v-spacer></v-spacer>
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
      drawer: false,
      num: 0,
      dni: this.$route.query.dni,
      historial: this.$route.query.historial,
      songs: [],
      colors: ["#952175", "#00ACC1", "#FFB300", "#E91E63", "#8BC34A"],
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/home" },
        { title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
        { title: "Favoritos", icon: "mdi-heart", link: "/favoritas" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ],
    };
  },

      /////////////////////
     //     MÉTODOS     //
  /////////////////////
  methods: {

    getSong() {
      console.log("ESTOY EN GET SONG");
      this.songs = [];
      for(var i = 0; i < this.historial.length; i++){
        axios.get(direccionIp + "/getSongs", { 
            params:{
                genre: this.historial[i].genre,
                artist: this.historial[i].artist,
                busqueda: this.historial[i].busqueda,
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
        
      }
      var param = {
        genre: this.genre,
        artist: this.artist,
        type: this.aux,
        busqueda: this.busqueda,
      };
      this.historial.push(param);
      
      console.log("SALGO DE GET SONG\n\n");
    },
    
  }
};
</script>