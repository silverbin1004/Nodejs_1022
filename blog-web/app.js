const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const PORT = 5000;
let posts = [];

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('환영합니다.');
});

app.get('/posts',(req,res)=>{
  res.json(posts);
});

app.post('/posts',(req,res)=>{
  const {title, content} = req.body;
  const newPost = {id: posts.length+1, title, content};
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/posts/:id',(req,res)=>{
  const postId = parseInt(req.params.id);
  const post = posts.find(p=>p.id===postId);
  if(!post){
    return res.status(404).json({message:'게시글을 찾을 수 없습니다.'});
  }
  res.json(post);
});

app.put('/posts/:id',(req,res)=>{
  const postID = parseInt(req.params.id);
  const{title,content} = req.body;
  const postIndex = posts.findIndex(p=>p.id===postID);
  if(postIndex===-1){
    return res.status(404).json({message:'게시글을 찾을 수 없습니다.'});
  }
  posts[postIndex] = {id: postID, title, content};
  res.json(posts[postIndex]);
});

app.delete('/posts/:id',(req,res)=>{
  const postId = parseInt(req.params.id);
  posts = posts.filter(p=>p.id!== postId);
  res.status(204).send();
})


app.listen(PORT, ()=>{
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

