function addItem() {
    let ulElement = document.getElementById('items');
    let newItemToAdd = document.getElementById('newItemText');
    
    let liElementToAdd = document.createElement('li');
    liElementToAdd.textContent = newItemToAdd.value;
    newItemToAdd.value = '';
    
    ulElement.appendChild(liElementToAdd);
}