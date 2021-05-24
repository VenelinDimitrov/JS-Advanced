import {cats} from './catSeeder.js';
import { createTemplate} from './createListTemplate.js';
import {render} from './node_modules/lit-html/lit-html.js';

function solve() {
    const section = document.getElementById('allCats');
    const ulEl = document.createElement('ul');

    let listArray = cats.map(createTemplate);
    render(listArray, ulEl);
    section.appendChild(ulEl);

    section.addEventListener('click', onClick);
}

solve();

function onClick(e) {
    if (e.target.classList.contains('showBtn')) {
        const parent = e.target.parentNode;
        let currentStatus = parent.querySelector('.status').style.display;

        if (currentStatus == 'block'){
            parent.querySelector('.status').style.display = 'none';
        } else {
            parent.querySelector('.status').style.display = 'block';
        }
    }
}