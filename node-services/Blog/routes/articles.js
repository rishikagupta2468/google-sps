var express = require("express");
var router  = express.Router();
var db = require("../database.js");


router.get("/",async function(req,res){
   const articles = await db.collection('articles').get();
  res.render('articles/index', { articles: articles })
});


router.get("/new",function(req,res){
    res.render("articles/new");
});

router.get("/:id",async function(req,res){
   var article = db.collection("articles").doc(req.params.id);
    article.get().then(function(article) {
        if (article.exists) {
            res.render("articles/show", {article:article});
        } else {
            console.log("No such article!");
            res.redirect("/articles");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        res.redirect("/articles");
    });
});
router.post("/",function(req,res){

    var title = req.body.title;
    var description = req.body.description;
    var markdown = req.body.markdown; 
   db.collection("articles").add({
        Title: title,
        Description: description,
        Markdown:markdown,
        
    })
    .then(function() {
       res.redirect("/articles")
    })
    .catch(function(error) {
        console.log(error);
        res.redirect("/articles");
    });
});

router.get('/edit/:id', async function (req, res) {

    var article = db.collection("articles").doc(req.params.id);
    console.log("abc");
    article.get().then(function(article) {
        if (article.exists) {
            console.log("if abc");
            res.render("articles/edit", {article:article});
            
        } else {
            console.log("No such article!");
            res.redirect("/articles");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        res.redirect("/articles");
    });
});

router.put('/:id', async function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var markdown = req.body.markdown; 
    db.collection("articles").doc(req.params.id).update({
        "Title": title,
        "Description": description,
        "Markdown":markdown,
    });
    res.redirect("/articles");
});

router.delete('/:id', function (req, res) {
    db.collection("articles").doc(req.params.id).delete().then(function() {
        res.redirect('/articles');
    }).catch(function(error) {
        console.log(error);
        res.redirect('/articles');
    });
});

module.exports = router;