const express = require("express");
var http = require("http");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
var request = require("request");
var cors = require("cors");
const neo4j = require("neo4j-driver");
const { generateKeyPair } = require("crypto");
var driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "1")
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////////////////
//          APP GET         //
//////////////////////////////

/****** GET GENEROS ******/
app.get("/getGeneros",(req,res)=>{
  const session = driver.session();
  console.log("Estoy en /getGeneros");
  var generos=[];
  var query="match(c:Canciones) return distinct c.genre"
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          generos.push(result.get(0));
      },
      onCompleted: function () {
          res.send(generos);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO DE /getGeneros\n\n");
});

/****** GET ARTISTAS ******/
app.get("/getArtistas",(req,res)=>{
  const session = driver.session();
  console.log("Estoy en /getArtistas");
  var artistas=[];
  var query="match(c:Canciones) return distinct c.artist"
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          artistas.push(result.get(0));
      },
      onCompleted: function () {
          res.send(artistas);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO DE /getArtistas\n\n");
});

/****** GET ARTISTAS DE UN GÉNERO ******/
app.get("/getArtistasG",(req,res)=>{
  const session = driver.session();
  console.log("Estoy en /getArtistasG");
  var artistas=[];
  var genre = req.query.genre;
  var query="match(c:Canciones) where c.genre='" + genre + "'return distinct c.artist"
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          artistas.push(result.get(0));
      },
      onCompleted: function () {
          res.send(artistas);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO DE /getArtistasG\n\n");
});

/****** GET GÉNEROS DE UN ARTISTA ******/
app.get("/getGenerosA",(req,res)=>{
  const session = driver.session();
  console.log("Estoy en /getGenerosA");
  var generos=[];
  var artist = req.query.artist;
  var query="match(c:Canciones) where c.artist='" + artist + "'return distinct c.genre"
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          generos.push(result.get(0));
      },
      onCompleted: function () {
          res.send(generos);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO DE /getGenerosA\n\n");
});

/****** GET RANDOM SONGS ******/
app.get("/getRandomSongs",(req,res)=>{
  console.log("Estoy en funcion /getRandomSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var query = "Match(c:Canciones) where c.genre='" + genre + "' ";
  var lista = [];
  query += "return c";
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          lista.push(result.get(0).properties);
      },
      onCompleted: function () {
          res.send(lista);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO de /getRandomSongs\n\n");
});

/****** GET FILTERED SONGS ******/
app.get("/getSongs",(req,res)=>{
  console.log("Estoy en funcion /getSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var busqueda = req.query.busqueda;
  var artist = req.query.artist;
  var type = req.query.type;
  var lista = [];
  var query = "MATCH (c: Canciones) "; 

  //FILTRAR POR GÉNERO
  if(genre != "Cualquiera" && genre != ""){
    query += "where c.genre='" + genre + "' ";
  }
  //FILTRAR POR ARTISTA
  if(artist != "Cualquiera" && artist != ""){
      if(query.includes("where")){
          query+="AND c.artist='"+artist+"' ";
      }else{
          query+="where c.artist='"+artist+"' ";
      }
  }
  //FILTRAR POR NOMBRE BUSCADO
  if (busqueda != "") {
    if(query.includes("where")){
      query += " AND (c.name =~ '(?i).*" + busqueda + ".*') ";
    }
    else{
      query += " where (c.name =~ '(?i).*" + busqueda + ".*') ";
    }
  }
  query += "return c";
  //ORDENAR SEGÚN FILTROS
  if(type != "Cualquiera" && type != ""){
    if(type == "+animada"){
      query += " order by c.valence desc";
    }
    else if(type == "-animada"){
      query += " order by c.valence asc";
    }
    else if(type == "+bailable"){
      query += " order by c.danceability desc";
    }
    else if(type == "-bailable"){
      query += " order by c.danceability asc";
    }
    else if(type == "+energica"){
      query += " order by c.energy desc";
    }
    else if(type == "-energica"){
      query += " order by c.energy asc";
    }
    else if(type == "+popular"){
      console.log("++POPULARR");
      query += " order by c.popularity desc";
    }
    else if(type == "-popular"){
      query += " order by c.popularity asc";
    }
  }
  console.log(query);
  const resultadoPromesa = session.run(query).subscribe({
    onNext: function (result) {
        lista.push(result.get(0).properties);
        console.log(result.get(0).properties);
    },
    onCompleted: function () {
        res.send(lista);
        console.log(lista);
        session.close();
    },
    onError: function (error) {
        console.log(error + "No hay canciones que cumplan estos criterios de búsqueda.");
    }
  })
  console.log("SALGO de /getSongs\n\n");
});

/****** GET PERSONALIZED SONGS ******/
app.get("/getPersonalizedSongs",(req,res)=>{
  console.log("Estoy en funcion /getPersonalizedSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var artist = req.query.artist;
  var query = "Match(c:Canciones) where c.genre='" + genre + "' and c.artist='"+artist+"' and c.fav='"+false+"' ";
  var lista = [];
  query += "return c";
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
          lista.push(result.get(0).properties);
      },
      onCompleted: function () {
          res.send(lista);
          console.log(lista);
          session.close();
      },
      onError: function (error) {
          console.log(error + "No hay canciones que cumplan estos criterios de búsqueda.");
      }
  })
  console.log("SALGO de /getPersonalizedSongs\n\n");
});

/****** GET FAVORITAS ******/
app.get("/getFavs", function (req, res) {
  console.log("ENTRO en /getFavs\n\n");
  var lista = [];
  var query = "Match(c:Canciones) where c.fav='"+true+"' ";
  query += "return c";
  const session = driver.session();

  const resultadoPromesa = session.run(query).subscribe({
    onNext: function (result) {
        lista.push(result.get(0).properties);
    },
    onCompleted: function () {
        res.send(lista);
        console.log(lista);
        session.close();
    },
    onError: function (error) {
        console.log(error + " ERROR");
    }
  })
  console.log("SALGO de /getFavs\n\n");
});

/****** GET NO FAVORITAS ******/
app.get("/getNoFavs", function (req, res) {
  console.log("ENTRO en /getNoFavs\n\n");
  var lista = [];
  var query = "Match(c:Canciones) where c.fav='"+false+"' ";
  query += "return c";
  const session = driver.session();

  const resultadoPromesa = session.run(query).subscribe({
    onNext: function (result) {
        lista.push(result.get(0).properties);
    },
    onCompleted: function () {
        res.send(lista);
        console.log(lista);
        session.close();
    },
    onError: function (error) {
        console.log(error + " ERROR");
    }
  })
  console.log("SALGO de /getFavs\n\n");
});

/****** POST FAVORITAS ******/
app.post("/addFav", function (req, res) {
  console.log("ENTRO en /addFav\n\n");
  var name = req.body.name;
  var artist = req.body.artist;
  var lista = [];
  var query = "Match(c:Canciones) where c.name='"+name+"' and c.artist='"+artist+"' set c.fav='"+true+"' ";
  query += "return c";
  const session = driver.session();

  const resultadoPromesa = session.run(query).subscribe({
    onNext: function (result) {
        lista.push(result.get(0).properties);
    },
    onCompleted: function () {
        res.send(lista);
        session.close();
    },
    onError: function (error) {
        console.log(error + " ERROR");
    }
  })
  console.log("SALGO de /addFav\n\n");
});

///////////////////////////////
//         APPLISTEN         //
///////////////////////////////
app.listen(port, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
})
  