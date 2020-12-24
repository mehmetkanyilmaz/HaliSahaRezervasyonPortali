const matchTimeRouter=require('express').Router()
const matchTimeController=require('../controller/matchTimeController')

matchTimeRouter.post('/matchTimeCreate',matchTimeController.matchTimeCreate)
matchTimeRouter.get('/matchTimeList',matchTimeController.matchTimeList)
matchTimeRouter.post('/matchTimeUpdate',matchTimeController.matchTimeUpdate)

module.exports=matchTimeRouter