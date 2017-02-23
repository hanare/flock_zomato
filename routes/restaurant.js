var express = require('express');

var router = express.Router();

const config = require('../config.js');
//var store = require('./store.js');

const Zomato = require('zomato.js');
const zomato = new Zomato(config.zomatoKey);


router.get('/',function(req,res,next){

  //lat = req.query.lat;
  //long = req.query.long;
  zomato
    .categories()
    .then(function(data) {
      //console.log(data);
      categories  = data;
     res.render('restuar',{
      datas:categories,
      rest:'true'
    })


    })
    .catch(function(err) {
      console.error(err);
    });
  //next();

});

router.get('/cordinates',function(req,res,next){
  lat = req.query.lat;
  long = req.query.long;
  //lat = req.body.lat;
  //long = req.body.long;
  //console.log(req);
  //res.status(200);
  //console.log(lat);
  console.log('corrdinates');
  zomato
  .geocode({
    lat: lat,
    lon: long
  })
  .then(function(data) {
    //console.log(data);
    //console.log("newbaadsfas");
    //console.log(data.nearby_restaurants);
    geoCode = data;
  })
  .catch(function(err) {
    console.error(err);
  });
 next(nextf(res));
});

var nextf= function(res){
  console.log("fadsfnext function");
  //console.log(data);
  res.render('restuar',{
   datas:data,
   geodata :geoCode
 })


}
router.post('/search',function(req,res,next) {
  zomato
  .search({
    cuisines:req.body.cusi,
    city: req.body.c,
    category:req.body.categ,
    lat: req.body.lat,
    lon: req.body.long,
    count: 3
  })
  .then(function(data) {
    //console.log(data);
    console.log("restaurants datatat");
    console.log(data[0]);
    //console.log(data.restaurants[0].name);
    /*res.render('restuar',{
        datas:categories,
        rest: data
    });*/
    res.setHeader('Content-Type', 'application/json');
   res.send(data, null, 3);
    //res.write(JSON.stringify(data));
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.post('/choice',function(req,res,next){
  console.log(req.body);

})

module.exports = router;
