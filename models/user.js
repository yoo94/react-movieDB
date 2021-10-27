const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: String,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        //암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            })
        });

    } else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword , cb){
    //plainPassword <-왼쪽거를 암호화해서 비교해서 맞는지 체크->  암호화된 비밀번호
    bcrypt.compare(plainPassword,this.password,function (err,isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}
//토큰생성 메서드
userSchema.methods.generateToken = function (cb){
    var user = this;
    //jsonwebtoken 이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(),'sercretToken')

    user.token = token;
    user.save(function (err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}
//토큰 복호화 메서드
userSchema.methods.findByToken= function (token,cb){
    var user = this;
    //토큰 decode
    jwt.verify(token,'sercretToken',function (err,decoded) {
        //유저 아이드로 유저를찾은다음

        //클라이언트에서 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token},function (err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })

    jwt.verify(token,'shhhhh',function (err,decoded){
        console.log(decoded.foo)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}