const customerRouter=require('express').Router();
const customerController=require('../controller/customerController');

customerRouter.post('/addCustomer', customerController.addCustomer);
customerRouter.get('/listCustomer', customerController.listCustomer);
customerRouter.post('/addCustomerLocation/:id', customerController.addCustomerLocation);
customerRouter.get('/listCustomerLocation/:id', customerController.listCustomerLocation);
customerRouter.post('/addCustomerProduct/:id', customerController.addCustomerProduct);
customerRouter.get('/listCustomerProduct/:id', customerController.listCustomerProduct);

module.exports=customerRouter;