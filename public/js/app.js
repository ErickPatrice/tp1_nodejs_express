if (location.pathname == '/todos') {
  fetch('/api/todos')
    .then(res => res.json())
    .then(todos => {
      document.querySelector('.todos').innerHTML = `
        ${todos.map(t => `
          <div
            id="${t.id}"
            class="todo ${t.cat} ${t.done ? 'done' : ''}"
            onclick="updateTodo(this)">
            <p>${t.txt}</p>
          </div>
        `).join('')}
      `;
    });

    /**
     * 
     * @param {HTMLDivElement} el 
     */
  function updateTodo(el) {
    el.classList.toggle('done');
    fetch(
      `/api/todos/${el.id}/${el.classList.contains('done')}`,
      { method: 'put' }
    );
  }
}

if (location.pathname == '/todos/create') {
  const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(location.href, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        txt: form.txt.value,
        cat: form.cat.value
      })
    }).then(() => location.href = '/todos');
  });
}

// Instructions pour les pages users///

if (location.pathname == '/users') {
  console.log("On est sur la page users!!")
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      document.querySelector('.users').innerHTML = `
        ${users.map(u => `
          <div
            <p>${u.firstname} ${u.lastname}</p>
           
          </div>
        `).join('')}
      `;
    });
  }

  if (location.pathname == '/users/add') {
    console.log("on est sur la page users/add!!");
    const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(location.href, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: form.firstname.value,
        lastname: form.lastname.value
      })
    }).then(() => location.href = '/users');
  });


  }