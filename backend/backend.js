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

/****** GET RANDOM SONGS ******/
app.get("/getRandomSongs",(req,res)=>{
  console.log("Estoy en funcion /getRandomSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var query = "Match(c:Canciones) where c.genre='" + genre + "' ";
  var lista = [];
  console.log("GÉNERO: ",genre);
  query += "return c";
  //var query="match(c:Canciones) where c.genre='"+searchGenre+"' return c";// order by c.Popularity desc limit 10";
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

app.get("/getSongs",(req,res)=>{
  console.log("Estoy en funcion /getSongs");
  const session = driver.session();
  var genre = req.query.genre;
  var busqueda = req.body.busqueda;
  var artist = req.query.artist;
  var type = req.body.type;
  var lista = [];
  var query = "MATCH (c: Canciones) "; 
  console.log("GÉNERO: ",genre);
  console.log("ARTISTA: ",artist);
  console.log(artist != "Cualquiera");

  if(genre != "Cualquiera" && genre != ""){
    query += "where c.genre='" + genre + "' ";
  }
  if(artist != "Cualquiera" && artist != ""){
      if(query.includes("where")){
          query+="AND c.artist='"+artist+"' ";
      }else{
          query+="where c.artist='"+artist+"' ";
      }
  }

  query += "return c";

  /*if (search != "" && platform != "Cualquiera") {
    query = query.concat(" AND (v.name =~ '(?i).*" + search + ".*') ");
  } else if (search != "") {
    query = query.concat(" WHERE (v.name =~ '(?i).*" + search + ".*') ");
  }

  if (modern) {
    query = query.concat(
      "RETURN v AS videogame ORDER BY v.year DESC, v." +
        critic +
        " DESC LIMIT " +
        limit
    );
  } else {
    query = query.concat(
      "RETURN s AS song ORDER BY s.Popularity" +
        critic +
        " DESC, s.year DESC LIMIT " +
        limit
    );
  }*/
  const resultadoPromesa = session.run(query).subscribe({
    onNext: function (result) {
        lista.push(result.get(0).properties);
    },
    onCompleted: function () {
        res.send(lista);
        console.log(lista);
        console.log(query);
        session.close();
    },
    onError: function (error) {
        console.log(error + " ERROR");
    }
  })
  console.log("SALGO de /getSongs\n\n");
  /*
  const resultPromise = session.run(query).subscribe({
    onNext: function(record) {
      var element = record.get("song").properties;

      if (element.popularity == undefined) {
        element.popularity = { low: "--" };
        result.push(element);
      } else {
        result.push(element);
      }
    },
    onCompleted: function() {
      if (result.length < 1) result = [{ message: "Error" }];
      res.send(result);
      // session.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });*/
});



///////////////////////////////
//         APPLISTEN         //
///////////////////////////////
app.listen(port, function () {
    console.log("¡Aplicación escuchando en el puerto 3000!");
  });
  