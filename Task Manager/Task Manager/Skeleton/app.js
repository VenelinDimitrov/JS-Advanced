function solve() {
    let taskNameInput = document.getElementById('task');
    let taskDescriptionInput = document.getElementById('description');
    let taskDateInput = document.getElementById('date');
    let addButton = document.getElementById('add');
    let sections = Array.from(document.querySelectorAll('.wrapper section'));
    

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!taskNameInput.value || !taskDescriptionInput.value || !taskDateInput.value) {
            return;
        }

        let openSection = sections[1].lastElementChild;

        let articleElement = document.createElement('article');

        let nameHeader = document.createElement('h3');
        nameHeader.textContent = taskNameInput.value;

        let descrParagraph = document.createElement('p');
        descrParagraph.textContent = 'Description: ' + taskDescriptionInput.value;

        let dateParagraph = document.createElement('p');
        dateParagraph.textContent = 'Due Date: ' + taskDateInput.value;

        let divElement = document.createElement('div');
        divElement.classList.add('flex');

        let startBtn = document.createElement('button');
        startBtn.textContent = 'Start';
        startBtn.classList.add('green');

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('red');

        divElement.appendChild(startBtn);
        divElement.appendChild(deleteBtn);

        articleElement.appendChild(nameHeader);
        articleElement.appendChild(descrParagraph);
        articleElement.appendChild(dateParagraph);
        articleElement.appendChild(divElement);

        openSection.appendChild(articleElement);

        startBtn.addEventListener('click', moveInProgress);
        deleteBtn.addEventListener('click', deleteArticle);
    });

    function moveInProgress(e) {
        let divEl = e.target.parentNode;
        let articleElement = divEl.parentNode;
        let inProgressSection = document.getElementById('in-progress');

        for (const child of Array.from(divEl.children)) {
            child.remove(); 
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('red');

        let finishBtn = document.createElement('button');
        finishBtn.textContent = 'Finish';
        finishBtn.classList.add('orange');

        divEl.appendChild(deleteBtn);
        divEl.appendChild(finishBtn);

        articleElement.appendChild(divEl);

        inProgressSection.appendChild(articleElement);

        finishBtn.addEventListener('click', completeTask);
        deleteBtn.addEventListener('click', deleteArticle);
    }

    function completeTask(e) {
        let divEl = e.target.parentNode;
        let article = divEl.parentNode;

        let competedSection = sections[3].lastElementChild;

        divEl.remove();

        competedSection.appendChild(article);
    }

    function deleteArticle(e) {
        let article = e.target.parentNode.parentNode;
        article.remove();
    }
}