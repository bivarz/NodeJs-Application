const express = require('express');

const app = express();

app.use(express.json());


const projects = [];

 // => Middleware que checa se o projeto existe
 
function checkExist(req,res,next) {
   const {id} = req.params
   const project = projects.find(p =>p.id ==id)

   if(!project){
     return res.status(404).json({erro:"Project not found, try again!"});
   }
  next()
}

// => Middleware que avisa que usuários ja existe

function checkIdExist(req,res,next) {
  const {id} = req.body

  const project = projects.findIndex(p => p.id == id)

  if(project !=-1)

  return res.status(400).json({erro:`O usuário com id ${id} já existe`})

  next()
}

// => Middleware que gera log do número de requisições
 
function createLog(req,res,next) {
  console.count("Número de requisições:")

  return next()
  
}

app.use(createLog)

/*
 ==> Retorna todos os projetos/ o res.json deve conter o array para listar todos 
 cadastrados.
 */
app.get("/projects", (req,res)=>{
   return res.json(projects);
})

/*
 ==> Request body: id, title
 =====>Cadastra um novo projeto, pega o id e title do body, depois coloca os dados
 dentro de um array, sendo assim o "task" poderá ser alterado com acesso: projects.nprojects.tasks.
 */
app.post("/projects",checkIdExist,(req,res)=>{
const {id, title, tasks} = req.body;

const nProjects = {
  id,
  title,
  tasks:[]
}
projects.push(nProjects)
return res.json(projects)
})


// => Altera o título do projeto com o id presente nos parâmetros da rota.
 
app.put("/projects/:id",checkExist, (req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
  })


 // => Deleta o projeto associado ao id presente nos parâmetros da rota.
 
app.delete("/projects/:id",checkExist,(req,res)=>{
  const {id} = req.params;

  const projectIndex= projects.findIndex(p => p.id == id)

  projects.splice(projectIndex,1) 
 
  return res.json(projects)
  })




 // => Adiciona uma nova tarefa no projeto escolhido via id; 
 
app.post("/projects/:id/tasks",checkExist,(req,res)=>{
  const {title} = req.body;
  const {id} = req.params;

  const project = projects.find(p => p.id == id)

  project.tasks.push(title) 
 
  return res.json(project)
  })


app.listen(3333);