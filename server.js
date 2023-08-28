const express = require("express");
const app = express();
const dotenv = require('dotenv')
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const aboutmeRouter = require('./routes/aboutme')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended:false }))

dotenv.config()

const mongoose = require('mongoose')
const connectDb = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://vishwamanish62:manish@cluster0.r9fndjs.mongodb.net/",{
            useNewUrlParser:true
        })
        const db = mongoose.connection
        db.on('error',error => console.error(error))
        db.once('open',() => console.log('Connected to Mongoose'))
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

connectDb();

app.use('/',indexRouter)
app.use('/aboutme',aboutmeRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

//port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
