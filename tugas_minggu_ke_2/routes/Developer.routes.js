const express = require('express');
const router = express.Router();
const DeveloperController = require('../controllers/Developer.controller');

router.post('/create', DeveloperController.createDeveloper);
router.get('/list', DeveloperController.listDevelopers);

module.exports = router;