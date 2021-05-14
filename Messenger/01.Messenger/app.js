function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    const messageArea = document.getElementById('messages');
    const sendBtn = document.getElementById('submit');

    sendBtn.addEventListener('click', sendMessage);

    refreshBtn.addEventListener('click', loadMessages);

    async function loadMessages() {
        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();
    
        const messages = Object.values(data).map(m => `${m.author}: ${m.content}`);
        messageArea.textContent = messages.join('\n');
    }

    async function sendMessage() {
        const author = document.querySelector('[name=author]').value;
        const messageContent = document.querySelector('[name=content]').value;

        const response = await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author, content: messageContent})
        });

        if (response.ok) {
            document.querySelector('[name=author]').value = '';
            document.querySelector('[name=content]').value = '';
            loadMessages();
        } else {
            throw new Error(response.json());
        }
    }
}

attachEvents();