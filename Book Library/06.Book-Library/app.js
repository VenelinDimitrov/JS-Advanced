import { render } from './node_modules/lit-html/lit-html.js';
import { loadBtnAndTableTemplate } from './templates.js';
import { createBook, loadBooks, editBook, deleteBook } from './data.js';

let currentView;

function displayHomeScreen(data, currentView = 'add') {
    const table = loadBtnAndTableTemplate(data, currentView);
    render(table, document.body);
}

displayHomeScreen();

const loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', () => onLoadBtnClick(currentView));

async function onLoadBtnClick(currentView) {
    let books = Object.entries(await loadBooks()).map(([k, v]) => Object.assign(v, { _id: k }));

    displayHomeScreen(Object.values(books), currentView);
}

const addForm = document.getElementById('add-form');
addForm.addEventListener('submit', (ev) => {
    createBook(ev);
    onLoadBtnClick('add');
});

document.querySelector('table').addEventListener('click', (e) => {
    if (e.target.classList.contains('editBtn')) {
        const id = e.target.parentNode.parentNode.id;
        onLoadBtnClick('edit');
        const editForm = document.getElementById('edit-form');

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const author = formData.get('author');
            const title = formData.get('title');

            if (author != '' && title != '') {
                const book = {
                    author,
                    title
                };

                editBook(book, id);
                onLoadBtnClick('add');
                
                e.target.reset();
            }
        });

    } else if (e.target.classList.contains('deleteBtn')) {
        const id = e.target.parentNode.parentNode.id;

        deleteBook(id);
        onLoadBtnClick('add');
    }
});