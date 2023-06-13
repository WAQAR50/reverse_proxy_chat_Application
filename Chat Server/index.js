const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser')
const io = require('socket.io')(http,{
  cors: {
    origin: '*',
  }
});
var users = [];
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const Pool = require('pg').Pool

const pool = new Pool({
    host: 'postgres', // server name or IP address;
    // host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'test123'
});
pool.connect()
console.log(pool)

app.get('/', (req, res) => {
  
  res.sendFile(__dirname + '/index.html');
});

app.get('/getall', (req, resp) => {
  pool.query("select * from chatgroups c order by id desc LIMIT 100",(err, res)=>{
    if(!err){
      resp.send(res.rows)
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    pool.end;
  })
})

app.post('/chatgroup', (req, resp) => {
 
  console.log(req.body)
  let queryinsert = "INSERT INTO chatgroups (ch_name) VALUES ('"+req.body.chatgroup+"')";
  
  pool.query(queryinsert,(err, res)=>{
    if(!err){
      resp.status(200).send(res.rows)
    }else{
      resp.status(400).send(err.message);
    }
    
    pool.end;
  })
})
app.post('/login', (req, resp) => {

  console.log(req.body.user)
  var result = users.find(function(e) {
    return e == req.body.user;
  });
  if(!result){
    users.push(req.body.user)
    resp.status(200).send()
  }else{
    resp.status(400).send("user already exist");
    
  }
  console.log("result" + result)
  console.log("users" + users)
  // if(!err){
  //   resp.send(res.rows)
  //     console.log(res.rows);
  // }else{
  //     console.log(err.message);
  // }

})



io.on('connection', (socket) => {
  socket.on('chat message', msg => {
      let queryinsert = "INSERT INTO chatgroups (ch_name) VALUES ('"+msg+"')";
    
    pool.query(queryinsert,(err, res)=>{
      if(!err){
        resp.status(200).send(res.rows)
      }else{
        resp.status(400).send(err.message);
      }
      
      pool.end;
    })
    io.emit('chat message', msg);
    console.log(msg)
    
    
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});