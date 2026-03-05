const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let editTodo = null;

//fun to add a task in todoList
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("enter something in list");
    return false;
  }

  if (addBtn.innerText === "Edit") {
    // Passing the original text to editLocalTodos function before edit it in the todoList
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML); //we also have to update local storage as we update a task so for that we call editLocalTodos fun
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    //as we said we will add <li> in JS
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //edit button for each added task
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn"); //because we created this button in JS so to apply CSS on it we need to assign it class & i.e. done like this
    //here we gave it 2 classes btn aswellas editBtn
    li.appendChild(editBtn);

    //delete button for each added task
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn"); //because we created this button in JS so to apply CSS on it we need to assign it class & i.e. done like this
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = ""; //after adding tast to todoList we need to empty the input box

    saveLocalTodos(inputText);
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    //if innerHTML of parameter is remove then it means remove button was clicked
    todoList.removeChild(e.target.parentElement);
    //e.target is remove button & its parent is <li> & it will be removed
    deleteLocalTodos(e.target.parentElement); //when a task is removed then it must be also deleted from local storage, jo bhi task delete krna hoga that <li> will be passed as parameter
  }

  if (e.target.innerHTML === "Edit") {
    //if innerHTML of parameter is edit then it means edit button was clicked
    inputBox.value = e.target.previousElementSibling.innerHTML;
    //isse jo task hoga that will be moved to inputBox
    inputBox.focus(); //cursor will be set to inputBox
    addBtn.value = "Edit"; //text of addBtn will change to edit
    editTodo = e;
  }
};

// Function to save local todo
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    //if no task added till now then create empty array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //if task are already added then put them in array
  }
  todos.push(todo); //add new task
  localStorage.setItem("todos", JSON.stringify(todos)); //update local storage by new todos array
};

// Function to get local todo: ab local storage m to store kr diya h tasks ko but refresh krne k baad they must be visible on screen so for that we will create list of all tasks present in todos array of local storage
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      //Creating p tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // Creating Edit Btn
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      // Creating Delete Btn
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local todo: this fun will be called when we click on remove button of a task. This fun deletes that task from local storage
const deleteLocalTodos = (todo) => {
  //todo is the list which is to be deleted
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML; //0th child of todo <li> is its innertext of <li>
  let todoIndex = todos.indexOf(todoText); //indexOf functions finds the first occurance of todoText in todos array
  todos.splice(todoIndex, 1); //splice fun will remove that task from that array
  localStorage.setItem("todos", JSON.stringify(todos)); //update the local storage with new todos array
  // Array functions : slice / splice
  console.log(todoIndex);
};

//when we click on edit button and edit a task then it must be  updated in local storage also
const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);

//as we click on addBtn, addTodo fun will be called
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo); //on clicking it passes a parameter to updateTodo fun
