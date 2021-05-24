import { html } from './node_modules/lit-html/lit-html.js';

export function createTemplate(cat) {
    const imgAddress = `./images/${cat.imageLocation}.jpg`;

    let template  = html`
<li>
    <img src=${imgAddress} width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="200">
            <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
            <p class="card-text">${cat.statusMessage}</p>
        </div>
    </div>
</li>
`;

return template;
}

