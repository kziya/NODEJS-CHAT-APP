module.exports = (req,res,next) =>{
    const lastMailTime = req.session.lastMailTime;
    if(!lastMailTime)
        return next();

    const timeLeft = Math.floor((Date.now() - lastMailTime)/1000); 
    if(timeLeft < 60)    
        req.mailError = "You should wait 1-2 minutes before sending again!";
    next();
}