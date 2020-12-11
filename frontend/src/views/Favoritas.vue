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
            FAVORITAS DE {{ userName }}</span
          >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Home -->
        <v-btn icon @click="cambiarPantalla('/home')">
          <v-icon >mdi-home</v-icon>
        </v-btn>
        <!-- Botón Cerrar Sesión -->
        <v-btn icon @click="cambiarPantalla('/')">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
      <v-container fluid>
        <v-row dense>
          <!-- Lista de productos mostrados -->
          <v-col cols="12">
            <!-- Bucle que recorre todos los elementos de la lista itemsMusic -->
            <v-col v-for="(song, i) in favoritas" :key="i" cols="flex">
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
                        <v-btn icon @click="deleteFavs(song)">
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
        </v-row>
      </v-container>
    <!--- SEPARADOR --->
    <v-spacer></v-spacer>
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
      <!--- DIVISIÓN --->
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
        dni: this.$route.query.dni,
        userName:"",
        num: 0,
        favoritas: [],
        songs: [],
        colors: ["#952175", "#00ACC1", "#FFB300", "#E91E63", "#8BC34A"],
        items: [
          { title: "Inicio", icon: "mdi-home", link: "/home" },
          //{ title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
          { title: "Ayuda", icon: "mdi-help", link: "/help" },
          { title: "Cerrar Sesión", icon: "mdi-exit-to-app", link: "/"}
        ],
      };
    },

    /////////////////////
    //     MOUNTED     //
    /////////////////////
    mounted() {
      console.log("ENTRAMOS EN MOUNTED DE FAVORITAS");
      console.log(this.dni);
      this.getName();
      this.getFavs();
    },

    /////////////////////
    //     MÉTODOS     //
    /////////////////////
    methods: {

      /****** CAMBIAR PANTALLA ******/
      cambiarPantalla(pantalla) {
        console.log("QUEREMOS CAMBIAR DE PANTALLA");
        if (pantalla == "/home") { 
          this.$router.replace({path: "/home", query:{dni: this.dni} });
        }
        else{
          this.$router.push({ path: pantalla, query:{dni: this.dni} });
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

      /****** GET FAVS ******/
      getFavs() {
        console.log("ESTOY en GETFAVS");
        console.log(this.dni);
        axios.post(direccionIp + "/getFavs", {
          dni: this.dni,
        }).then(respuesta => {
          this.num = 0;
          for (var i = 0; i < respuesta.data.length; i++) {
            this.favoritas.push(respuesta.data[i]);
            this.favoritas[i].color = this.colors[this.num];
            this.favoritas[i].iconF = 'mdi-heart';
            this.favoritas[i].iconD = 'mdi-thumb-down-outline';
            this.num = this.num + 1;
            if(this.num == this.colors.length){
              this.num = 0;
            }
          }
        });
        setTimeout(() => {
          console.log(this.favoritas.length);
          console.log(this.favoritas);
        }, 200);
      },

      /****** ELIMINAR DE FAVORITAS ******/
      deleteFavs(song){
        console.log("Entro en eliminar de favoritos");
        var aux = 2;
        if(song.iconF == 'mdi-heart'){
          alert("Canción eliminada de favoritos.");
          song.iconF = 'mdi-heart-outline';
          aux = 0;
        }
        else{
          alert("Canción añadida a favoritos.");
          song.iconF = 'mdi-heart';
          aux = 1;
        }
        if(aux == 0){
          axios.post(direccionIp + "/postDeleteRelation", {
            name: song.name,
            artist: song.artist,
            dni: this.dni,
            type: aux,
          }).then(respuesta => {
            console.log(respuesta.data);
          });
        }
        if(aux == 1){
          axios.post(direccionIp + "/postNewSongLiked", {
            name: song.name,
            dni: this.dni,
            artist: song.artist,
          }).then(respuesta => {
            console.log(respuesta.data);
          });
        }
        if(aux == 0){
          var borrar = this.favoritas.indexOf(song.name);
          this.favoritas.splice( borrar, 1 );
        }
        else{
          this.favoritas.push(song);
        }
        console.log("Salgo de eliminar de favoritos");
      },
    }
  }
</script>