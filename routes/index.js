const express = require('express');
const router = express.Router();

let todos = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { todos: todos });
});


/* POST home page. */
router.post('/', function(req, res, next) {
  todos.push(req.body.todo);
  res.redirect('/');
});

/* GET delete page. */
router.get('/delete', function(req, res, next) {
  todos.splice(req.query.id, 1);
  res.redirect('/');
}); 

/* GET edit page. */
router.get('/edit', function(req, res, next) {
  res.render('edit', {todo: todos[req.query.id], id: req.query.id});
}); 

/* POST edit page. */
router.post('/edit', function(req, res, next) {
  todos[req.query.id] = req.body.todo;
  res.render('index', { todos: todos })
}); 



module.exports = router;
