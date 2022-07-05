module.exports = async (mongoose,app) =>{
    
   await mongoose.connect(process.env.DB_STRING);

   app.listen(process.env.SERVER_PORT, () => {
       console.log(`Server is listening ${process.env.SERVER_PORT} port!`);
   });
}