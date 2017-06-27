const categoriesController = require('../controllers').categories;

const createSendToken = require('../controllers').jwt;
const localStrategy = require('../controllers/localStrategy.js');
const passport = require('passport');
//const todoItemsController = require('../controllers').todoItems;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to TheOrangegirl API!',
  }));

  app.post('/api/categories', categoriesController.create);
  app.get('/api/categories', categoriesController.list);
  app.get('/api/categories/:categoryId', categoriesController.retrieve);
  app.put('/api/categories/:categoryId', categoriesController.update);
  app.delete('/api/categories/:categoryId', categoriesController.destroy);

  // app.post('/api/todos/:todoId/items', todoItemsController.create);
  // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  // app.delete(
  //   '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  // );
  app.all('/api/categories/:categoryId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));


    passport.use('local-register', localStrategy.register);
    passport.use('local-login', localStrategy.login);

    app.post('/api/auth/register', passport.authenticate('local-register'),  (req, res) => {
        // emailVerification.send(req.user.email);
        createSendToken(req.user, res);
    });

    // app.get('/auth/verifyEmail', emailVerification.handler);

    app.post('/api/auth/login', passport.authenticate('local-login'), (req, res) => {
        createSendToken(req.user, res);
    });

};
