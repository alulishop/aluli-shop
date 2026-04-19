window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

const opciones = {
    threshold: 0.15 
};

const alEntrarEnVista = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(alEntrarEnVista, opciones);

document.querySelectorAll('.oculto').forEach(elemento => {
    observer.observe(elemento);
});