import { html } from './node_modules/lit-html/lit-html.js';

const loadBtnAndTableTemplate = (data, view) => html`
<button id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${data ? data.map(b => tableRowTemplate(b)) : ''}
    </tbody>
</table>
<form id="add-form" style="display:${view == 'add' ? 'block' : 'none'}">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>
<form id="edit-form" style="display:${view == 'edit' ? "block" : "none"}">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Save">
</form>
`;

const tableRowTemplate = (data) => html`<tr id=${data._id}>
    <td>${data.title}</td>
    <td>${data.author}</td>
    <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
</tr>`;

export {
    loadBtnAndTableTemplate
}