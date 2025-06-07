const express = require('express');
const router = express.Router();
const GameController = require('../controllers/Games.controller');
const Authenticate = require('../middleware/authenticate');
const Authorize = require('../middleware/authorize');   

router.post('/add', Authenticate.authenticate, Authorize.isAdmin('admin', 'user'), GameController.addGame);
router.get('/list',  Authenticate.authenticate, Authorize.isAdmin('admin'), GameController.listGames);
router.get('/list/:id', Authenticate.authenticate, GameController.getGameById);
router.put('/update/:id', Authenticate.authenticate, GameController.updateGame);
router.delete('/delete/:id', Authenticate.authenticate, GameController.deleteGame);
router.delete('/delete-all', Authenticate.authenticate, Authorize.isAdmin('admin'), GameController.deleteAllGames);

module.exports = router;