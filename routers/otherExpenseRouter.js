const otherExpenseRouter=require('express').Router();
const otherExpenseController=require('../controller/otherExpenseController');

otherExpenseRouter.post('/addOtherExpense',otherExpenseController.addOtherExpense);
otherExpenseRouter.get('/listOtherExpense/:id',otherExpenseController.listOtherExpense);

module.exports=otherExpenseRouter;