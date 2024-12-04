//Select Element
const addTodoBtn = document.querySelector(".todo__btn");
const todoList = document.querySelector(".todo__list");
const checkbox = document.querySelector(".checkbox")

let todos = [];

//Functions
const addTodo = () => {
  const todoInput = document.querySelector(".todo__input");
  const todoText = todoInput.value;
  todos.push({ text: todoText, completed: false, editing: false });

  //clear input field
  todoInput.value = "";
 
  //update ui with available todos
  updateTodoUI();
};

const toggleTodoComplete = (index) =>{
   todos[index].completed = !todos[index].completed;
   updateTodoUI();

}

const removeTodo = (index)=>{
   todos.splice(index, 1);
   updateTodoUI()
}


const editTodo = (index)=>{
    const todoInput = document.querySelector(".todo__input")
    todoInput.value = todos[index].text;
    todos.splice(index , 1)
    updateTodoUI();
}


const updateTodoUI = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = "todo__item";
     todoItem.innerHTML = ""

    todoItem.innerHTML = `
      <div class="todo__content ${todo.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" data-index="${index}"  ${todo.completed ? "checked" : ""}/>
                <p>${todo.text}</p>
      </div>
                <div class="actions">
                    <button class="edit-btn" data-index="${index}">edit</button>
                    <button class="remove-btn" data-index="${index}">delete</button>
                </div>
      `;
      todoList.appendChild(todoItem);
    
  });
};

//Events
addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

todoList.addEventListener("click", (e)=>{
    if(e.target.classList.contains("remove-btn")){
     const index = +e.target.getAttribute("data-index")
      removeTodo(index)
    }

    if(e.target.classList.contains("edit-btn")){
        const index = +e.target.getAttribute("data-index");
        editTodo(index)
    }
})

todoList.addEventListener("change", (e)=>{
    if(e.target.classList.contains("checkbox")){
       const index = +e.target.getAttribute("data-index");
       toggleTodoComplete(index)
    }
})

