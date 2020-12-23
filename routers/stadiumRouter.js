const stadiumRouter=require('express').Router()
const stadiumController=require('../controller/stadiumController')

stadiumRouter.get('/stadiumList',stadiumController.stadiumList)
stadiumRouter.post('/stadiumCreate',stadiumController.stadiumCreate)
stadiumRouter.post('/stadiumUpdate',stadiumController.stadiumUpdate)
stadiumRouter.delete('/stadiumDelete/:id',stadiumController.stadiumDelete)

module.exports=stadiumRouter