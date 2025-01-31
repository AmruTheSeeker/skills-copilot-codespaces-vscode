// Create web server
// Create a web server with express.js
// Require the express.js module
const express = require('express');
const app = express();
// Require the fs module
const fs = require('fs');
// Require the body-parser module
const bodyParser = require('body-parser');
// Require the path module
const path = require('path');
// Require the comment.js module
const comment = require('./comments');
// Require the comments.json file
const comments = require('./comments.json');
// Use the body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set the view engine
app.set('view engine', 'pug');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Create a get request handler
app.get('/', (req, res) => {
  res.render('index', { comments });
});
// Create a post request handler
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  res.redirect('/');
});
// Create a delete request handler
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments.splice(id, 1);
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  res.redirect('/');
});
// Create a put request handler
app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments[id].comment = req.body.comment;
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
  res.redirect('/');
});
// Create a get request handler
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  res.render('edit', { comment: comments[id] });
});
// Create a listen request handler
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// Export the app module
module.exports = app;