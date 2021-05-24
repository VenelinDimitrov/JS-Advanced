import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyListings } from '../api/data.js';
import {listingTemplate} from './common/listing.js';

const myPageTemplate = (listings) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${listings.length > 0 ? listings.map(listingTemplate) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}

    </div>
</section>`;

export async function myPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const listings = await getMyListings(userId);

    ctx.render(myPageTemplate(listings));
}