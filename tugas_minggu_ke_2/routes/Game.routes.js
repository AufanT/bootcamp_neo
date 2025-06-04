const express = require('express');
const router = express.Router();
const GameController = require('../controllers/Games.controller');
const Authenticate = require('../middleware/authenticate');
const Authorize = require('../middleware/authorize');   

router.post('/add', GameController.addGame);
router.get('/list', Authenticate.authenticate, Authorize.isAdmin('admin'), GameController.listGames);
module.exports = router;