var db = require("../database.js");
var express = require("express");


const dbOperations = {

  getAllArticles: async () => {

    try{
    const articles = await db.collection('articles').get();
    return { 'responseCode': '1', 'articles': articles};
    }
    catch(err)
    {
        throw new Error(err);   
    }

  },  
  createNewArticle: (article) => {
    
    try {
    var title = article.title;
    var description = article.description;
    var markdown = article.markdown; 
    db.collection("articles").add({
        Title: title,
        Description: description,
        Markdown:markdown,
        
    })
    return { 'responseCode': '1' };
    }
    catch(err)
    {
        throw new Error(err);
    }
  },

 findArticle: async (id) => {
    try {
      const articleReference = db.collection('articles').doc(id);
      const object = await articleReference.get();

      if (object.exists) {
        const dataObject = object.data(); 
        return { 'responseCode': '1', 'articleData': dataObject}; 
      } else {
        return { 'responseCode': '0' }; //article not found
      }
    } catch (err) {
      throw new Error(err);
    }
  },

   editArticle:  (article) => {

    try{
    var title = article.title;
    var description = article.description;
    var markdown = article.markdown; 
    var id = article.id;
    db.collection("articles").doc(id).update({
        "Title": title,
        "Description": description,
        "Markdown":markdown,
    });
    return { 'responseCode': '1' };
    }
    catch(err)
    {
        throw new Error(err);
    }
  },

   deleteArticle: (id) => {

    db.collection("articles").doc(id).delete().then(function() {
    return { 'responseCode': '1' };
    }).catch(function(error) {
        console.log(error);
         return { 'responseCode': '0' };
    });
  }
}

module.exports = dbOperations;

