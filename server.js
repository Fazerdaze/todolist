const express = require('express')
const next = require('next')
const {parse } = require('url')
const faker = require('faker');
const bodyParser = require('body-parser')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const items = new Array(5);
for (let i = 0; i < items.length; i++) {
  items[i] = {
    id: faker.random.uuid(),
    text: faker.hacker.phrase(),
    isDone: faker.random.boolean(),
  }
}

const deleteItems = new Array();

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  
  server.get('/api/a', (req, res) => {
    return res.json({
        error: false,
        message: 'hello'
    });
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id})
  })

  server.post("/posts", (req,res)=>{
    console.log('Status gk',req.body)

    let error = true;
    let newItem = null;
    let message = 'The taks is too sort!';
    if(req.body.goal.text.length > 5) {
        newItem =  {
          id: faker.random.uuid(),
          text: req.body.goal.text,
          isDone: false
        };
        items.push(newItem);
        error = false;
        message = 'The task was added successfully';
  }

  return res.json({ 
    error,
    message,
    data: newItem
  });
})

  server.delete("/goalid", (req, res) => {
    let error = true;
    let message = 'The task was not delete!';
    let item = null;
    console.log(req.body);
    if(req.body.goalID.isDone == true){
    if (item = items.find((g)=>{return g.id == req.body.goalID.id})) {
      items.splice( items.indexOf(item), 1);
      deleteItems.push(item);
      error = false;
      message = 'The task was delete!';
    }
  }
  else{
    return 0;
  }
    return res.json({
    error,
    message,
    deleteItems,
    data: item});
})

// server.delete("/goalisdone", (req, res) => {
//   let error = true;
//   let message = 'The tasks was not delete!';
//   let item = null;
//   console.log("qq",req.body);
//   if((item = items.find((g)=>{return g.id == req.body.goalID.id}))){
//       items.splice(req.body.nDone);
//       error = false;
//       message = 'The task was delete!'; 
//   }
//   return res.json({
//   error,
//   message,
//   data: item});
// })


  server.get("/goals", (req,res)=>{

    return res.json({
      error: false,
      data: items
    });
})

server.post("/status", (req,res)=>{
  console.log('Status bb', req.body)

  const item = items.find((g)=>g.id===req.body.goal.id);
  if (!item) {
    return res.json({ error: true });  
  } else {
    item.isDone=req.body.goal.isDone
  }
  
  return res.json({ 
    error: false,
    data: item});
})

server.delete("/goals/:id", (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json({ remove: true }))
})

  server.all('*', (req, res) => {
      const params = parse(req.url, true);
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})