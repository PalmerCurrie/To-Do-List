import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";
import "./sidebar.js";




// To-Do
// form for adding projects
// form for adding To-DO
// 





const todoContainer = document.getElementById("todo-container");





function generateAllToDo() {

}

let isTaskFormOpen = false;
function updateToDoContent(project) {
    todoContainer.textContent = "";
    addToDoButton()
    if (Array.isArray(project.todos)) {
        for (const todo of project.todos) {
        const task = document.createElement("div");
        const title = document.createElement("p");
        title.textContent = todo.title;

        task.appendChild(title);

        todoContainer.appendChild(task);   
        }
    }
}


function addToDoButton() {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "add-task-button";
    addButton.addEventListener("click", () => {
        if (!isTaskFormOpen) {
            isTaskFormOpen = true;
            generateNewTaskForm();
        }
    } )
    todoContainer.appendChild(addButton);
}

function generateNewTaskForm() {
    const taskForm = document.createElement("div");
    taskForm.classList.add("todo-form");
    taskForm.setAttribute("id", "todo-form");


    const title = document.createElement("input");
    title.id = "title-input";
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = "title-input"; 

    const description = document.createElement("input");
    description.id = "description-input";
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Descirption (Optional): ";
    descriptionLabel.htmlFor = "description-input"; 

    const dueDate = document.createElement("input");
    dueDate.id = "duedate-input";
    dueDate.type = "date";
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date (Optional): ";
    dueDateLabel.htmlFor = "duedate-input"; 

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task"
    addButton.id = "add-todo-button";
    addButton.addEventListener("click", () => {
        let newToDo = new ToDo(title.value, description.value, dueDate.value, false)
        let selectedProject = projects[selectedProjectIndex];
        selectedProject.todos.push(newToDo);
        updateToDoContent(() => {
            todoContainer.removeChild(taskForm);
        });
        isTaskFormOpen = false;
       

    })



    taskForm.appendChild(title);
    taskForm.appendChild(titleLabel);
    taskForm.appendChild(description);
    taskForm.appendChild(descriptionLabel);
    taskForm.appendChild(dueDate);
    taskForm.appendChild(dueDateLabel);
    taskForm.appendChild(addButton);

    todoContainer.appendChild(taskForm);
}