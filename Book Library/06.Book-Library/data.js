const source = 'http://localhost:3030/jsonstore/collections/books'

async function createBook(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);

    const author = formData.get('author');
    const title = formData.get('title');

    if (author != '' && title != '') {
        const book = {
            author,
            title
        };

        const response = await fetch(source, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        if (response.ok) {
            ev.target.reset();
            loadBooks();
        }
    }

}

async function loadBooks() {
    const response = await fetch(source);
    const data = await response.json();
    return data;
};

async function editBook(book, id) {
    const response = await fetch(source + '/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });

}

async function deleteBook(id) {
    const response = await fetch(source + '/' + id, {
        method: 'delete'
    });
}

export {
    createBook,
    loadBooks,
    editBook,
    deleteBook
}