import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';

const searchTemplate = (onSubmit, articles) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSubmit} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

        ${articles.length > 0 ? articles.map(articleTemplate) : html`<h3 class="no-articles">No matching articles</h3>`}

    </div>
</section>`;

const articleTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;

export async function findArticlesPge(ctx) {
    const allArticles = await getAllArticles();

    ctx.render(searchTemplate(onSubmit, []));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const articleToFind = formData.get('search').toLowerCase();

        const result = allArticles.filter(a => a.title.toLowerCase() == articleToFind);

        ctx.render(searchTemplate(onSubmit, result));
    }
}