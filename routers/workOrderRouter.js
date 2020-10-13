const workOrderRouter=require('express').Router();
const workOrderController=require('../controller/workOrderController');

workOrderRouter.post('/addWorkOrder',workOrderController.addWorkOrder);
workOrderRouter.get('/listWorkOrder',workOrderController.listWorkOrder);
workOrderRouter.get('/listOneWorkOrder/:id',workOrderController.listOneWorkOrder);
workOrderRouter.post('/addAccessory/:id',workOrderController.addAccessory);
workOrderRouter.post('/addWorkmanship/:id',workOrderController.addWorkmanship);
workOrderRouter.post('/addWorkmanshipProcess/:id',workOrderController.addWorkmanshipProcess);

module.exports=workOrderRouter;