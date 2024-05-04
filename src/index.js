import "./style.css";

console.log("Index.js ios working")

const container = document.getElementById("container");
const pEleemnt = document.createElement("p");
pEleemnt.textContent = "TEST TEST TEST CONTETNT IONSIDE OF CONTAINER DIV";
container.appendChild(pEleemnt);