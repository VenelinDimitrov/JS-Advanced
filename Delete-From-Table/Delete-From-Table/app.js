function deleteByEmail() {
    let emailInput = document.getElementsByName('email')[0].value;
    let emailList = document.querySelectorAll('tbody tr td:nth-of-type(2)');
    let resultField = document.getElementById('result');
    resultField.textContent = 'Not found.';

    for (let el of emailList) {
        if (el.textContent == emailInput) {
            el.parentNode.remove();
            resultField.textContent = 'Deleted.';
        }
    }
}