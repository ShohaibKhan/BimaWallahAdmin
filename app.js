const express = require('express')
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs");

const userRoutes = require("./Routes/userRoutes");
app.use(userRoutes);

app.get('/', (req, res) => {
  res.send('hello world')
})

//CREATE

// app.post("/create",async(req,res)=>{
//   const data = req.body
//   await HTMLAllCollection.add(data)
//   res.send([msg:"User Added"])
// })

app.listen(3000)