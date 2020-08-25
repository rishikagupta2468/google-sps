var express = require("express");
var router  = express.Router();
const articleDb = require('../controller/db');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/",async function(req,res){
   try {
    responseObject = await articleDb.getAllArticles();
    res.status(200).json(responseObject);
  } catch (err) {
    res.status(400).send(err.message);
  }   
});

router.get("/:id",async function(req,res){

   try {
    responseObject = await articleDb.findArticle(req.params.id);
    res.status(200).json(responseObject);
  } catch (err) {
    res.status(400).send(err.message);
  }   

});

router.post("/",function(req,res){

    try {
    responseObject = articleDb.createNewArticle({'title': req.body.title,
        'description' : req.body.description,
        'markdown' : req.body.markdown,
         'id' : req.params.id});
    res.status(200).json(responseObject);
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

router.get('/edit/:id', async function (req, res) {

    try {
    responseObject = await articleDb.findArticle(req.params.id);
    res.status(200).json(responseObject);
    } catch (err) {
        res.status(400).send(err.message);
    }   
  
});

router.put('/:id', async function (req, res) {
   try {
    responseObject = await articleDb.editArticle({'title': req.body.title,
        'description' : req.body.description,
        'markdown' : req.body.markdown,
        'id' : req.params.id });

    res.status(200).json(responseObject);
    } catch (err) {
        res.status(400).send(err.message);
    }   
});

router.delete('/:id', function (req, res) {
   try {
    response = articleDb.deleteArticle(req.params.id);
    res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }   
});

module.exports = router;