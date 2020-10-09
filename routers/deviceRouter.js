const deviceRouter=require('express').Router();
const deviceController=require('../controller/deviceController');

deviceRouter.post('/addDevice',deviceController.addDevice);
deviceRouter.get('/listDevice',deviceController.listDevice);
deviceRouter.post('/addBrand',deviceController.addBrand);
deviceRouter.get('/listBrand/:id',deviceController.listBrand);
deviceRouter.post('/addProduct/:id',deviceController.addProduct);
deviceRouter.get('/listProduct/:id',deviceController.listProduct);
deviceRouter.get('/listBrandProduct/:id',deviceController.listBrandProduct);

module.exports=deviceRouter;