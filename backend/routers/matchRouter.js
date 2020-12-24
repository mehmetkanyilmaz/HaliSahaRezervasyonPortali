const matchRouter=require('express').Router()
const matchController=require('../controller/matchController')

matchRouter.post('/matchCreate',matchController.matchCreate)
matchRouter.post('/matchList',matchController.matctList)
matchRouter.get('/matchUserList',matchController.matchUserList)
matchRouter.delete('/matchDelete/:id',matchController.matchDelete)
matchRouter.get('/matchDetailList/:id',matchController.matchDetailList)
matchRouter.post('/matchTimeUpdate',matchController.matchTimeUpdate)

module.exports=matchRouter