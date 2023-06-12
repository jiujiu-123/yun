const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql")
const { log } = require("console")


app.use(express.static(path.resolve(__dirname, "./public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123} 解析post请求的请求体



//建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1',//数据库的IP地址
    user: 'root',//登录数据库的账号
    password: '123456',//登录数据库的密码
    database: 'my_db_01',//指定要操作哪个数据库
})

//检测mysql模块能否正常工作
db.query('select 1', (err, results) => {
    //mysql模块工作期间报错
    if (err) return console.log(err.message);
    //能够成功的执行SQL语句
    console.log(123);
})
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


//登陆路由
app.post("/login", (req, res) => {
    const userdata = 'select * from usersdata'
    db.query(userdata, (err, results) => {
        if (err) return console.log(err.message);
        // console.log(results); 数据库表中的内容
        console.log("req.body:" + req.body.userpassword);
        // console.log(req.body.username);
        // console.log(req.body.userpassword);
        const resolves = results.find((item) => {
            return item.userphone == req.body.userphone && item.userpassword == req.body.userpassword
        })
        console.log(resolves);
        if (resolves) {
            console.log("登录成功");
            res.json({
                code: 200,
                data: {
                    username: resolves.username
                }
            })
            // res.send("<h1><a href='./index.html'>点击跳转首页</a></h1>")
        } else {
            res.json({
                code: 404,
            })
            // console.log("登陆失败");                   
        }
    })

})
//注册路由
app.post("/regist", (req, res) => {
    console.log(req.body);
    const userdata = 'insert into usersdata (username,userpassword,userphone) values (?,?,?)'
    db.query(userdata, [req.body.username, req.body.userpassword, req.body.userphone], (err, results) => {
        // 插入失败
        if (err) {
            res.json({
                code: 404
            })
            console.log("插入失败");
            return 0
        }
        console.log(results.username);
        // 插入成功
        //注意:如果执行的是 insert into插入语句，则results是一个对象
        //可以通过affectedRows属性，来判断是否插入数据成功
        if (results.affectedRows === 1) {
            res.json({
                code: 200, 
                data: {
                    username: req.body.username
                }
            })
            console.log('插入成功');
        }
    })

})

app.listen(8000, () => {
    console.log("服务器已经启动 在 8000端口");
})