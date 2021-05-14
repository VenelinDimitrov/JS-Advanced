function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', loadPhonebook);
    createBtn.addEventListener('click', createContact);

}

attachEvents();

async function loadPhonebook() {
    const phonebook = document.getElementById('phonebook');
    phonebook.innerHTML = '';
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();
    
    Object.values(data).forEach(c => {
        let liEl = document.createElement('li');
        liEl.textContent = `${c.person}:${c.phone} `;

        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';

        liEl.appendChild(delBtn);
        phonebook.appendChild(liEl);

        delBtn.addEventListener('click',() => deleteContact(c._id));
    });
}

async function createContact() {
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({person, phone})
    });

    if (response.ok) {
        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
        loadPhonebook();
    } else {
        throw new Error(response.json());
    }
}

async function deleteContact(id) {
    confirm('Are you sure you want to delete this contact?');

    if(confirm) {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        });

        if(response.ok) {
            loadPhonebook();
        } else {
            throw new Error(response.json());
        }
    }
}