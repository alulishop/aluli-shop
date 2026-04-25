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

// --- LÓGICA DE BÚSQUEDA Y FILTRADO COMBINADO ---

const inputBuscador = document.getElementById('buscador');
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const productos = document.querySelectorAll('.producto-card');

// Función principal que decide qué mostrar
function filtrarTodo() {
    const textoUsuario = inputBuscador.value.toLowerCase();
    const categoriaActiva = document.querySelector('.btn-filtro.activo').getAttribute('data-categoria');

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('.producto-nombre').innerText.toLowerCase();
        const categoriaProducto = producto.querySelector('.producto-categoria').innerText.toLowerCase();

        // Verificamos si el producto coincide con el texto escrito
        const coincideTexto = nombreProducto.includes(textoUsuario);
        
        // Verificamos si el producto coincide con la categoría seleccionada
        const coincideCategoria = (categoriaActiva === 'todos' || categoriaProducto === categoriaActiva);

        // Si cumple AMBAS condiciones, se muestra
        if (coincideTexto && coincideCategoria) {
            producto.style.display = "block";
            // Forzamos la opacidad para que no choque con la animación de entrada
            producto.classList.add('visible'); 
        } else {
            producto.style.display = "none";
        }
    });
}

// Escuchar cuando el usuario escribe
inputBuscador.addEventListener('input', filtrarTodo);

// Escuchar cuando el usuario hace clic en un botón de categoría
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Cambiar la clase activa visualmente
        document.querySelector('.btn-filtro.activo').classList.remove('activo');
        boton.classList.add('activo');
        
        // Ejecutar el filtrado
        filtrarTodo();
    });
});

let carrito = [];
const numeroWhatsApp = "+584145074414"; // PON TU NÚMERO AQUÍ

// 1. Abrir/Cerrar Carrito
function toggleCarrito() {
    document.getElementById('carrito-sidebar').classList.toggle('activo');
}

// 2. Agregar al Carrito (Debes actualizar tus botones de "Ver Detalles" o crear nuevos)
// Ejemplo de uso: <button onclick="agregarAlCarrito('Paleta Galaxia', 25.00)">Agregar</button>
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarritoUI();
    // Abrir el carrito automáticamente para mostrar el feedback
    if(!document.getElementById('carrito-sidebar').classList.contains('activo')){
        toggleCarrito();
    }
}

// 3. Actualizar la Interfaz
function actualizarCarritoUI() {
    const contenedor = document.getElementById('items-carrito');
    const contador = document.getElementById('contador-carrito');
    const totalTxt = document.getElementById('precio-total');
    
    contenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            contenedor.innerHTML += `
                <div class="item-carrito">
                    <div>
                        <h4>${item.nombre}</h4>
                        <p>$${item.precio.toFixed(2)}</p>
                    </div>
                    <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;">Eliminar</button>
                </div>
            `;
        });
    }

    contador.innerText = carrito.length;
    totalTxt.innerText = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

// 4. Enviar a WhatsApp
function enviarWhatsApp() {
    if (carrito.length === 0) return alert("¡El carrito está vacío!");

    let mensaje = "¡Hola Aluli Shop! 👋 Quisiera realizar el siguiente pedido:\n\n";
    let total = 0;

    carrito.forEach((item, index) => {
        mensaje += `• ${item.nombre} - $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\n*Total a pagar: $${total.toFixed(2)}*`;
    mensaje += "\n\nQuedo atento para coordinar el pago y la entrega. Gracias.";

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function actualizarCarritoUI() {
    const contenedor = document.getElementById('items-carrito');
    const contador = document.getElementById('contador-carrito');
    const totalTxt = document.getElementById('precio-total'); // El de PC
    const totalMovilTxt = document.getElementById('total-movil'); // El de Celular
    
    contenedor.innerHTML = '';
    let total = 0;

    // ... (Tu lógica de recorrer el carrito que ya tenías) ...
    carrito.forEach((item, index) => {
        total += item.precio;
        // ... render de items ...
    });

    // Actualizamos ambos montos
    if(totalTxt) totalTxt.innerText = `$${total.toFixed(2)}`;
    if(totalMovilTxt) totalMovilTxt.innerText = `$${total.toFixed(2)}`;
    
    contador.innerText = carrito.length;
    localStorage.setItem('carritoAluli', JSON.stringify(carrito));
}