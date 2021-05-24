function solve() {
    let [movieName, hallName, ticketPrice, onScreenBtn] = Array.from(document.getElementById('container').children);
    let onScreenSection = document.querySelector('#movies ul');
    let archivedSection = document.querySelector('#archive ul');
    let clearBtn = document.querySelector('#archive button');

    onScreenBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (movieName.value === '' || hallName.value === '' || ticketPrice.value === '' || isNaN(ticketPrice.value)){
            return;
        }
        
        let liEl = document.createElement('li');

        let span = document.createElement('span');
        span.textContent = movieName.value;

        let hallStrong = document.createElement('strong');
        hallStrong.textContent = `Hall: ${hallName.value}`;

        let divEl = document.createElement('div');
    
        let priceStrong = document.createElement('strong');
        let price = ticketPrice.value.toString();
        priceStrong.textContent = `${parseFloat(price).toFixed(2)}`;

        movieName.value = '';
        hallName.value = '';
        ticketPrice.value = '';

        let input = document.createElement('input');
        input.setAttribute('placeholder', 'Tickets Sold');

        let archiveBtn = document.createElement('button');
        archiveBtn.textContent = 'Archive';

        divEl.appendChild(priceStrong);
        divEl.appendChild(input);
        divEl.appendChild(archiveBtn);

        liEl.appendChild(span);
        liEl.appendChild(hallStrong);
        liEl.appendChild(divEl);

        onScreenSection.appendChild(liEl);

        archiveBtn.addEventListener('click', () => {

            if (input.value === '' || isNaN(input.value)) {
                return;
            }
    
            liEl.remove();
    
            let newLiElement = document.createElement('li');
    
            let totalPrice = document.createElement('strong');

            let totalAmount = Number(priceStrong.textContent) * Number(input.value)
            
            totalPrice.textContent =  `Total amount: ${parseFloat(totalAmount).toFixed(2)}`;
    
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
    
            newLiElement.appendChild(span);
            newLiElement.appendChild(totalPrice);
            newLiElement.appendChild(deleteBtn);
    
            archivedSection.appendChild(newLiElement);

            deleteBtn.addEventListener('click', () => {
                newLiElement.remove();
            });
        });
    });

    clearBtn.addEventListener('click', () => {
        let movieList = archivedSection;

        while(movieList.hasChildNodes) {
            movieList.removeChild(movieList.firstChild);
        }
    });
}