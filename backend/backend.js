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
  var query="match(c:Canciones) return distinct c.genre order by c.genre"
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
  var query="match(c:Canciones) return distinct c.artist order by c.artist"
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
  var query="match(c:Canciones) where c.genre='" + genre 
    + "'return distinct c.artist order by c.artist"
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

/****** GET RANDOM SONGS ******/
app.get("/getRandomSongs",(req,res)=>{
  console.log("Estoy en funcion /getRandomSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var dni = req.query.dni;
  var query = "Match(c:Canciones), (a:UserName) where c.genre='" + genre + "' and a.dni='" 
      + dni + "' AND NOT (a)-[:LIKES]->(c) AND NOT (a)-[:HATES]->(c) ";
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
  var type = [];
  type = req.query.type;
  console.log(req.query.type);
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
  console.log(type);
  if(type[0] != "No"){
    for(var i = 0; i < type.length; i++){
      if(type[i] == "+animada"){
        if(i == 0){
          query += " order by c.valence desc";
        }
        else{
          query += ", c.valence desc";
        }
      }
      else if(type[i] == "-animada"){
        if(i == 0){
          query += " order by c.valence";
        }
        else{
          query += ", c.valence";
        }
      }
      else if(type[i] == "+bailable"){
        if(i == 0){
          query += " order by c.danceability desc";
        }
        else{
          query += ", c.danceability desc";
        }
      }
      else if(type[i] == "-bailable"){
        if(i == 0){
          query += " order by c.danceability";
        }
        else{
          query += ", c.danceability";
        }
      }
      else if(type[i] == "+energica"){
        if(i == 0){
          query += " order by c.energy desc";
        }
        else{
          query += ", c.energy desc";
        }
      }
      else if(type[i] == "-energica"){
        if(i == 0){
          query += " order by c.energy";
        }
        else{
          query += ", c.energy";
        }
      }
      else if(type[i] == "+popular"){
        console.log("++POPULARR");
        if(i == 0){
          query += " order by c.popularity desc";
        }
        else{
          query += ", c.popularity desc";
        }
      }
      else if(type[i] == "-popular"){
        if(i == 0){
          query += " order by c.popularity";
        }
        else{
          query += ", c.popularity";
        }
      }
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
  var dni = req.query.dni;
  var artist = req.query.artist;
  var query = "Match(c:Canciones), (a:UserName) where c.genre='" + genre + "' and a.dni='" 
  + dni + "' AND NOT (a)-[:LIKES]->(c) AND NOT (a)-[:HATES]->(c)";
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
        console.log(error + "No hay canciones que cumplan estos criterios de búsqueda.");
    }
  })
  console.log("SALGO de /getPersonalizedSongs\n\n");
});


///////////////////////////////
//          APP POST         //
//////////////////////////////

/****** POST NEW USER ******/
app.post("/postNewUser", (req, res) => {
  console.log("ENTRO en /postNewUser\n\n");
  var nombre = req.body.nombre;
  var contraseña = req.body.contraseña;
  var email = req.body.email;
  var dni = req.body.dni;
  var query = "MERGE (r:Users {name: 'Usuarios'}) FOREACH (n IN (CASE WHEN '"+dni+"' IS NULL THEN [] ELSE [1] END) | MERGE (u:UserName {name: '" + nombre + "', dni: '" + dni + "', email: '" + email + "', passw: '" + contraseña + "' }) MERGE(u)-[:IS_USER]->(r))";
  const session = driver.session();
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
      },
      onCompleted: function () {
          res.send("si");
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO de /postNewUser\n\n");
});

/****** DATOS ENTRADA ******/
app.post("/datosEntrada", (req, res) => {
  var pass = req.body.contraseña;
  var dni = req.body.dni;
  var name = "";
  console.log(dni + " " + pass);
  var query = "match(u:UserName) where u.dni='"+dni+"' and u.passw='" + pass + "' return u.name";
  console.log(query);
  const session = driver.session();
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
        name = result.get(0);
      },
      onCompleted: function () {
        console.log(name);
          res.send(name);
          session.close();
      },
      onError: function (error) {
        res.send('Error, datos mal introducidos');
          console.log(error + " ERROR");
      }
    })  
});

/****** GET USER NAME ******/
app.post("/getUserName", (req, res) => {
  var dni = req.body.dni;
  console.log(dni);
  var query = "match(u:UserName) where u.dni='"+dni+"' return u.name";
  console.log(query);
  const session = driver.session();
  const resultPromise = session.run(query);
  resultPromise.then(result => {   
    console.log(result.records[0]);
    if (result.records.length == 0) {
        res.json({
          msg: 'Error'
        })
    }
    else {
      var resultado = result.records[0].get(0);
      res.send(resultado);
    }
    session.close();
  })
});

