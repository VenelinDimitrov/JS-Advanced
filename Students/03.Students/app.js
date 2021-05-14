onSubmit()
loadStudents();

function onSubmit() {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const facultyNumber = formData.get('facultyNumber');
        const grade = formData.get('grade');

        if (firstName != '' && lastName != '' && facultyNumber != '' && grade != '' && typeof Number(grade) == 'number') {
            const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, facultyNumber, grade: Number(grade) })
            });

            if (response.ok) {
                form.reset();
                loadStudents();
            } else {
                throw new Error(response.json());
            }
        } else if (typeof Number(grade) != 'number') {
            alert('Grade must be a number!');
        } else {
            alert('All fields are mandatory!');
        }
    });
}

async function loadStudents() {
    const table = document.querySelector('#results tbody');
    table.innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    Object.values(data).forEach(s => {
        let row = document.createElement('tr');

        let firstNameField = document.createElement('td');
        firstNameField.textContent = s.firstName;

        let lastNameField = document.createElement('td');
        lastNameField.textContent = s.lastName;

        let facultyNumberField = document.createElement('td');
        facultyNumberField.textContent = s.facultyNumber;

        let gradeField = document.createElement('td');
        gradeField.textContent = `${s.grade.toFixed(2)}`;

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Student';
        removeBtn.setAttribute('id', 'removeBtn');

        removeBtn.addEventListener('click', ()=>removeStudent(s._id));

        row.appendChild(firstNameField);
        row.appendChild(lastNameField);
        row.appendChild(facultyNumberField);
        row.appendChild(gradeField);
        row.appendChild(removeBtn);

        table.appendChild(row);
    });
}

async function removeStudent(id) {
    confirm('Are you sure you want to remove this stident?');

    if (confirm) {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students/' + id, {
            method: 'delete'
        });

        if (response.ok) {
            loadStudents();
        } else {
            throw new Error(response.json());
        }

    }
}