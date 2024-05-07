import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";
import { getProjects } from './projects.js';
import "./sidebar.js";
import { saveProjects, loadProjects} from "./storage.js"



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
            const todoItem = displayToDo(todo, project);
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
                const todoItem = displayToDo(todo, project);
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

    const edit = document.createElement("div");
    const editImage = document.createElement("img");
    editImage.src = "Icons/edit.svg";
    edit.classList.add("svg-icon");
    edit.appendChild(editImage);

    edit.addEventListener("click", () => {
        editToDo(todo);
    })


    divContent.appendChild(title);
    divContent.appendChild(description);
    listItem.appendChild(divContent);
    listItem.appendChild(dueDate);
    listItem.appendChild(favourite);
    listItem.appendChild(edit);
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






function createNewToDoForm() {
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

    taskForm.appendChild(titleLabel);
    taskForm.appendChild(title);
    taskForm.appendChild(descriptionLabel);
    taskForm.appendChild(description);
    taskForm.appendChild(dueDateLabel);
    taskForm.appendChild(dueDate);

    todoContainer.appendChild(taskForm);
        
}


function generateNewTaskForm(selectedProject) {
    createNewToDoForm();
    const taskForm = document.getElementById("todo-form");
    const addButton = document.createElement("button");
    addButton.id = "add-task-button";
    addButton.classList.add("button-small");
    addButton.textContent = "Add New To Do";

    addButton.addEventListener("click", () => {
        const title = document.getElementById("title-input");
        const description = document.getElementById("description-input");
        const dueDate = document.getElementById("duedate-input");

        let newToDo = new ToDo(title.value, description.value, dueDate.value, false)
        selectedProject.todos.push(newToDo);
        saveProjects();
        updateToDoContent(selectedProject, () => {
            todoContainer.removeChild(taskForm);
        });
        isTaskFormOpen = false;
       
    })

    taskForm.appendChild(addButton);

}





function editToDo(todo, project) {
    createNewToDoForm();

    const taskForm = document.getElementById("todo-form");
    const editButton = document.createElement("button");
    editButton.id = "add-task-button";
    editButton.classList.add("button-small");
    editButton.textContent = "Edit To Do";

    editButton.addEventListener("click", () => {
        const title = document.getElementById("title-input");
        const description = document.getElementById("description-input");
        const dueDate = document.getElementById("duedate-input");

        todo.title = title.value;
        todo.description = description.value;
        todo.dueDate = dueDate.value;
        saveProjects();
    
        // NEED TO FIND A WAY TO EDIT THE CURRENT TODO DIV AND ALSO REFLECT IT IN THE PROJECT OF THE PROJECTS
        // Right now it will edit it on the refresh of the content
        todoContainer.removeChild(taskForm);
        isTaskFormOpen = false;
       
    })
    taskForm.appendChild(editButton);


}
