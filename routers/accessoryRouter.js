const accessoryRouter=require('express').Router();
const accessoryController=require('../controller/accessoryController');

accessoryRouter.post('/addAccessory',accessoryController.addAccessory);
accessoryRouter.get('/listAccessory',accessoryController.listAccessory);

module.exports=accessoryRouter;