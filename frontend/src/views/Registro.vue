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
              REGISTRO</span
          >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
        <!-- Botón Corazón -->
        <v-btn icon @click="cambiarPantalla('Entrada')">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-card color="#110C3A" height="30px"></v-card>
    <v-card style="background: #110C3A">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card style="background: #110C3A;
            background: -webkit-linear-gradient(to right, #4C1E45, #351442,  #351442, #4C1E45;
            background: linear-gradient(to right, #4C1E45, #351442, #351442, #4C1E45);"
            dark
          >
            <v-toolbar style="background: #110C3A;
              background: -webkit-linear-gradient(to right, #4C1E45, #351442,  #351442, #4C1E45;
              background: linear-gradient(to right, #4C1E45, #351442, #351442, #4C1E45);"
              dark
            >
              <v-icon>
                mdi-badge-account-horizontal
              </v-icon>
              <v-spacer></v-spacer>
              <v-toolbar-title>
                Registro de usuario
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Nombre" type="text" prepend-icon="mdi-account-box" v-model="nombre"/>
                <v-text-field label="DNI" type="text" prepend-icon="mdi-smart-card" v-model="dni"/>
                <v-text-field label="email" type="text" prepend-icon="mdi-gmail" v-model="email"/>
                <v-text-field label="Contraseña" type="password" prepend-icon="mdi-lock" v-model="contraseña"  v-on:keyup.enter="mostrar"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn text @click="mostrar">
                Registrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
  const axios = require("axios");
  const direccionIp = "http://127.0.0.1:3000";
  export default {
    data: () => {
      return {
        nombre: "",
        dni: "",
        email: "",
        contraseña: "",
      };
    },

      /////////////////////
     //     MÉTODOS     //
    /////////////////////
    methods: {

      /****** MOSTRAR ******/
      mostrar: function() {
        if (
          this.nombre === undefined ||
          this.nombre === "" ||
          (this.dni === undefined || this.dni === "") ||
          (this.email === undefined || this.email === "") ||
          (this.contraseña === undefined || this.contraseña === "")
        ) {
          alert("Introduzca todos los parametros");
        } else {
          if (this.comprobarFormulario() == false) {
            console.log("Datos incompletos");
          } else {
            let body = {
              nombre: this.nombre,
              dni: this.dni,
              email: this.email,
              contraseña: this.contraseña,
            };
            axios
              .post(direccionIp + "/postNewUser", body)
              .then(response => {
                this.comprobarRespuesta(response.data);
              });
          }
        }
      },

      /****** COMPROBAR FORMULARIO ******/
      comprobarFormulario() {
        if (this.comprobarDNI() == false) {
          alert("El DNI introducido es incorrecto. Debe tener 8 números y 1 letra.");
          return false;
        }
        if (this.comprobarEmail() == false) {
          alert("El email introducido es incorrecto. Debe tener un nombre de longitud mínima 3, seguido de un '@' y un servidor de longitud mínima 3, seguido de un '.' y un dominio de longitud mínima 2 y máxima 4");
          return false;
        }
        if (this.comprobarContraseña() == false) {
          alert("La Contraseña introducida es incorrecta. Recuerda que debe tener al menos 3 caracteres.");
          return false;
        }
        return true;
      },

      /****** COMPROBAR DNI ******/
      comprobarDNI() {
        if (this.dni.length != 9) {
          return false;
        } else {
          let auxNumerosDNI = this.dni.substring(0, 8);
          let auxLetraDNI = this.dni.substring(8, 9);
          for (let i = 0; i < auxNumerosDNI.length; i++) {
            if (this.compruebaNumeros(auxNumerosDNI[i]) == false) {
              return false;
            }
          }
          if (this.compruebaLetraDNI(auxLetraDNI) != true) {
            return false;
          }
        }
        return true;
      },

      /****** COMPROBAR EMAIL ******/
      comprobarEmail() {
        console.log(this.email);
        if (this.email.length < 10) {
          return false;
        } else {
          for (let i = 0; i < this.email.length; i++) {
            if (this.email[i] == "@"){
              if(i < 3){
                return false;
              }
              else{
                console.log("tiene @ e i = " + i);
                for(let j = i; j < this.email.length; j++){
                  if(this.email[j] == "."){
                    console.log("tiene @ y j = " + j);
                    console.log("j - i = " + (j - i));
                    if((j - i) < 4){
                      return false;
                    }
                    else{
                      if(((this.email.length - j) <= 6) && ((this.email.length - j) > 2)){
                        console.log("longitud - j = " + (this.email.length - j));
                        return true;
                      }
                    }
                  }
                  else if((j + 1) == this.email.length){
                    return false;
                  }
                }
              }
            }
            else if((i + 1) == this.email.length){
              return false;
            }
          }
        }
      },

      /****** COMPROBAR CONTRASEÑA ******/
      comprobarContraseña() {
        if (this.contraseña.length < 3) {
          return false;
        }
        return true;
      },

      /****** COMPRUEBA NUMEROS ******/
      compruebaNumeros(numero) {
        switch (numero) {
          case "0":
            return true;
          case "1":
            return true;
          case "2":
            return true;
          case "3":
            return true;
          case "4":
            return true;
          case "5":
            return true;
          case "6":
            return true;
          case "7":
            return true;
          case "8":
            return true;
          case "9":
            return true;
        }
        return false;
      },

      /****** COMPRUEBA LETRA DNI ******/
      compruebaLetraDNI(letraDni) {
        var alf = "T,R,W,A,G,M,Y,F,P,D,X,B,N,J,Z,S,Q,V,H,L,C,K,E";
        var letra = letraDni.toUpperCase();
        console.log(letra);
        for (let i = 0; i < alf.length; i++) {
          if (letra == alf[i]) {
            return true;
          }
        }
        return false;
      },

      /****** CAMBIAR PANTALLA ******/
      cambiarPantalla(pantalla) {
          if (pantalla == "Home") {
            console.log(this.$route.path);
              this.$router.push({name: "Home", query:{dni: this.dni}});
          }
          else{
            console.log(this.$route.path);
              this.$router.push({ name: pantalla });
          }
      },

      /****** COMPROBAR RESPUESTA ******/
      comprobarRespuesta(respuesta) {
          console.log(respuesta);
        if (respuesta === "si") {
          alert("Bienvenido: " + this.nombre );
          this.$emit("entro", this.dni);
          this.cambiarPantalla("Home");
        } else {
          alert("Ya existe un usuario con DNI:" + this.dni);
        }
      },
    },
  };
</script>