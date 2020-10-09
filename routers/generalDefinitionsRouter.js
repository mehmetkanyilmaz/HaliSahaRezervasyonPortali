const generalDefinitionsRouter=require('express').Router();
const generalDefinitionsController = require('../controller/generalDefinitionsController');

generalDefinitionsRouter.post('/addRequestType', generalDefinitionsController.addRequestType);
generalDefinitionsRouter.post('/updateRequestType/:id', generalDefinitionsController.updateRequestType);
generalDefinitionsRouter.get('/listRequestType', generalDefinitionsController.listRequestType);
generalDefinitionsRouter.post('/addServiceStatus', generalDefinitionsController.addServiceStatus);
generalDefinitionsRouter.post('/updateServiceStatus/:id', generalDefinitionsController.updateServiceStatus);
generalDefinitionsRouter.get('/listServiceStatus', generalDefinitionsController.listServiceStatus);
generalDefinitionsRouter.post('/addServiceType', generalDefinitionsController.addServiceType);
generalDefinitionsRouter.post('/updateServiceType/:id', generalDefinitionsController.updateServiceType);
generalDefinitionsRouter.get('/listServiceType', generalDefinitionsController.listServiceType);

module.exports=generalDefinitionsRouter;