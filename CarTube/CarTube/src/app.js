import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {logout} from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/myPage.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logoutUser);

page('/', extendContext, homePage);
page('/login', extendContext, loginPage);
page('/register', extendContext, registerPage);
page('/catalog', extendContext, catalogPage);
page('/create', extendContext, createPage);
page('/details/:id', extendContext, detailsPage);
page('/edit/:id', extendContext, editPage);
page('/my-page', extendContext, myPage);
page('/search', extendContext, searchPage);

setUserNav();
page.start();

function extendContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');

    if (username) {
        document.getElementById('welcome').textContent = `Welcome ${username}`;
        [...document.querySelectorAll('nav #profile')].map(a => a.style.display = 'block');
        [...document.querySelectorAll('nav #guest')].map(a => a.style.display = 'none');

    } else {
        [...document.querySelectorAll('nav #guest')].map(a => a.style.display = 'block');
        [...document.querySelectorAll('nav #profile')].map(a => a.style.display = 'none');
    }
}

async function logoutUser() {
    await logout();

    setUserNav();

    page.redirect('/');
}