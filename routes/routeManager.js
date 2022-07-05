const homeRouter = require('./homeRouter');
const userRouter = require('./userRouter');



module.exports = (app) =>{
    app.use('/user',userRouter);;
    app.use('/',homeRouter);
}