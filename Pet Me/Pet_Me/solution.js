function solve() {
    let inputs = Array.from(document.getElementById('container').children);
    let adoptionList = document.querySelector('#adoption ul');
    let adoptedList = document.querySelector('#adopted ul');
    let addButton = inputs[4];

    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        let petName = inputs[0].value;
        let petAge = inputs[1].value;
        let petKind = inputs[2].value;
        let currentOwner = inputs[3].value;


        if (petName == '' || petAge == '' || isNaN(petAge) || petKind == '' || currentOwner == '') {
            return;
        }

        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
        inputs[3].value = '';

        let liElement = document.createElement('li');

        let paragraph = document.createElement('p');

        paragraph.innerHTML = `<strong>${petName}</strong> is a <strong>${petAge}</strong> year old <strong>${petKind}</strong>`

        let spanEl = document.createElement('span');
        spanEl.textContent = `Owner: ${currentOwner}`;

        let contactButton = document.createElement('button');
        contactButton.textContent = 'Contact with owner';

        liElement.appendChild(paragraph);
        liElement.appendChild(spanEl);
        liElement.appendChild(contactButton);

        adoptionList.appendChild(liElement);

        contactButton.addEventListener('click', () => contactOwner(contactButton, liElement, paragraph));
    });

    function contactOwner(contactButton, liElement, paragraph) {
        contactButton.remove();

        let divEl = document.createElement('div');

        let inputField = document.createElement('input');
        inputField.setAttribute('placeholder', 'Enter your names');

        let takeItBtn = document.createElement('button');
        takeItBtn.textContent = 'Yes! I take it!';

        divEl.appendChild(inputField);
        divEl.appendChild(takeItBtn);

        liElement.appendChild(divEl);

        takeItBtn.addEventListener('click', () => {
        
            if (inputField.value == '') {
                return;
            }

            liElement.remove();

            let adoptedAnimalList = document.createElement('li');

            adoptedAnimalList.appendChild(paragraph);

            let newOwnerSpan = document.createElement('span');
            newOwnerSpan.textContent = `New Owner: ${inputField.value}`;

            let checkedButton = document.createElement('button');
            checkedButton.textContent = 'Checked';

            adoptedAnimalList.appendChild(newOwnerSpan);
            adoptedAnimalList.appendChild(checkedButton);

            adoptedList.appendChild(adoptedAnimalList);

            checkedButton.addEventListener('click', () => {
                adoptedAnimalList.remove();
            })
        });
    };
}

