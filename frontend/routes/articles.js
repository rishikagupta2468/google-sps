var express = require("express");
var router  = express.Router();
const fetch = require('node-fetch');

router.get("/",async function(req,res){
 
  const data = await fetch('https://articles-dot-summer20-sps-77.df.r.appspot.com/articles');
  const article = await data.json();
  res.render('articles/index', { articles: article.articles })
});


router.get("/new",function(req,res){
    res.render("articles/new");
});

router.get("/:id",async function(req,res){

  const data = await fetch(`https://articles-dot-summer20-sps-77.df.r.appspot.com/articles/${req.params.id}`);
  const article = await data.json();
  res.render("articles/show", {article:article.articleData});
});

router.post("/",async function(req,res){

    try {
      const articleResponse = await fetch('https://articles-dot-summer20-sps-77.df.r.appspot.com/articles', {
      method: 'post', 
      body: JSON.stringify({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (articleResponse.status === 200) {
      const json = await articleResponse.json();
      res.redirect("/articles");
    } else {
      const text = await articleResponse.text();
      res.status(articleResponse.status).send(text);
    }
    }catch (err) {
    res.status(400).send(err.message);
    res.redirect("/articles");
  }
});

router.get('/edit/:id', async function (req, res) {

    const data = await fetch(`https://articles-dot-summer20-sps-77.df.r.appspot.com/articles/edit/${req.params.id}`);
    const article = await data.json();
    res.render("articles/edit", {article:article});
});

router.put('/:id', async function (req, res) {
    console.log("PUT route")
     try {
    
      const articleResponse = await fetch(`https://articles-dot-summer20-sps-77.df.r.appspot.com/articles/${req.params.id}/?_method=PUT`, {
      method: 'PUT', 
      body: JSON.stringify({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (articleResponse.status === 200) {
      const json = await articleResponse.json();
      res.redirect("/articles");
    } else {
      const text = await articleResponse.text();
      res.status(articleResponse.status).send(text);
      res.redirect("/articles");
    }
    }catch (err) {
    res.status(400).send(err.message);
    res.redirect("/articles");
  }
});

router.delete('/:id', async function (req, res) {
    const data =  await fetch(`https://articles-dot-summer20-sps-77.df.r.appspot.com/articles/${req.params.id}/?_method=DELETE`,{
         method:'post'
     });
     res.redirect('/articles')
});

module.exports = router;