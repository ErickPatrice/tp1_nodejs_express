const express = require('express');
const { resolve } = require('path');
const { randomUUID } = require('crypto');

// DECLARATIONS
const app = express();
const { todos } = require('./db/data.json');
const { writeFileSync } = require('fs');
// DECLARATIONS POUR users
const { users } = require ('./db/users.json');

// CONFIGURATION DE L'APP
app.use( express.static(resolve('public')) );
app.use( express.json() );

// ROUTING
app.get('/', (req, res) => {
  res.sendFile(
    resolve('public', 'home.html')
  );
});

app.get('/todos', (req, res) => {
  res.sendFile(
    resolve('public', 'todos.html')
  );
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// routing pour users//
// route pour servir la page html
app.get('/users', (req,res) => {
  res.sendFile(
    resolve('public','users.html')
  );
} );
// route pour servir le contenu de l'objet users
app.get('/api/users', (req,res) =>{
  res.json(users);
} );



// route pour servir le formulaire de création d'un utilisateur
app.get('/users/add' , (req,res) => {
  res.sendFile(
    resolve('public', 'usersadd.html')
    );
});

// route pour renvoyer les données du formulaire au serveur
app.post('/users/add', (req,res) => {
    const newUser = req.body;
    newUser.id = randomUUID();
    // à la création le nombre total de tâches de l'utilisateur est nul
    newUser.totalTodos = 0;
    users.push(newUser);
    updateUsersJSON();
    res.end();

})


function updateUsersJSON() {
  writeFileSync(
    resolve('db', 'users.json'),
    JSON.stringify({ users }, null, 2)
  );
}
// fin routing pour users//

app.get('/todos/create', (req, res) => {
  res.sendFile(
    resolve('public', 'formulaire.html')
  );
});
app.post('/todos/create', (req, res) => {
  const newTodo = req.body;
  newTodo.id = randomUUID();
  newTodo.done = false;
  todos.push(newTodo);
  updateJSON();
  res.end();
});

app.put('/api/todos/:id/:done', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  todo.done = req.params.done == 'true';
  updateJSON();
  res.end();
});

function updateJSON() {
  writeFileSync(
    resolve('db', 'data.json'),
    JSON.stringify({ todos }, null, 2)
  );
}




// LANCEMENT DU SERVEUR
app.listen(3000);
