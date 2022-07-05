const homeRouter = require('./homeRouter');
const userRouter = require('./userRouter');



module.exports = (app) =>{
    app.use('/',homeRouter);
    app.use('/user',userRouter);;
}