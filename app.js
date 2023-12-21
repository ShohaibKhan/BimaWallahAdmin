const express = require('express')
const path = require("path")
const bodyParser = require("body-parser");
const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine","ejs");

const userRoutes = require("./Routes/userRoutes");
app.use(userRoutes);

app.get('/', (req, res) => {
  res.render("home");
})


app.listen(3000,()=>{
  console.log("server restarted!");
})