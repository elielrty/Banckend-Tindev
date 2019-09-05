const express = require('express')
const DevController = require('./controllers/DevController');
const LikeCotroller = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();

routes.get('/devs',DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/like', LikeCotroller.store);
routes.post('/devs/:devId/dislike', DislikeController.store);
module.exports = routes;