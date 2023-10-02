const express = require("express");
const app = express();
const dotenv = require('dotenv')
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const aboutmeRouter = require('./routes/aboutme')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

dotenv.config();
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended:false }))

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
    

app.use('/',indexRouter)
app.use('/aboutme',aboutmeRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
