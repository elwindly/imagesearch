const express = require('express');
const hbs = require('hbs');
const fetch = require('fetch').fetchUrl;
const _ = require('lodash');

const mongoose = require('./db/mongoose');
const {Last} = require('./models/last');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');

 const options = {
     headers:{
          "Content-Type":"multipart/form-data",
         "Ocp-Apim-Subscription-Key":"05d466aa3f3a4306b50a5425b79d6e94"
     }
};

app.get('/',(req,res)=>{
    res.render('main.hbs');
});

app.get('/imagesearch/:term',(req,res)=>{
    const term = req.params.term.trim();
    const offset = req.query.offset || 10;
    const searchUrl = `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${term}`
    Last.find().count().then((count)=>{
         if(count > 9){   
            Last.deleteLast().then((doc)=>{
                }).catch((e)=>{
                    res.send(e);
                })
        }
    });   
    const last = new Last({
        term:term
    });
    last.save().then((doc)=>{       
    },(err)=>{
        return res.status(400).send();
    });
    fetch(searchUrl,options,(err,meta,body)=>{
        if(err){
            return res.status(400).send();
        }
        let jsonB = JSON.parse(body);
        let offseted = jsonB.value.slice(0,offset);
        let result = offseted.map((elem)=>{
            return _.pick(elem,['name','thumbnailUrl', 'hostPageDisplayUrl']);
        })
        res.send(result);
    });    
});

app.get('/latest/imagesearch',(req,res)=>{
    Last.find().then((latestSearch)=>{
        res.send({latestSearch})
    },(err)=>{
        res.status(400).send()
    });
});

app.listen(port,()=>{
    console.log(`Server is runnung on port ${port}`);
});
