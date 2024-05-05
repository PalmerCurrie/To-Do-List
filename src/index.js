import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";

let projects = [];


// To-Do
// form for adding projects
// form for adding To-DO
// 

const sidebar = document.getElementById("sidebar");
const projectContainer = document.getElementById("project-container")
const addProjectButton = document.getElementById("add-project-button");
const allTasksDiv = document.getElementById("all-tasks");

const todoContainer = document.getElementById("todo-container");

let selectedProjectIndex = 0;
let isProjectFormOpen = false;
addProjectButton.addEventListener("click", () => {
    if (!isProjectFormOpen) {
        isProjectFormOpen = true;
        generateNewProjectForm();
    }
    
})

function generateNewProjectForm() {
    const projectForm = document.createElement("div");
    const titleInput = document.createElement("input");
    const generateProjectButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    titleInput.placeholder = "Enter Project Name";
    titleInput.classList.add("project-title-input");
    cancelButton.textContent = "Cancel";
    generateProjectButton.textContent = "Add";
    
    projectForm.appendChild(titleInput);
    projectForm.appendChild(generateProjectButton);
    projectForm.appendChild(cancelButton);

    projectContainer.appendChild(projectForm);

    generateProjectButton.addEventListener("click", () => {
        let title = titleInput.value;
        generateProject(title, () => {
            projectContainer.removeChild(projectForm);
        });
        isProjectFormOpen = false;
    })

    cancelButton.addEventListener("click", () => {
        projectContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    })

}


function generateProject(title) {
    let newProject = new Project(title);
    projects.push(newProject);
    updateProjects();

}

function updateProjects() {
    projectContainer.textContent = "";

    for(const [index, proj] of projects.entries()) {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        const deleteButton = document.createElement("button");
        const renameButton = document.createElement("button");
        const title = document.createElement("p");

        title.textContent = proj.title;
        deleteButton.textContent = "Delete";
        renameButton.textContent = "Rename";
        projectDiv.appendChild(title);
        projectDiv.appendChild(deleteButton);
        projectDiv.appendChild(renameButton);

        
        deleteButton.addEventListener("click", () => {
            if (index === selectedProjectIndex) {
                selectedProjectIndex = null; // Deselect the deleted project
            }
            projects.splice(index, 1);
            updateProjects();
        })

        renameButton.addEventListener("click", () => {

            let newTitle = 
            proj.title = newTitle;
            updateProjects();
        })

        projectDiv.addEventListener("click", () => {
            selectProject(index);
        })

        if (selectedProjectIndex !== null && selectedProjectIndex < projectContainer.children.length) {
            const selectedProject = projectContainer.children[selectedProjectIndex];
            selectedProject.classList.add("project-selected");
            allTasksDiv.classList.remove("project-selected");
        } else {
            allTasksDiv.classList.add("project-selected");
        }

        projectContainer.appendChild(projectDiv);
    }
}

function selectProject(index) {
    const projectItems = document.querySelectorAll(".project");

    projectItems.forEach(item => {
        item.classList.remove("project-selected");
    });

    if (index >= 0 && index < projectItems.length) {
        projectItems[index].classList.add("project-selected");
        allTasksDiv.classList.remove("project-selected");
        selectedProjectIndex = index;
        updateToDoContent(projects[index]);
    } else {
        allTasksDiv.classList.add("project-selected");
        generateAllToDo();
    }

}





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