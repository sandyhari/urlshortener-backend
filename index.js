require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./src/config/db.js")
const MainpageRouter = require("./src/routers/index");
const UrlpageRouter = require("./src/routers/url");
const LoginRouter = require("./src/routers/login");
const SignupRouter = require("./src/routers/signup");
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const app = express();
let port = process.env.PORT||8143;


app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());  // for cors functiona
app.use(cookieParser());

app.use('/user/login',LoginRouter);
app.use('/user/signup',SignupRouter);
app.use('/redirect',MainpageRouter);
app.use('/api/url',UrlpageRouter);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})


app.listen(port,()=>{
    console.log(`listening in ${port}`);
})