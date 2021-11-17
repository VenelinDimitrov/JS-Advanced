import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticleById, deleteArticle } from '../api/data.js';

const detailsTemplate = (article, isOwner, delArticle) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">

            ${isOwner ? html`<a @click=${delArticle} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>` : ''}
            
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const article = await getArticleById(ctx.params.id);
    const currentUser = sessionStorage.getItem('userId');
    const isOwner = currentUser == article._ownerId;

    ctx.render(detailsTemplate(article, isOwner, delArticle));

    async function delArticle() {
        const confirmed = confirm('Are you sure you want to delete this article?');

        if (confirmed) {
            await deleteArticle(article._id);

            ctx.page.redirect('/');
        }
    }
}