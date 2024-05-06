import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";
import { getProjects } from './projects.js';
import { updateToDoContent, generateAllToDo } from "./index.js";
import { saveProjects } from "./storage.js";

const projects = getProjects();

const sidebar = document.getElementById("sidebar");
const optionContainer = document.getElementById("option-container")
const addProjectButton = document.getElementById("add-project-button");
addProjectButton.classList.add("button");

const sidebarOptions = document.querySelectorAll(".sidebar .sidebar-option");

const allTasksDiv = document.getElementById("all-tasks");
addEventListenerSidebarOptions();
let selectedOption = allTasksDiv;
let selectedProject = null;
handleSelectedOption(selectedOption);






let isProjectFormOpen = false;
addProjectButton.addEventListener("click", () => {
    if (!isProjectFormOpen) {
        isProjectFormOpen = true;
        saveProjects();
        generateNewProjectForm();
    }
    
})


function generateNewProjectForm() {

    const projectForm = document.createElement("div");
    const titleInput = document.createElement("input");
    const addProjectButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    titleInput.placeholder = "Enter Project Name";
    titleInput.classList.add("project-title-input");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("button-small");
    addProjectButton.classList.add("button-small");
    addProjectButton.textContent = "Add";
    
    projectForm.appendChild(titleInput);
    projectForm.appendChild(addProjectButton);
    projectForm.appendChild(cancelButton);

    optionContainer.appendChild(projectForm);

    addProjectButton.addEventListener("click", () => {
        let title = titleInput.value;
        saveProjects();
        generateProject(title);
        optionContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    })

    cancelButton.addEventListener("click", () => {
        saveProjects();
        optionContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    })
    


}


function generateProject(title) {
    let newProject = new Project(title);
    projects.push(newProject);
    let newProjectIndex = projects.length - 1;
    updateProjects(newProject, newProjectIndex);
}

export function updateProjects(proj, index) {
    const projectContainer = document.getElementById("project-container");

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("sidebar-option");
        projectDiv.classList.add("project");
        const deleteButton = document.createElement("button");
        const renameButton = document.createElement("button");
        deleteButton.classList.add("button-small");
        renameButton.classList.add("button-small");
        
        const title = document.createElement("p");

        title.textContent = proj.title;
        deleteButton.textContent = "Delete";
        renameButton.textContent = "Rename";
        projectDiv.appendChild(title);
        projectDiv.appendChild(deleteButton);
        projectDiv.appendChild(renameButton);

        
        deleteButton.addEventListener("click", (e) => {
            projects.splice(index, 1);
            projectContainer.removeChild(projectDiv);
            e.stopPropagation();
            saveProjects();

            if (selectedOption === projectDiv) {
                selectOption(allTasksDiv);
            }

        })

        renameButton.addEventListener("click", (e) => {
            let newTitle = prompt("Enter a new name for this Project:", "Project: "); 
            proj.title = newTitle;
            title.textContent = newTitle;
            e.stopPropagation(); // To make sure the div is not also clicked when button is clicked
            saveProjects();

        })

        projectDiv.addEventListener("click", () => {
            selectedOption = projectDiv;
            selectedProject = proj;
            projectDiv.classList.add("sidebar-option-selected");
            selectOption(projectDiv);
            handleSelectedOption(selectedOption);
            saveProjects();
        })

        projectContainer.appendChild(projectDiv);
}

function selectOption(nextSelectedOption) {
    const selectedOptions = document.querySelectorAll(".sidebar .sidebar-option-selected");
    if (selectedOptions.length === 0) {
        allTasksDiv.classList.add("sidebar-option-selected")
    } else {
        selectedOptions.forEach(option => {
            option.classList.remove("sidebar-option-selected");
        });
        nextSelectedOption.classList.add("sidebar-option-selected");
    }

}

function addEventListenerSidebarOptions() {
    sidebarOptions.forEach(option => {
        option.addEventListener("click", () => {
            saveProjects();
            selectedOption = option;
            option.classList.add("sidebar-option-selected");
            selectOption(option);
            handleSelectedOption(selectedOption);
        })
    })
}

function handleSelectedOption(selectedOption) {
    switch(selectedOption.id) {
        case "all-tasks":
            generateAllToDo();
            // Handle when selectedOption is the element with id "all-tasks"
            break;
        case "today":
            // Handle when selectedOption is the element with id "today"

            break;
        case "next-7-days":
            // Handle when selectedOption is the element with id "next-7-days"
            break;
        case "important":
            // Handle when selectedOption is the element with id "important"
            break;
        default:
            if (selectedOption.classList.contains("project")) {
                updateToDoContent(selectedProject);
            } else {
                // Handle default case if selectedOption's id or class doesn't match any of the above cases
                console.log("Error something has gone wrong with selectedOption");
            }
            break;
    }
}