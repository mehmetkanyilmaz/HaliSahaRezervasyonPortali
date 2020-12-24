const userRouter=require('express').Router()
const userController=require('../controller/userController')

userRouter.post('/userCreate',userController.userCreate)
userRouter.post('/userUpdate',userController.userUpdate)
userRouter.get('/userListOne/:id',userController.userListOne)
userRouter.post('/userLogin',userController.userLogin)

module.exports=userRouter