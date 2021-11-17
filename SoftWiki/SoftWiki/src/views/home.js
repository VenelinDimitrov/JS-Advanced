import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSortedArticles } from '../api/data.js';

const homeTemplate = (jsArticles, cSharpArticles, javaArticles, pythonArticles) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>

    <section class="recent js">
        <h2>JavaScript</h2>
        ${jsArticles.length > 0 ? jsArticles.map(articleTemplate) : html`<h3 >No articles yet</h3>`}
    </section>

    <section class="recent csharp">
        <h2>C#</h2>
        ${cSharpArticles.length > 0 ? cSharpArticles.map(articleTemplate) : html`<h3 >No articles yet</h3>`}
        
    </section>
    
    <section class="recent java">
        <h2>Java</h2>
        ${javaArticles.length > 0 ? javaArticles.map(articleTemplate) : html`<h3 >No articles yet</h3>`}
        
    </section>

    <section class="recent python">
        <h2>Python</h2>
        ${pythonArticles.length > 0 ? pythonArticles.map(articleTemplate) : html`<h3 >No articles yet</h3>`}
    </section>
    
</section>`;

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>`;


export async function homePage(ctx) {
    const articles = await getSortedArticles();
    
    const jsArticles = articles.filter(a => a.category == 'JavaScript');
    const cSharpArticles = articles.filter(a => a.category == 'C#');
    const javaArticles = articles.filter(a => a.category == 'Java');
    const pythonArticles = articles.filter(a => a.category == 'Python');

    ctx.render(homeTemplate(jsArticles, cSharpArticles, javaArticles, pythonArticles));
}