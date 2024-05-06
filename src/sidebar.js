import "./style.css";
import ToDo from "./ToDo";
import Project from "./Project";

const sidebar = document.getElementById("sidebar");
const optionContainer = document.getElementById("option-container")
const addProjectButton = document.getElementById("add-project-button");

const sidebarOptions = document.querySelectorAll(".sidebar .sidebar-option");

let projects = [];

const allTasksDiv = document.getElementById("all-tasks");
let selectedOption = allTasksDiv;

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
    const addProjectButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    titleInput.placeholder = "Enter Project Name";
    titleInput.classList.add("project-title-input");
    cancelButton.textContent = "Cancel";
    addProjectButton.textContent = "Add";
    
    projectForm.appendChild(titleInput);
    projectForm.appendChild(addProjectButton);
    projectForm.appendChild(cancelButton);

    optionContainer.appendChild(projectForm);

    addProjectButton.addEventListener("click", () => {
        let title = titleInput.value;
        generateProject(title);
        optionContainer.removeChild(projectForm);
        isProjectFormOpen = false;
    })

    cancelButton.addEventListener("click", () => {
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

function updateProjects(proj, index) {
    const projectContainer = document.getElementById("project-container");

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("sidebar-option");
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

        
        deleteButton.addEventListener("click", (e) => {
            projects.splice(index, 1);
            projectContainer.removeChild(projectDiv);
            e.stopPropagation();

            if (selectedOption === projectDiv) {
                selectOption(allTasksDiv);
            }

        })

        renameButton.addEventListener("click", (e) => {
            let newTitle = prompt("Enter a new name for this Project:", "Project: "); 
            proj.title = newTitle;
            title.textContent = newTitle;
            e.stopPropagation(); // To make sure the div is not also clicked when button is clicked
            
        })

        projectDiv.addEventListener("click", () => {
            // selectProject(index);
            selectedOption = projectDiv;
            projectDiv.classList.add("sidebar-option-selected");
            selectOption(projectDiv);
        })
        
        if (selectedOption === projectDiv) {
            projectDiv.classList.add("sidebar-option-selected");
        }

        // if (selectedProjectIndex !== null && selectedProjectIndex < projectContainer.children.length) {
        //     const selectedProject = projectContainer.children[selectedProjectIndex];
        //     selectedProject.classList.add("project-selected");
        //     allTasksDiv.classList.remove("project-selected");
        // } else {
        //     allTasksDiv.classList.add("project-selected");
        // }

        projectContainer.appendChild(projectDiv);
}

function selectOption(nextSelectedOption) {
    // when an option / project is clicked, we add to that class sidebar-option, and remove sidebar-option from the previous one.
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