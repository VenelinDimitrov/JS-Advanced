import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes } from '../api/data.js';


const myPageTemplate = (memes, username, userEmail, userGender) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userGender}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${userEmail}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

    ${memes.length > 0 ? memes.map(memeTemplate) : html`<p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>`;

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function myPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const userEmail = sessionStorage.getItem('email');
    const userGender = sessionStorage.getItem('gender');

    const memes = await getMyMemes(userId);

    ctx.render(myPageTemplate(memes, username, userEmail, userGender))
}