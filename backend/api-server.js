const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cookieParser())

const users = [
  {
    id: 1,
    userId: 'aaa',
    password: 'aaa',
    userName: '홍길동',
    email: 'aaa@email.com'
  },
  {
    id: 2,
    userId: 'bbb',
    password: 'bbb',
    userName: '이성계',
    email: 'bbb@email.com'
  },
  {
    id: 3,
    userId: 'ccc',
    password: 'ccc',
    userName: '장보고',
    email: 'ccc@email.com'
  },
  {
    id: 4,
    userId: 'ddd',
    password: 'ddd',
    userName: '이순신',
    email: 'ddd@email.com'
  },
]

// 로그인상태 확인
app.get('/account', (req, res) => {
  console.log('account req >>>', req.cookies, req.cookies.token)
  if(req.cookies && req.cookies.token) {
    // jwt 복호화
    jwt.verify(req.cookies.token, 'abc1234', (err, decoded) => {
      if(!err) {
        const info = {...decoded, status: 200}
        return res.status(200).send(info)
      }
    })
  } else {
    return res.send(401)
  }
})

//로그인
app.post('/account', (req, res) => {
  const id = req.body.id
  const pw = req.body.pw
  console.log(id,' -||- ', pw)
  const isUser = users.find(m => m.userId === id && m.password === pw)
  if(isUser) {
    // token 만들기
    const token = jwt.sign({
      userId: isUser.userId,
      userName: isUser.userName
    }, "abc1234", { // 암호화 키
      expiresIn: '10m', // 로그인 유지시간
      issuer: 'M.B.H'   // 작성자
    })
    // Cookie Options
    // const options = {
    //   domain: "localhost",
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "strict"
    // }
    // res.cookie("token", token, options)
    console.log(isUser.id, ' | ', isUser.userName, ' | ', isUser.userId, '\n',' token| ', token)
    res.send({
      // id: isUser.id,
      // userName: isUser.userName,
      // userId: isUser.userId,
      token: token,
      status: 200
    })
  } else {
    res.clearCookie('token').json({
      status: 404,
      error: 'Not Found User',
      message: '사용자를 찾을 수 없습니다. 로그인 계정을 확인하세요'
    })
  }
})

app.delete('/delete', (req, res) => {
  if(req.cookies && req.cookies.token) {
    res.clearCookie('token')
  }
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})