const express = require('express');
const router = express.Router();
const DeveloperController = require('../controllers/Developer.controller');
const Authenticate = require('../middleware/authenticate');
const Authorize = require('../middleware/authorize');



router.post('/create', DeveloperController.createDeveloper);


router.get('/list', Authenticate.authenticate, Authorize.isAdmin('admin'), DeveloperController.listDevelopers);
router.get('/list/:id', Authenticate.authenticate, DeveloperController.getDeveloperById);
router.put('/update/:id', Authenticate.authenticate, DeveloperController.updateDeveloper);
router.delete('/delete/:id', Authenticate.authenticate, DeveloperController.deleteDeveloper);
router.delete('/delete-all', Authenticate.authenticate, Authorize.isAdmin('admin'), DeveloperController.deleteAllDevelopers);

module.exports = router;