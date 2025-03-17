const access = (...roleArr) => {
    return (req,res,next) => {
        if(!roleArr.includes(req.role)){
            return res.status(401).json({message : "Un-authorized"})
        }
        next()
    }
}

module.exports = access