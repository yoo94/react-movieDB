const  {user} =require('../models/user')

let auth = (req,res,next)=>{
    //인증처리하는곳
    //1.클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //2.토큰을 복호화한다음 유저를 찾는다.
    user.findByToken(token,(err,user)=>{
        if(err) throw  err;
        if(!user) return res.json({isAuth:false, error:true})

        req.token=token;
        req.user = user;
        next();
    })
}

module.exports = {auth};