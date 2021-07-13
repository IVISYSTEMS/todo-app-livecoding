// パッケージの読み込み
const express = require('express');
const sqlite3 = require('sqlite3');

// ルータオブジェクト
const router = express.Router();

// DBオブジェクトの作成
const db = new sqlite3.Database('db/todo-app-db.db');

/* GET home page. */
// DBのtodosテーブルから取得したレコードをtodosに渡せればよい
router.get('/', function(req, res, next) {

  //DBのテーブルからSELECTを実行
  db.serialize(() => {
    db.all("SELECT * FROM todos", (err, rows) => {
      if(!err) {
        res.render('index', { todos: rows });
      }
    });
  });  
});


/* POST home page. */
router.post('/', function(req, res, next) {
  //DBでINSERTする処理に変更したい
  db.run('INSERT INTO todos(content) VALUES (?)', req.body.todo, (err) => {
    if(!err) {
      res.redirect('/');
    }
  });
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
