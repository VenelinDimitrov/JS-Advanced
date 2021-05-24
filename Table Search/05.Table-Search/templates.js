import { html } from './node_modules/lit-html/lit-html.js';

export const tableRowTemplate = (data, match = '') => html`
<tr class=${match && Object.values(data).some(e => e.toLowerCase().includes(match.toLowerCase())) ? 'select' : ''}>
    <td>${data.firstName} ${data.lastName}</td>
    <td>${data.email}</td>
    <td>${data.course}</td>
</tr>`;