import { html } from '../../node_modules/lit-html/lit-html.js';
import { getListingById, delListing } from '../api/data.js';

const detailsTemplate = (listing, isOwner, del) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listing.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listing.brand}</li>
            <li><span>Model:</span>${listing.model}</li>
            <li><span>Year:</span>${listing.year}</li>
            <li><span>Price:</span>${listing.price}$</li>
        </ul>

        <p class="description-para">${listing.description}</p>

        ${isOwner ? html`
        <div class="listings-buttons">
            <a href="/edit/${listing._id}" class="button-list">Edit</a>
            <a @click=${del} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : ''}
        
    </div>
</section>`;

export async function detailsPage(ctx) {
    const listing = await getListingById(ctx.params.id);
    const currentUser = sessionStorage.getItem('userId');
    const isOwner = currentUser == listing._ownerId

    ctx.render(detailsTemplate(listing, isOwner, del));

    async function del() {
        const confirmed = confirm('Are you sure you want to delete this listing?');

        if (confirmed) {
            await delListing(listing._id);
            ctx.page.redirect('/catalog');
        }
    }
}