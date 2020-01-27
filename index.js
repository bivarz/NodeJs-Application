const express = require('express');
const app = express();

app.use(express.json());


const users = ["Paulo","Diego","Tiago"]

app.get("/users", (req,res)=>{

  return res.json(users);

})

app.get("/users/:index", (req,res)=>{
  const {index} = req.params;

  return res.json(users[index]);

})

// Create 1
app.post("/users", (req,res)=>{
  const {name} = req.body;

  users.push(name)

  return res.json(users);

})

//Delete 1
app.delete("/users/:index", (req,res)=>{
  const {index} = req.params;
  
  users.splice(index,1);

  return res.send();
})

//update 1
app.put("/users/:index", (req,res)=>{
  const {index} = req.params;
  const {name} = req.body;

  users[index]= name;
  return res.json(users);
})



app.listen(3000);