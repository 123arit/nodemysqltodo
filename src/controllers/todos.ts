import { RequestHandler } from 'express';

import mysql from 'mysql';


//import { Todo } from '../models/todos';

//interface Todo {id: string, text: string}

//const TODOS: Todo[] = [];

//dab connection

const mysqlConnection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"test"
});

mysqlConnection.connect((err: Error)=>{
  if(err) throw err;
  console.log("DB Connection successful!");
});

export const createTodo: RequestHandler = (req, res, next) => {
  const text : string = (req.body as { text: string }).text;

  //const newTodo: Todo = new Todo(Math.random().toString(), text);
  //const newTodo: Todo = new Todo(text, Math.random().toString());


  //const newTodo: Todo = {"id":Math.random().toString(), "text": text};

  //TODOS.push(newTodo);

  mysqlConnection.query('INSERT INTO todos (text) VALUES (?)',[text],(err, rows, fields)=>{
    if(err) throw err;
    //res.json({todos: rows});
    res.status(201).json({ message: 'Created the todo.' });

  })

  //res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  //res.json({ todos: TODOS });

  mysqlConnection.query('SELECT * FROM todos',(err: Error, row,fields)=>{
    if(err) throw err;
    res.json({todos: row});
  })
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  //const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  /*if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }*/

  //TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  mysqlConnection.query('UPDATE todos SET text=? WHERE id=?',[updatedText,todoId],(err, row,fields)=>{
    if(err) throw err;
    res.json({ message: 'Updated!' });
  })

  
  
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  //const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  /*if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }*/

  //TODOS.splice(todoIndex, 1);

  mysqlConnection.query('DELETE FROM todos WHERE id=?',[todoId],(err, row,fields)=>{
    if(err) throw err;
    //res.json({todos: row});
    res.json({ message: 'Todo deleted!' });
  })

  
};
