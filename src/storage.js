import { getProjects } from './projects.js';
import { updateProjects } from './sidebar.js';


let projects; // mutable declaration

export function saveProjects() {
    let projects = getProjects();
    localStorage.clear();
    projects.forEach((project, index) => {
        localStorage.setItem(`project_${index}`, JSON.stringify(project));
    });
}

export function loadProjects() {
    projects = getProjects();
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("project_")) {
            const project = JSON.parse(localStorage.getItem(key));
            projects.push(project);


            let index = project.length - 1;
            updateProjects(project, index);
        }
    }

    
}

