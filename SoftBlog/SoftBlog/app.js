function solve() {
   let creatorInput = document.getElementById('creator');
   let titleInput = document.getElementById('title');
   let categoryInput = document.getElementById('category');
   let contentInput = document.getElementById('content');
   let createBtn = document.getElementsByClassName('btn create')[0];
   let posts = document.querySelector('.site-content section');
   let archiveSection = document.querySelector('.archive-section ol');

   createBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let article = document.createElement('article');

      let articleHeader = document.createElement('h1');
      articleHeader.textContent = titleInput.value;

      let categoryParagraph = document.createElement('p');
      categoryParagraph.innerHTML = `Category: <strong>${categoryInput.value}</strong>`;

      let creatorParagraph = document.createElement('p');
      creatorParagraph.innerHTML = `Creator: <strong>${creatorInput.value}</strong>`;

      let contentParagraph = document.createElement('p');
      contentParagraph.textContent = contentInput.value;

      let buttonDiv = document.createElement('div');
      buttonDiv.className = 'buttons';

      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'btn delete';

      let archiveBtn = document.createElement('button');
      archiveBtn.textContent = 'Archive';
      archiveBtn.className = 'btn archive';

      titleInput.value = '';
      categoryInput.value = '';
      creatorInput.value = '';
      contentInput.value = '';

      buttonDiv.appendChild(deleteBtn);
      buttonDiv.appendChild(archiveBtn);

      article.appendChild(articleHeader);
      article.appendChild(categoryParagraph);
      article.appendChild(creatorParagraph);
      article.appendChild(contentParagraph);
      article.appendChild(buttonDiv);

      posts.appendChild(article);

      archiveBtn.addEventListener('click', () => {
         let title = articleHeader.textContent;
         let archivedLiEl = document.createElement('li');
         archivedLiEl.textContent = title;
         
         article.remove();

         archiveSection.appendChild(archivedLiEl);

         Array.from(archiveSection.children).sort((a,b) => a.textContent.localeCompare(b.textContent)).forEach(li => archiveSection.appendChild(li));
      });

      deleteBtn.addEventListener('click', () => {
         article.remove();
      })
   });
}
