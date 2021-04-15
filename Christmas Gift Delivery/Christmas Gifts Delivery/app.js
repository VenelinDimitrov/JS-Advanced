function solution() {
    let inputDiv = Array.from(document.querySelectorAll('.card div'))[0];
    let inputField = (inputDiv.children)[0];
    let addButton = (inputDiv.children)[1];

    let listOfGifts = Array.from(document.querySelectorAll('.card ul'))[0];

    let listOfSentGifts = Array.from(document.querySelectorAll('.card ul'))[1];

    let listOfDiscartedGifts = Array.from(document.querySelectorAll('.card ul'))[2];

    let giftsArray = [];
    addButton.addEventListener('click', () => {
        let giftName = inputField.value;

        let newLiElement = document.createElement('li');
        newLiElement.textContent = giftName;
        newLiElement.classList.add('gift');

        let sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.setAttribute('id', 'sendButton');
        sendButton.addEventListener('click', addItemToSentList);

        let discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.setAttribute('id', 'discardButton');
        discardButton.addEventListener('click', addItemToDiscardList);

        newLiElement.appendChild(sendButton);
        newLiElement.appendChild(discardButton);

        inputField.value = '';

        giftsArray.push(newLiElement);

        giftsArray.sort((a,b) =>
        a.textContent.localeCompare(b.textContent))
        .map(li => listOfGifts.appendChild(li));

    });

    function addItemToSentList(e) {
        let giftElement = e.target.parentNode;
        let elementIndex = giftsArray.findIndex(el => el.textContent === giftElement.textContent);
    
        for (const el of Array.from(giftElement.children)) {
            el.remove();
        }

        giftsArray.splice(elementIndex, 1);
        listOfSentGifts.appendChild(giftElement);
    }

    function addItemToDiscardList(e) {
        let giftElement = e.target.parentNode;
        let elementIndex = giftsArray.findIndex(el => el.textContent === giftElement.textContent);
    
        for (const el of Array.from(giftElement.children)) {
            el.remove();
        }

        giftsArray.splice(elementIndex, 1);
        listOfDiscartedGifts.appendChild(giftElement)
    }
}