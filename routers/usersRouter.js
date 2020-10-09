const userRouter=require('express').Router();
const userController = require('../controller/userController');

userRouter.post('/addUser', userController.addUser);
userRouter.post('/updateUser/:id', userController.updateUser);
userRouter.get('/listAllUsers',userController.listAllUsers);
userRouter.get('/listOneUser/:id',userController.listOneUser);

module.exports=userRouter;