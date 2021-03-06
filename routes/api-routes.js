const db = require('../models');

module.exports =  (app) => {
  // Find all games
  app.get('/api/all', (req, res) => {
    db.Games.findAll({
      where: {},
      include: [
        {
          model: db.User,
          attributes: ['username'], // Add column names here inside attributes array.
          required: true
        }
      ]
    }).then(function (results) {
      res.json(results);
    });
    // db.Games.findAll({}).then(function (results) {
    //   res.json(results);
    // });
  });

  //  Get game by title
  app.get('/api/games/:title', (req, res) => {
    db.Games.findAll({
      where: {
        title: req.params.title
      },
      include: [
        {
          model: db.User,
          attributes: ['username'], // Add column names here inside attributes array.
          required: true
        }
      ]
    })
      .then(function (dbGame) {
        res.json(dbGame);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  
  //  Get Game by ID
  app.get('/api/games/:id', (req, res) => {
    db.Games.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbGame) {
        res.json(dbGame);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // POST route for saving a new game. You can create a game using the data on req.body
  app.post('/api/newgame', (req, res) => {
    console.log(req.body);
    console.log(req.params);

    db.Games.create({
      title: req.body.title,
      description: req.body.description,
      country_origin: req.body.country_origin,
      category: req.body.category,
      instructions: req.body.instructions,
      UserId: req.user.id
    })
      .then(function (dbGame) {
        res.json(dbGame);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // DELETE route for deleting game. You can access the game's id in req.params.id
  app.delete('/api/games/:id', (req, res) => {
    db.Games.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function () {
        res.json(true);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // PUT route for updating game. The updated game will be available in req.body
  app.put('/api/games/:id', (req, res) => {
    db.Games.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function (dbGame) {
        res.json(dbGame);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
