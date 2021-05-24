import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllListings } from '../api/data.js';
import {listingTemplate} from './common/listing.js';

const catalogTemplate = (listings) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

    ${listings.length > 0 ? listings.map(listingTemplate) : html`<p class="no-cars">No cars in database.</p>`}
        
    </div>
</section>`;

export async function catalogPage(ctx) {
    const listings = await getAllListings();

    ctx.render(catalogTemplate(listings));
}