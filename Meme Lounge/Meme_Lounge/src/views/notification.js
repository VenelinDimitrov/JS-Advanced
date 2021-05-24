import {html} from '../../node_modules/lit-html/lit-html.js';

export const notify = (errMsg) => {
    let notificatin = document.querySelector('.notification');
    let notificationMessage = document.querySelector('.notification span').textContent = errMsg;
    notificatin.style.display = 'block';

    setTimeout(() => {
        notificatin.style.display = 'none';
    }, 3000)
};