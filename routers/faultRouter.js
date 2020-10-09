const faultRouter=require('express').Router();
const faultController=require('../controller/faultContreller');

faultRouter.post('/addFault',faultController.addFault);
faultRouter.get('/listFault',faultController.listFault);

module.exports=faultRouter;