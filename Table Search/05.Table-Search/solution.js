import {render} from './node_modules/lit-html/lit-html.js';
import {tableRowTemplate} from './templates.js';

async function loadStundents(match = '') {
   const tableBody = document.querySelector('tbody');
   const resposne = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await resposne.json();
   console.log(Object.values(data).some(e => Object.values(e).map(e => e.toLowerCase()).includes('john')));
   const students = Object.values(data).map(e => tableRowTemplate(e, match));
   render(students, tableBody);
}

loadStundents();

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchInTable);

function searchInTable() {
   const inputToFind = document.getElementById('searchField').value;
   document.getElementById('searchField').value = '';

   loadStundents(inputToFind);
}