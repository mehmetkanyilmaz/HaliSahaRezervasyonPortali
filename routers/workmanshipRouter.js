const workamnshipRouter=require('express').Router();
const workamnshipController=require('../controller/workmanshipController');

workamnshipRouter.post('/addWorkmanship',workamnshipController.addWorkmanship);
workamnshipRouter.get('/listWorkmanship',workamnshipController.listWorkmanShip);

module.exports=workamnshipRouter;