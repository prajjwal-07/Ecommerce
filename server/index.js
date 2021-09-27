const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const user = require('./routes/user');
const category = require("./routes/category");
const product = require("./routes/product");
const auth = require('./middleware/userAuth'); 
const adminAuth = require("./middleware/adminAuth");

//connection to db
mongoose.connect(`mongodb://localhost:27017/${process.env.db_name}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("connection done")).catch((err)=>console.log(err)); 

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', auth, adminAuth ,(req, res) => {
    res.send("hello");

})

app.use('/api/user',user);
app.use('/api/category', category);
app.use('/api/product',product);

app.listen(process.env.PORT,() => {
    console.log("listening...")
});

