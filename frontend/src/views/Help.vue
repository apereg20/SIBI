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
            MUSIC</span
          >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Home -->
        <v-btn icon @click="cambiarPantalla('/')">
          <v-icon >mdi-home</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
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
        <br>Esta aplicación te ayudará a descubrir música nueva.<br>
        Podrás ver a que género pertenece, quién la canta, su portada y podrás escuchar una preview.<br>
        Tan solo tienes que pulsar sobre el botón "Recomiéndame algo aleatorio" si quieres descubir música completamente nueva, de diferentes géneros y artistas.<br>
        Si quieres buscar alguna canción de un género o artista en concreto, o con alguna palabra en su nombre, selecciona los parámetros que deseas y pulsa sobre el botón "Buscar".<br>
        Cuándo busques canciones con tus filtros, podrás ordenarla según unos parámetros.<br>
        Si quieres una recomendación personalizada basada en tus gustos, solo tienes que pulsar sobre el botón "Recomiéndame algo personalizado".<br>
        Si quieres una recomendación personalizada por medio de un filtro colaborativo, solo tienes que pulsar sobre el botón "Recomendación personalizada según los gustos de otros usuarios similares a ti"<br>
        Esta recomendación utiliza un algoritmo de filtrado colaborativo que se encarga de buscar usuarios con gustos similares a los tuyos para poder recomendarte algo que te pueda gustar según  sus opiniones.<br>
        Siempre que te guste una canción podrás guardarla en tu lista de favoritos pulsando sobre el botón del corazón.<br>
        Puedes acceder a tu lista de canciones favoritas pulsando sobre el botón del corazón de la barra superior, o en el que se encuentra en el menú desplegable de la izquierda.<br><br>
        ¡Conoce mucha música nueva y diviértete!<br>
      </v-card-subtitle>
    </v-card>
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
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        //{ title: "Historial de canciones", icon: "mdi-headset", link: "/historial" },
        { title: "Favoritos", icon: "mdi-heart", link: "/favoritas" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ],
    };
  },
       /////////////////////
     //     MÉTODOS     //
    /////////////////////
    methods: {

        /****** CAMBIAR PANTALLA ******/
        cambiarPantalla(pantalla) {
        console.log("QUEREMOS CAMBIAR DE PANTALLA");
            if (pantalla == "/") { 
                this.dni = "";
                this.$router.push({path: "/" });
            }
            else{
                this.$router.push({ path: pantalla });
            }   
        },
    }
};
</script>