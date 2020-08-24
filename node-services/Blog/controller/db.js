var db = require("../database.js");
var express = require("express");


const dbOperations = {

  getAllArticles: async () => {
    const articles = await db.collection('articles')
    const allArticles = []
    await articles.get().then( async function(querySnapshot) {
      for(var i in querySnapshot.docs)
      {
         allArticles.push( {'id' : querySnapshot.docs[i].id, "articleData" : querySnapshot.docs[i].data()});
      }}).catch(function(error) {
        console.log("Error getting documents: ", error);
         return { 'responseCode': '0'}; 
    });
    
    return { 'responseCode': '1', 'articles': allArticles}; 
  },  

  createNewArticle: (article) => {
    
    
    var title = article.title;
    var description = article.description;
    var markdown = article.markdown; 
    var Id = article.id;
    db.collection("articles").add({
        Title: title,
        Description: description,
        Markdown:markdown,
        
    })
    return { 'responseCode': '1', 'id' : Id };
    
  },

 findArticle: async (id) => {
    
      const articleReference = db.collection('articles').doc(id);
      const object = await articleReference.get();

      if (object.exists) {
        const dataObject = object.data(); 
        return { 'responseCode': '1', 'articleData': dataObject, 'id' : id}; 
      } else {
        return { 'responseCode': '0' }; //article not found
      }
    
  },

   editArticle:  (article) => {

    
    var title = article.title;
    var description = article.description;
    var markdown = article.markdown; 
    var id = article.id;
    db.collection("articles").doc(id).update({
        "Title": title,
        "Description": description,
        "Markdown":markdown,
    });
    return { 'responseCode': '1', 'id' : id };
   
  },

   deleteArticle: (id) => {

    db.collection("articles").doc(id).delete().then(function() {
    return { 'responseCode': '1', 'id':id };
    }).catch(function(error) {
        console.log(error);
         return { 'responseCode': '0' };
    });
  }
}

module.exports = dbOperations;

