const express = require('express');
const app = express();

app.use(express.json());


const users = ["Paulo","Diego","Tiago"]

function checkName(req,res,next) {
if(!req.body.name){
  return res.status(400).json({error:"User name is required"});
}
  return next();

}

function checkIndex(req,res,next) {
 const user = users[req.params.index];
 
  if(!users[req.params.index]){
    return res.status(400).json({error:"User does not exists"});
  }
  req.user = user;
    return next();
  }

app.get("/users",(req,res)=>{

  return res.json(users);

})

app.get("/users/:index",checkIndex ,(req,res)=>{
   return res.json(req.user);

})

// Create 1
app.post("/users", checkName, (req,res)=>{
  const {name} = req.body;

  users.push(name)

  return res.json(users);

})

//Delete 1
app.delete("/users/:index", checkIndex,(req,res)=>{
  const {index} = req.params;
  
  users.splice(index,1);

  return res.send();
})

//update 1
app.put("/users/:index",checkName,checkIndex, (req,res)=>{
  const {index} = req.params;
  const {name} = req.body;

  users[index]= name;
  return res.json(users);
})



app.listen(3000);