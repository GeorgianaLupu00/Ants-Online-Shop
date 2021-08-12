
const fs = require('fs');
const dns = require('dns');
const path = require('path');
const sharp = require('sharp');
const url = require('url');
const { exec } = require("child_process");
const ejs=require('ejs');
const express = require('express');
const {Client} =require('pg');
var app = express();

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'georgiana',
    database: 'postgres',
    port: 5432
})
client.connect()
const rezultat = client.query("select * from produse", function(err,rez){
    console.log(err, rez);
});

app.get("*/galerie.json",function(req,res){
    res.setHeader("Content-Type","text/html");
    res.status(403).render("pages/403");
});

app.set("view engine", "ejs");
app.use("/resurse", express.static(__dirname + "/resurse"));


function verificaImagini(){
   
    var textFisier=fs.readFileSync("resurse/json/galerie.json") //citeste tot fisierul
    var jsi=JSON.parse(textFisier); //am transformat in obiect
    var caleGalerie=jsi.cale_galerie;
    //ora actuala
    var d = new Date();
    var n = d.getHours();
    let vectImagini=[]
    let counter=0;
    var moment;

    if(n > 5 && n <= 12){
        moment = "dimineata";
    }
    else if(n > 12 && n <= 20){
        moment = "zi";
    }
    else
        moment = "noapte";
   
    console.log(jsi);
    for (let im of jsi.imagini){
        var imVeche= path.join(caleGalerie, im.fisier);//obtin claea completa (im.fisier are doar numele fisierului din folderul caleGalerie)
        var ext = path.extname(im.fisier);//obtin extensia
        var numeFisier =path.basename(im.fisier,ext)//obtin numele fara extensie
        let imMica = path.join(caleGalerie+"/mic/", numeFisier+"-200"+".webp");
        let imMedie = path.join(caleGalerie+"/mediu/", numeFisier+"-350"+".webp");
        console.log(imMica);
        
        // dimineata: 5:00-12:00
        // zi: 12:00-20:00
        // noapte: 20:00-05:00

        if(counter < 9){
            if(im.timp == moment){
                vectImagini.push({mare:imVeche, mic:imMica, mediu:imMedie,descriere:im.descriere});
               
                counter+=1;
            }
            
        }
    
        //adauga in vector un element
        if (!fs.existsSync(imMica))//daca nu exista imaginea, mai jos o voi crea
        sharp(imVeche)
          .resize(150) //daca dau doar width(primul param) atunci height-ul e proportional
          .toFile(imMica, function(err) {
              if(err)
                console.log("eroare conversie",imVeche, "->", imMica, err);
          });
          if(!fs.existsSync(imMedie))
          sharp(imVeche)
              .resize(350)
              .toFile(imMedie, function(err){
                  if(err)
                  console.group("eroare conversie", imVeche, "->",imMedie, err);
              });


    }
    // [ {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}  ]
    return vectImagini;
}

app.get("*/galerie-animata.css",function(req, res){

    res.setHeader("Content-Type","text/css");
    let sirScss=fs.readFileSync("./resurse/scss/galerie_animata.scss").toString("utf-8");
    culori=["navy","black","purple","grey"]
    let culoareAleatoare =culori[Math.floor(Math.random()*culori.length)];
    let rezScss=ejs.render(sirScss,{culoare:culoareAleatoare});
    console.log(rezScss);
    fs.writeFileSync("./temp/galerie-animata.scss",rezScss);
    exec("sass ./temp/galerie-animata.scss ./temp/galerie-animata.css", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.end();
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.end();
            return;
        }
        console.log(`stdout: ${stdout}`);
        
        res.sendFile(path.join(__dirname,"temp/galerie-animata.css"));
    });

});

app.get("/", function(req, res){
    let vectImagini = verificaImagini();
   res.render("pagini/index",{imagini:vectImagini, adresa:req.ip});
   
});


app.get("/index", function(req, res){
    let vectImagini = verificaImagini();
    res.render("pagini/index",{imagini:vectImagini, adresa:req.ip});

 });

 app.get("/galerie", function(req, res){
    let vectImagini = verificaImagini();
    res.render("pagini/galerie",{imagini:vectImagini, adresa:req.ip});

 });

 app.get("/produse", function(req, res){
     console.log("Url:",req.url);
     console.log("Query:", req.query.categ);
     var conditie1= req.query.categ ? "and categorie = '" + req.query.categ+"'":"";
    //  console.log("select * from produse"+ conditie1);

     client.query("select * from produse where 1=1"+ conditie1, function(err,rez){
        console.log(err, rez);
        res.render("pagini/produse", {produse:rez.rows});
    });
 });

 app.get("/produs/:id_produs",function(req, res){
    console.log(req.params);
    const rezultat= client.query("select * from produse where id="+req.params.id_produs, function(err,rez){
        console.log(err, rez);
        res.render("pagini/produs", {prod:rez.rows[0]});
    });
});

 app.get("/*", function(req, res){
    console.log(req.url);
    res.render("pagini" + req.url, function(err,rezultatRandare){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404error");
            }
            else
                throw err;
        }
        else{
            res.send(rezultatRandare);
        }
    });

 });
 
 verificaImagini();


console.log("altceva");
app.listen(8080);
console.log("Serverul a pornit!");
