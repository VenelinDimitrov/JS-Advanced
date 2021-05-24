import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {logout} from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

import { homePage } from './views/homepage.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/mypage.js';
import { registerPage } from './views/regster.js';

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

setUserNav();
page.start();

function extendContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
    ctx.setUserNav = setUserNav;
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
    console.log(email);
    if (email) {
        document.querySelector('.profile span').textContent = `Welcome, ${email}`;
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function logoutUser() {
    await logout();

    setUserNav();
    page.redirect('/');
}