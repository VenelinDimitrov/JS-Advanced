async function getInfo() {
    const input = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busList = document.getElementById('buses');

    try {
        busList.innerHTML = '';
        
        const url = 'http://localhost:3030/jsonstore/bus/businfo/' + input.value;
        
        const response = await fetch(url);
        const data = await response.json();
        
        stopName.textContent = data.name;
        
        Object.entries(data.buses).map(bus => {
            const liEl = document.createElement('li');
            
            liEl.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busList.appendChild(liEl);
        });
        input.value = '';
    } catch (error) {
        stopName.textContent = 'Error';
    }
}