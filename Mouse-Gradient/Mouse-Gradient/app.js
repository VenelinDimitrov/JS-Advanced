function attachGradientEvents() {
    
    let gradient = document.getElementById('gradient');
    gradient.addEventListener('mousemove', showHoverPercentage)
    
    function showHoverPercentage(event) {
        let offset = event.offsetX;
        let gradientSize = event.currentTarget.offsetWidth;
        
        let percentage = Math.floor((offset / gradientSize) * 100);

        document.getElementById('result').textContent = `${Number(percentage)}%`;
    }
}