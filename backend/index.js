const express=require('express');
const app =express();
const mongoose= require('mongoose');

app.use(express.json());

//MongoDb Bağlantı
require('./db/dbConnection')

//routerlar

const userRouter=require('./routers/userRouter');
const matchRouter=require('./routers/matchRouter');
const matchTimeRouter=require('./routers/matchTimeRouter');
const stadiumRouter=require('./routers/stadiumRouter');

//sayfa yönlendirme

app.use('/api/user',userRouter);
app.use('/api/match',matchRouter);
app.use('/api/matchTime',matchTimeRouter);
app.use('/api/stadium',stadiumRouter);

app.listen(3000, () =>{
    console.log("3000 portundan server başlatıldı.");
});