/****** POST NEW SONG LIKED ******/
app.post("/postNewSongLiked",(req,res)=>{
  console.log("ENTRO en /postNewSongLiked\n\n");
  var name = req.body.name;
  var dni = req.body.dni;
  var artist = req.body.artist;
  var lista = [];                                    
  var query = "MATCH (u:UserName {dni:'" + dni + "'}) FOREACH (n IN (CASE WHEN '"+name+"' IS NULL THEN [] ELSE [1] END) | MERGE (b:Canciones {name:'"+name+"', artist:'"+artist+"'}) MERGE(u)-[l:LIKES]->(b))";
  const session = driver.session();
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
        console.log(result.get(0));
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
  console.log("SALGO de /postNewSongLiked\n\n");
});

/****** POST NEW SONG HATED ******/
app.post("/postNewSongHated",(req,res)=>{
  console.log("ENTRO en /postNewSongHated\n\n");
  var name = req.body.name;
  var artist = req.body.artist;
  var dni = req.body.dni;
  var lista = [];                                    
  var query = "MATCH (u:UserName {dni:'" + dni + "'}) FOREACH (n IN (CASE WHEN '"+name+"' IS NULL THEN [] ELSE [1] END) | MERGE (b:Canciones {name:'"+name+"', artist:'"+artist+"'}) MERGE(u)-[l:HATES]->(b))";
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
  console.log("SALGO de /postNewSongHated\n\n");
});

/****** POST DELETE RELATION ******/
app.post("/postDeleteRelation",(req,res)=>{
  console.log("ENTRO en /postDeleteRelation\n\n");
  var name = req.body.name;
  var dni = req.body.dni;
  var type = req.body.type;
  var lista = [];                                    
  if(type == 0){
    var query = "MATCH (c:Canciones), (c)<-[r:LIKES]- (u:UserName {dni: '" + dni + "'}) WHERE c.name='" + name + "' DETACH DELETE r";
  }
  else if(type == 1){
    var query = "MATCH (c:Canciones), (c)<-[r:HATES]- (u:UserName {dni: '" + dni + "'}) WHERE c.name='" + name + "' DETACH DELETE r";
  }
  const session = driver.session();
  const resultadoPromesa = session.run(query).subscribe({
      onNext: function (result) {
        console.log(result.get(0));
        lista.push(result.get(0).properties);
      },
      onCompleted: function () {
          res.send(lista);
          console.log(query);
          console.log(lista);
          session.close();
      },
      onError: function (error) {
          console.log(error + " ERROR");
      }
  })
  console.log("SALGO de /postDeleteRelation\n\n");
});

/****** GET SONGS COLABORATIVE FILTER ******/
app.post("/getSongsColaborativeFilter",(req,res)=>{
  console.log("ENTRO en /getSongsColaborativeFilter\n\n");
  var usuarioVecino = req.body.usuario;
  var dni = req.body.dni;
  var canciones = [];
  var query = "MATCH (c:Canciones), (u:UserName), (a:UserName), (u)-[:LIKES]->(c)"
    +" WHERE u.dni = '" + usuarioVecino + "' AND a.dni= '" + dni + "' AND NOT (a)-[:LIKES]->(c) AND NOT (a)-[:HATES]->(c) "
    +"RETURN c.name, c.artist, c.genre, c.cover, c.preview, c.danceability, c.energy, c.popularity, c.valence ";
  const session = driver.session();
  const resultPromise = session.run(query);
  resultPromise.then(result => {
    if (result.records.length == 0) {
      res.json({
        msg: 'Error, no hay canciones recomendadas por filtrado colaborativo'
      })
    }
    else {
      console.log(query);
      for(var i=0;i<result.records.length;i++){
        var cancion = {
          name: result.records[i]._fields[0],
          artist: result.records[i]._fields[1],
          genre: result.records[i]._fields[2],
          cover: result.records[i]._fields[3],
          preview: result.records[i]._fields[4],
          danceability: result.records[i]._fields[5],
          energy: result.records[i]._fields[6],
          popularity: result.records[i]._fields[7],
          valence: result.records[i]._fields[8],
        }
        console.log(cancion.name);
        canciones.push(cancion);
      }
      res.send(canciones)
    }
    session.close();
  })
  .catch((error) => {
    res.json({
      msg: 'Error'
    });
    console.log(error)
    session.close();
  })
  console.log("SALGO de /getSongsColaborativeFilter\n\n");
});

