import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMemeById, delMeme } from '../api/data.js';

const detailsTemplate = (meme, isOwner, deleteMeme) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            ${isOwner ? html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${deleteMeme} class="button danger">Delete</button>`
             : ''}

        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const meme = await getMemeById(ctx.params.id);
    const currentUserId = sessionStorage.getItem('userId');

    if (currentUserId == meme._ownerId) {
        ctx.render(detailsTemplate(meme, true, deleteMeme));
    } else {
        ctx.render(detailsTemplate(meme, false));
    }

    
    async function deleteMeme() {
        const confirmed = confirm('Are you sure you want to delete this meme?');

        if (confirmed) {
            await delMeme(meme._id);
            ctx.page.redirect('/catalog');
        }
    } 
}
