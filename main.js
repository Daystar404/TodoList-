let todos = JSON.parse(localStorage.getItem('todos')) || []
let name = localStorage.getItem('name') || 'Enter your name'
const input = document.querySelector('.input')
const add = document.querySelector('.add')
const todoss = document.querySelector('.todos')
const user = document.querySelector('.name')
let id = todos.length != 0 ? todos[todos.length-1].ID+1 : 0
const noTodos = document.querySelector('.noTodos')
loadTodos()
console.log(name)
user.textContent = name
user.addEventListener('dblclick', ()=>{
  user.setAttribute('contenteditable', 'true')
  user.focus()

  user.addEventListener('blur', () => {
    user.setAttribute('contenteditable', 'false')
    localStorage.setItem('name', user.textContent)
  })
  
})

add.addEventListener('click', ()=>{
  const todo = {
    wtdo : input.value,
    completed : false,
    ID : id
  }
  id +=1;
  todos.push(todo)
  input.value = ''
  localStorage.setItem('todos',JSON.stringify(todos))
  loadTodos()
})

function loadTodos(){ 
  todoss.innerHTML = ''
  if(todos.length === 0){
    noTodos.style.display = 'block'
  }
  else{
    noTodos.style.display = 'none'
    for (let i = 0; i < todos.length; i++) {
      todoss.innerHTML += `
         <div class="todo" id="${todos[i].ID}">
           <i class="fas fa-check check" onclick="completed(this)" id="${todos[i].ID}"></i>
           <p class="task" contenteditable="false" id="${todos[i].ID}">${todos[i].wtdo}</p>
           <div class="tools">
            <button class="btn edit" onclick="editTask(this)" id="${todos[i].ID}"><i class="fas fa-pencil-alt"></i></button> 
            <button class="btn" onclick="deleteTodo(this)" id="${todos[i].ID}"> <i class="fas fa-trash-alt"></i> </button>
           </div>
         </div>
        `
      completed(this)
    }
  }
}

function deleteTodo(e){
  const todo = document.querySelectorAll('.todo')
  for(let i=0; i<todo.length; i++){
    if(e.id == todo[i].getAttribute('id')){
      todo[i].style.display = 'none'
     console.log('deleted! '+todo[i].getAttribute('id'))
     
        todos = todos.filter(t=>t.ID != parseInt(e.id))
       localStorage.setItem('todos',JSON.stringify(todos))
    }
  }
  loadTodos()
}
function editTask(e){
  const task = document.querySelectorAll('.task')
  for(let i=0; i<task.length; i++){
    if(e.id == task[i].getAttribute('id') && todos[i].completed == false){
      task[i].setAttribute('contenteditable', 'true')
      task[i].focus()
      task[i].addEventListener('blur',()=>{
        task[i].setAttribute('contenteditable', 'false')
        todos[i].wtdo = task[i].textContent;
        localStorage.setItem('todos',JSON.stringify(todos))
      })
    }
  }
}

function completed(e){
  const check = document.querySelectorAll('.check')
  const task = document.querySelectorAll('.task')
  const todo = document.querySelectorAll('.todo')
  const edit = document.querySelectorAll('.edit')
  
  for(let i=0; i<check.length; i++){
    if((e.id == task[i].getAttribute('id') && todos[i].completed == false)){
      task[i].style.textDecoration = 'line-through'
      task[i].style.opacity = '.5'
      todo[i].style.opacity = '1'
      check[i].style.color = 'hsl(234, 85%, 45%)'
      edit[i].style.opacity = '.3'
      todos[i].completed = true
      localStorage.setItem('todos',JSON.stringify(todos))
     }
    else if(e.id == task[i].getAttribute('id') && todos[i].completed == true) {
        task[i].style.textDecoration = 'none'
        task[i].style.opacity = '1'
        todo[i].style.opacity = '1'
        check[i].style.color = 'hsl(224, 30%, 27%)'
        edit[i].style.opacity = '.8'
        todos[i].completed = false
        localStorage.setItem('todos', JSON.stringify(todos))
      }
      else if(todos[i].completed == true){
        task[i].style.textDecoration = 'line-through'
        task[i].style.opacity = '.5'
        todo[i].style.opacity = '1'
        check[i].style.color = 'hsl(234, 85%, 45%)'
        edit[i].style.opacity = '.3'
        todos[i].completed = true
        localStorage.setItem('todos', JSON.stringify(todos))
      }
  }
}