const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')

//로그인 토큰 쿠키에 저장해주는 라이브러리
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const {User} = require("./models/user")

//application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application.json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('success connect mongoDB...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World! hi')
})

//회원가입을 위한 라우터
app.post('/register', (req, res) => {

    //회원가입 할때에 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);

    //저장전에 비번을 암호화한다.

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

//로그인 라우터
app.post('/login', (req, res) => {
    //1.요청된 이메일을 데이터베이스에서 있는지 찾음
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 업습니다."
            })
        }
        //2.요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) return res.json({loginsuccess: false, message: "비밀번호가 틀렸습니다."})

                //3.비밀번호까지 맞으면 토큰을 생성  아래 user에 토큰이 담겨옴
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    //토큰을 저장한다. 쿠키,? 로컬스토리지? 세션?
                    res.cookie("x_auth",user.token)
                        .status(200)
                        .json({loinSuccess:true,userId : user._id})
                })
            }
        )


    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})