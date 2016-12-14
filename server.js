const express = require('express');
const mongoose = require('mongoose');
const username = require('./config').username;
const password = require('./config').password;
const FewestGuesses = require('./models/guesses');
const bodyParser = require('body-parser');


let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const id = "584c90125c7cb208f0a4aa5d"
const port = 8080;
const url = `mongodb://${username}:${password}@ds127958.mlab.com:27958/redux-hotcold`;
mongoose.connect(url);

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
app.listen(port, function() {
  console.log("listening on port 3000")
})
