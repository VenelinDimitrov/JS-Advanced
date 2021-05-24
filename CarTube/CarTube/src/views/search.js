import { html } from '../../node_modules/lit-html/lit-html.js';
import { listingTemplate } from './common/listing.js';
import { getListingsByYear } from '../api/data.js';

const searchTemplate = (findListings, listings = []) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="searchedYear" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${findListings} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${listings.length > 0 ? listings.map(listingTemplate) : html`<p class="no-cars"> No results.</p>`}

    </div>
</section>`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate(findListings));

    async function findListings() {
        const year = document.getElementById('searchedYear').value;
        document.getElementById('searchedYear').value = '';
        const listings = await getListingsByYear(year);

        ctx.render(searchTemplate(findListings, listings));
    }
}

