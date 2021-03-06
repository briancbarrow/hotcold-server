const express = require('express');
const mongoose = require('mongoose');
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');
const cors = require('cors')


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const id = "584c90125c7cb208f0a4aa5d"
const port = 8080;
const url = process.env.PROD_MONGODB;
mongoose.connect(url);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/fewest-guesses', function(req, res) {
  FewestGuesses.find({}, function(err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  })
})


app.put('/fewest-guesses', function(req, res) {

  FewestGuesses.findById(id, function(err, guess) {
    console.log("fewest:", req.body.fewest)
    if(err) res.send(err);
    guess.fewest = req.body.fewest;
    guess.save(function(err, updatedData) {
      console.log("Updated", updatedData)
      if (err) res.send(err);
      res.json(updatedData);
    })
  })
})
app.listen(process.env.PORT || port, function() {
  console.log("listening on port 3000")
})
