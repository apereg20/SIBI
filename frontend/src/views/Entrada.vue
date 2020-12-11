<template >
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
        <span style="font-size: 20pt; font-family: 'Helvetica'; weight:bold-black">
            BIENVENIDO ~ Recomendación Musical.</span
        >
        </v-toolbar-title>
        <!-- Separador -->
        <v-spacer></v-spacer>
    </v-toolbar>
    </v-card>
    <v-card color="#110C3A" height="30px"></v-card>
    <v-card style="background: #110C3A">
    <v-row align="center" justify="center">
            <v-col cols="5">
                <v-card style="background: #110C3A;
                  background: -webkit-linear-gradient(to right, #4C1E45, #351442,  #351442, #4C1E45;
                  background: linear-gradient(to right, #4C1E45, #351442, #351442, #4C1E45);"
                  dark>
                     <!-- Separador -->
                    <v-spacer></v-spacer>
                    <v-card-title>
                        <v-row align="center" justify="center">
                            <v-icon size="200">mdi-account</v-icon>
                        </v-row>    
                    </v-card-title>
                    <v-card-text>
                        <v-row align="center" justify="center">
                            <v-btn text large @click="iniciaSesion()"><p><b><u>Iniciar Sesión</u></b></p></v-btn>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-btn text large @click="registrarse()"><p><b><u>Registrarse</u></b></p></v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
    </v-app>
</template>
<script>
export default {
    name:'Entrada',

    methods:{
        iniciaSesion(){
            console.log("Se ha pulsado inicia sesion");
            this.$router.push('IniciarSesion');
        },
        registrarse(){
            console.log("Se ha pulsado registrarse");
            this.$router.push('Registro');
        }
    }
}
</script>