/****** GET NEIGHBOURS ******/
app.post("/getNeighbours", function(req, res) {
  console.log("ENTRO en Detectar Vecinos");
  const session = driver.session();
  console.log(req.body.name);
  var vecinos = [];
  var query = "MATCH (u:UserName), (u)-[:LIKES]->(c) WHERE c.name='" + req.body.name + "' RETURN u.dni";
  const resultPromise = session.run(query);
  resultPromise.then(result => {      
    if (result.records.length == 0) {
      res.json({
        msg: 'Error, no hay usuarios vecinos'
      })
    }
    else {
      for(var i = 0; i < result.records.length; i++){
          var usuario = {
            name: result.records[i]._fields[0],
          }
          vecinos.push(result.records[i]._fields[0]);
        }
        res.send(vecinos)
      }
      session.close();
    })
    .catch((error) => {
      res.json({
        msg: 'Error, en getNeighbours'
      });
      console.log(error)
      session.close();
    })
});

/****** GET FAVORITAS ******/
app.post("/getFavs", function (req, res) {
  console.log("ENTRO en /getFavs\n\n");
  var favoritas = [];
  var dni = req.body.dni;
  var query = "MATCH (u:UserName)-[rel:LIKES]->(c:Canciones) WHERE u.dni='" + dni + "' ";
  query += "return c.name, c.artist, c.genre, c.cover, c.preview, c.danceability, c.energy, c.popularity, c.valence";
  const session = driver.session();
  const resultPromise = session.run(query);
  resultPromise.then(result => {   
    if (result.records.length == 0) {
      res.json({
        msg: 'Error'
      })
    }
    else {
      for(var i = 0; i < result.records.length; i++){
        var cancion = {
          name: result.records[i]._fields[0],
          artist: result.records[i]._fields[1],
          genre: result.records[i]._fields[2],
          cover: result.records[i]._fields[3],
          preview: result.records[i]._fields[4],
          danceability: result.records[i]._fields[5],
          energy: result.records[i]._fields[6],
          popularity: result.records[i]._fields[7],
          valence: result.records[i]._fields[8],
        }
        console.log(cancion);
        favoritas.push(cancion);
      }
      res.send(favoritas)
    }
    session.close();
  })
  .catch((error) => {
    res.json({
      msg: 'Error'
    });
    console.log(error)
    session.close();
  })
  console.log("SALGO de /getFavs\n\n");
});

/****** GET HATEDS ******/
app.post("/getHateds", function (req, res) {
  console.log("ENTRO en /getHateds\n\n");
  var nofavoritas = [];
  var dni= req.body.dni;
  var query = "MATCH (u:UserName)-[rel:HATES]->(c:Canciones) WHERE u.dni='"+dni+"' ";
  query += "return c.name, c.artist, c.genre, c.cover, c.preview, c.danceability, c.energy, c.popularity, c.valence";
  const session = driver.session();
  const resultPromise = session.run(query);
  resultPromise.then(result => {   
    if (result.records.length == 0) {
      res.json({
        msg: 'Error'
      })
    }
    else {
      for(var i = 0; i < result.records.length; i++){
        var cancion = {
          name: result.records[i]._fields[0],
          artist: result.records[i]._fields[1],
          genre: result.records[i]._fields[2],
          cover: result.records[i]._fields[3],
          preview: result.records[i]._fields[4],
          danceability: result.records[i]._fields[5],
          energy: result.records[i]._fields[6],
          popularity: result.records[i]._fields[7],
          valence: result.records[i]._fields[8],
        }
        console.log(cancion);
        nofavoritas.push(cancion);
      }
      res.send(nofavoritas)
    }
    session.close();
  })
  .catch((error) => {
    res.json({
        msg: 'Error'
    });
    console.log(error)
    session.close();
  })
  console.log("SALGO de /getHateds\n\n");
});

/****** POST FAVORITAS ******/
app.post("/addFav", function (req, res) {
  console.log("ENTRO en /addFav\n\n");
  var name = req.body.name;
  var artist = req.body.artist;
  var lista = [];
  var query = "Match(c:Canciones) where c.name='"+name+"' and c.artist='"+artist+"' set c.fav="+1+" ";
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

/****** POST DISLIKE ******/
app.post("/addDislike", function (req, res) {
  console.log("ENTRO en /addDislike\n\n");
  var name = req.body.name;
  var artist = req.body.artist;
  var lista = [];
  var query = "Match(c:Canciones) where c.name='"+name+"' and c.artist='"+artist+"' set c.fav='"+2+"' ";
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
  console.log("SALGO de /addDislike\n\n");
});

/****** POST DELETE FAV / DISLIKE ******/
app.post("/deleteFavDislike", function (req, res) {
  console.log("ENTRO en /deleteFavDislike\n\n");
  var name = req.body.name;
  var artist = req.body.artist;
  var lista = [];
  var query = "Match (c:Canciones) where c.name='"+name+"' and c.artist='"+artist+"' set c.fav='"+0+"' ";
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
  console.log("SALGO de /deleteFavDislike\n\n");
});


///////////////////////////////
//         APPLISTEN         //
///////////////////////////////
app.listen(port, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
})
  