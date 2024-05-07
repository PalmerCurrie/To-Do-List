import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";
import { getProjects } from './projects.js';
import "./sidebar.js";
import { saveProjects, loadProjects} from "./storage.js"




// To-Do
// Saving data
// Edit ToDo's
// Favourite ToDo's to show up in important option
// the Date todos filter for today, 7 days
// 

let projects = getProjects();
loadProjects();
generateAllToDo();

const container = document.getElementById("container");
container.onchange = saveProjects;


const todoContainer = document.getElementById("todo-container");



export function generateAllToDo() {
    let projects = getProjects();
    const todoContainer = document.getElementById("todo-container");
    todoContainer.textContent = "";
    generateOptionHeader("All Tasks");
    projects.forEach(project => {
        project.todos.forEach(todo => {
            const todoItem = displayToDo(todo);
            todoContainer.appendChild(todoItem);
            
        });
    });

}

export function generateImportantToDo() {
    let projects = getProjects();
    const todoContainer = document.getElementById("todo-container");
    todoContainer.textContent = "";
    generateOptionHeader("Important");
    projects.forEach(project => {
        project.todos.forEach(todo => {
            if (todo.priority) {
                const todoItem = displayToDo(todo);
                todoContainer.appendChild(todoItem);
            }
        });
    });

}

function displayToDo(todo) {
    const listItem = document.createElement("li");

    const divContent = document.createElement("div");
    divContent.classList.add("content");

    const title = document.createElement("h2");
    title.textContent = todo.title;
    const description = document.createElement("p");
    description.textContent = todo.description;
    const dueDate = document.createElement("div");
    dueDate.classList.add("date");
    dueDate.textContent = todo.dueDate;
    const favouriteImage = document.createElement("img");
    if (todo.priority) {
        favouriteImage.src = "Icons/star-yellow.svg";
        todo.priority = true;
    } else {
        favouriteImage.src = "Icons/star.svg";
        todo.priority = false;
    }

    const favourite = document.createElement("div");
    favourite.classList.add("svg-icon");
    favourite.appendChild(favouriteImage);

    favourite.addEventListener("click", () => {
        if (!todo.priority) {
            favouriteImage.src = "Icons/star-yellow.svg";
            todo.priority = true;
        } else {
            favouriteImage.src = "Icons/star.svg";
            todo.priority = false;
        }
        saveProjects();
    })


    divContent.appendChild(title);
    divContent.appendChild(description);
    listItem.appendChild(divContent);
    listItem.appendChild(dueDate);
    listItem.appendChild(favourite);
    listItem.classList.add("todo-item");
    return listItem;
}



function generateOptionHeader(titleString) {
    const todoContainer = document.getElementById("todo-container");
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("todo-header");
    const header = document.createElement("h1");
    header.textContent = titleString;
    headerDiv.appendChild(header);
    todoContainer.appendChild(headerDiv);
}


let isTaskFormOpen = false;
export function updateToDoContent(project) {
    todoContainer.textContent = "";
    generateOptionHeader(project.title);
    if (Array.isArray(project.todos)) {
        for (const todo of project.todos) {
        todoContainer.appendChild(displayToDo(todo));
        }
    }
    addToDoButton(project)
}



function addToDoButton(project) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "add-task-button";
    addButton.classList.add("button");
    addButton.addEventListener("click", () => {
        const todoForm = document.querySelectorAll(".todo-container .todo-form");
        if (todoForm.length === 0) {
            isTaskFormOpen = true;
            saveProjects();
            generateNewTaskForm(project);
        }
    } )
    todoContainer.appendChild(addButton);
}

function generateNewTaskForm(selectedProject) {
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
    addButton.classList.add("button-small");

    addButton.textContent = "Add Task"
    addButton.id = "add-todo-button";
    addButton.addEventListener("click", () => {
        let newToDo = new ToDo(title.value, description.value, dueDate.value, false)
        selectedProject.todos.push(newToDo);
        saveProjects();
        updateToDoContent(selectedProject, () => {
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