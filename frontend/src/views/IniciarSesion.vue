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
                    INICIO DE SESIÓN</span
                >
                </v-toolbar-title>
                <!-- Separador -->
                <v-spacer></v-spacer>
                <!-- Botón Corazón -->
                <v-btn icon @click="cambiarPantalla('/')">
                <v-icon>mdi-exit-to-app</v-icon>
                </v-btn>
            </v-toolbar>
        </v-card>
        <v-card color="#110C3A" height="30px"></v-card>
        <v-card style="background: #110C3A">
            <v-row align="center" justify="center">
                <v-col cols="6">
                    <v-card style="background: #110C3A;
                        background: -webkit-linear-gradient(to right, #4C1E45, #351442,  #351442, #4C1E45;
                        background: linear-gradient(to right, #4C1E45, #351442, #351442, #4C1E45);"
                        dark
                    >
                        <v-card-title class="justify-center">
                            Iniciar Sesión
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="dni" type="text" label="Usuario(DNI)" outlined ></v-text-field>
                            <v-text-field v-model="contraseña" type="password" label="Contraseña" outlined  v-on:keyup.enter="comprobarInicioSesion()"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn text @click="comprobarInicioSesion()">Iniciar sesion</v-btn>
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
    name: "IniciarSesion",
    data: () => {
        return {
        dni: "",
        contraseña: "",
        userName: "",
        alerta: false,
        tipoAlerta: "",
        textoAlerta: "",
        };
    },

      /////////////////////
     //     MÉTODOS     //
    /////////////////////
    methods: {

        /****** CAMBIAR PANTALLA ******/
        cambiarPantalla(pantalla) {
            if (pantalla == "/home") {
                this.$router.push({path: "/home", query:{dni: this.dni} });
            }
            else{
                this.$router.push({ path: pantalla});
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
       
       /****** COMPROBAR INICIO DE SESIÓN ******/
        comprobarInicioSesion() {
            console.log(this.dni);
            console.log(this.contraseña);
            this.alerta = false;
            if (this.dni == "" && this.contraseña == "") {
                this.tipoAlerta = "error";
                this.alerta = true;
                this.textoAlerta = "Por favor, introduce usuario y contraseña";
            } else if (this.dni == "") {
                this.tipoAlerta = "error";
                this.alerta = true;

                this.textoAlerta = "Por favor, introduce tu usuario";
            } else if (this.contrasenña == "") {
                this.tipoAlerta = "error";
                this.alerta = true;
                this.textoAlerta = "Por favor, introduce tu contraseña";
            } else {
                axios.post(direccionIp + "/datosEntrada",{ 
                    dni: this.dni, 
                    contraseña: this.contraseña
                }).then(response => {
                    var json = {msg: 'Error, datos mal introducidos'};
                    console.log(response.json);
                    if(JSON.stringify(response.data[0]) == JSON.stringify(json) || JSON.stringify(response.data[0]) == undefined){
                        this.tipoAlerta = "error";
                        this.alerta = true;
                        this.textoAlerta = "Los datos introducidos son incorrectos";
                        alert(this.textoAlerta);
                        //this.cambiarPantalla("");
                    }
                    else{
                        this.$emit("entro", this.dni);
                        this.getName();
                        setTimeout(() => {
                            alert("Bienvenido " + this.userName);
                            this.cambiarPantalla("/home");
                        }, 100);
                    }
                })
                .catch((alerta) => {
                    console.log(alerta);
                });
            }
        },
    },
};
</script>