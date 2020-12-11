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
        <!-- Título -->
        <v-toolbar-title>
          <span style="font-size: 20pt; font-family: 'Helvetica'; weight:black">
            MENÚ DE AYUDA
          </span>
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
    <!-- Separador -->
    <v-spacer></v-spacer>
    <v-card style="background: #110C3A;
        background: -webkit-linear-gradient(to left, #110C3A, #351442, #4C1E45, #351442, #110C3A;
        background: linear-gradient(to left, #110C3A, #351442, #4C1E45, #351442, #110C3A);" dark>
      <v-card-title
        class="headline"
      >
      Menú de ayuda de la aplicación.
      </v-card-title>
      <v-card-subtitle>
        <br>Esta aplicación te ayudará a descubrir música nueva.<br><br>
        Podrás ver a que género pertenece, quién la canta, su portada y podrás escuchar una preview.<br><br>
        Tan solo tienes que pulsar sobre el botón "Recomiéndame algo aleatorio" si quieres descubir música completamente nueva, de diferentes géneros y artistas.<br><br>
        Si quieres buscar alguna canción de un género o artista en concreto, o con alguna palabra en su nombre, selecciona los parámetros que deseas y pulsa sobre el botón "Buscar".<br>
        Cuándo busques canciones con tus filtros, podrás ordenarla según unos parámetros.<br><br>
        Si quieres una recomendación personalizada basada en tus gustos, solo tienes que pulsar sobre el botón "Recomiéndame algo personalizado".<br><br>
        Si quieres una recomendación personalizada por medio de un filtro colaborativo, solo tienes que pulsar sobre el botón "Recomendación personalizada según los gustos de otros usuarios similares a ti"<br><br>
        Esta recomendación utiliza un algoritmo de filtrado colaborativo que se encarga de buscar usuarios con gustos similares a los tuyos para poder recomendarte algo que te pueda gustar según  sus opiniones.<br><br>
        Siempre que te guste una canción podrás guardarla en tu lista de favoritos pulsando sobre el botón del corazón.<br><br>
        Puedes acceder a tu lista de canciones favoritas pulsando sobre el botón del corazón de la barra superior, o en el que se encuentra en el menú desplegable de la izquierda.<br><br>
        <br>¡Conoce mucha música nueva y diviértete!<br>
      </v-card-subtitle>
    </v-card>
    <!-- Separador -->
    <v-spacer></v-spacer>
  </v-app>
</template>

<script>
  const axios = require("axios");
  const direccionIp = "http://127.0.0.1:3000";
  export default {
    data() {
      return {
        drawer: false,
        dni: this.$route.query.dni,
      };
    },

      /////////////////////
     //     MOUNTED     //
    /////////////////////
    mounted() {
      console.log("ESTOY EN MOUNTED DE AYUDA DE " + this.dni);
      this.getName();
      console.log(this.dni);
      console.log("SALGO DE MOUNTED\n\n");
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
    }
  };
</script>