// ================================
// LIGHTBOX GALERÍA
// ================================

const imagenesGaleria = document.querySelectorAll(".contenedor-galeria img");
const lightbox = document.getElementById("lightbox");
const imagenLightbox = document.getElementById("imagen-lightbox");
const cerrar = document.querySelector(".cerrar");

imagenesGaleria.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        imagenLightbox.src = img.src;

    });

});

cerrar.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});


// ================================
// SLIDER DE CLIENTES
// ================================

const slider = document.querySelector(".slider");
const contenedorSlider = document.querySelector(".contenedor-slider");
const fotosClientes = document.querySelectorAll(".slider img");

const botonAnterior = document.querySelector(".prev");
const botonSiguiente = document.querySelector(".next");

const indicadores = document.querySelectorAll(".indicadores span");

let indiceActual = 0;
let intervaloSlider;


// ================================
// ACTUALIZAR SLIDER
// ================================

function actualizarSlider() {

    if (!slider || !contenedorSlider || fotosClientes.length === 0) {
        return;
    }

    const ancho = contenedorSlider.clientWidth;

    slider.style.transform =
        `translateX(-${indiceActual * ancho}px)`;


    indicadores.forEach((indicador, indice) => {

        indicador.classList.toggle(
            "activo",
            indice === indiceActual
        );

    });

}


// ================================
// SIGUIENTE
// ================================

function siguienteFoto() {

    indiceActual++;

    if (indiceActual >= fotosClientes.length) {
        indiceActual = 0;
    }

    actualizarSlider();

}


// ================================
// ANTERIOR
// ================================

function anteriorFoto() {

    indiceActual--;

    if (indiceActual < 0) {
        indiceActual = fotosClientes.length - 1;
    }

    actualizarSlider();

}


// ================================
// BOTÓN SIGUIENTE
// ================================

botonSiguiente.addEventListener("click", () => {

    siguienteFoto();
    reiniciarAutomatico();

});


// ================================
// BOTÓN ANTERIOR
// ================================

botonAnterior.addEventListener("click", () => {

    anteriorFoto();
    reiniciarAutomatico();

});


// ================================
// INDICADORES
// ================================

indicadores.forEach((indicador, indice) => {

    indicador.addEventListener("click", () => {

        indiceActual = indice;

        actualizarSlider();
        reiniciarAutomatico();

    });

});


// ================================
// CAMBIO AUTOMÁTICO
// ================================

function iniciarAutomatico() {

    intervaloSlider = setInterval(() => {

        siguienteFoto();

    }, 4000);

}


function reiniciarAutomatico() {

    clearInterval(intervaloSlider);

    iniciarAutomatico();

}


// ================================
// DESLIZAR CON EL DEDO
// ================================

let posicionInicio = 0;
let posicionFinal = 0;


slider.addEventListener("touchstart", (e) => {

    posicionInicio = e.touches[0].clientX;

}, { passive: true });


slider.addEventListener("touchend", (e) => {

    posicionFinal = e.changedTouches[0].clientX;

    const diferencia = posicionInicio - posicionFinal;


    if (Math.abs(diferencia) > 50) {

        if (diferencia > 0) {

            siguienteFoto();

        } else {

            anteriorFoto();

        }

        reiniciarAutomatico();

    }

}, { passive: true });


// ================================
// LIGHTBOX PARA FOTOS DE CLIENTES
// ================================

fotosClientes.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        imagenLightbox.src = img.src;

    });

});


// ================================
// INICIAR
// ================================

actualizarSlider();

iniciarAutomatico();


// ================================
// AJUSTAR AL CAMBIAR TAMAÑO
// ================================

window.addEventListener("resize", () => {

    actualizarSlider();

});

// ================================
// MODAL DEL CEVICHE
// ================================

const botonCeviche = document.querySelector(".boton-plato");
const modalCeviche = document.getElementById("modal-ceviche");
const cerrarModalCeviche = document.querySelector(".cerrar-modal-plato");


// ABRIR MODAL

if (botonCeviche && modalCeviche) {

    botonCeviche.addEventListener("click", () => {

        modalCeviche.style.display = "flex";

    });

}


// CERRAR MODAL

if (cerrarModalCeviche && modalCeviche) {

    cerrarModalCeviche.addEventListener("click", () => {

        modalCeviche.style.display = "none";

    });

}


// CERRAR AL TOCAR FUERA DE LA VENTANA

if (modalCeviche) {

    modalCeviche.addEventListener("click", (e) => {

        if (e.target === modalCeviche) {

            modalCeviche.style.display = "none";

        }

    });

}

// ================================
// SELECCIONAR PRECIO DEL CEVICHE
// ================================

const preciosCeviche =
    document.querySelectorAll(".precio-ceviche");

let precioCevicheSeleccionado = null;


preciosCeviche.forEach(boton => {

    boton.addEventListener("click", () => {

        // Quitar selección anterior
        preciosCeviche.forEach(btn => {
            btn.classList.remove("seleccionado");
        });

        // Seleccionar este precio
        boton.classList.add("seleccionado");

        precioCevicheSeleccionado =
            Number(boton.dataset.precio);

    });

});


// ================================
// AGREGAR CEVICHE AL PEDIDO
// ================================

const botonAgregarCeviche =
    document.getElementById("agregar-ceviche");


if (botonAgregarCeviche) {

    botonAgregarCeviche.addEventListener("click", () => {

        // Comprobar que eligió un precio
        if (precioCevicheSeleccionado === null) {

            alert("Por favor, selecciona una opción de precio.");

            return;

        }


        // Obtener carrito
        let carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];


        // Agregar producto
        carrito.push({

            nombre: "Ceviche Mixto del Carmen",

            precio: precioCevicheSeleccionado,

            cantidad: 1

        });


        // Guardar carrito
        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador
        actualizarContadorPedido();


        // Cerrar modal
        modalCeviche.style.display = "none";


        // Limpiar selección
        preciosCeviche.forEach(btn => {
            btn.classList.remove("seleccionado");
        });

        precioCevicheSeleccionado = null;

    });

}


// ================================
// ACTUALIZAR CONTADOR DEL PEDIDO
// ================================

function actualizarContadorPedido() {

    const carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];

    const contador =
    document.getElementById("contador-carrito");

    if (contador) {

        contador.textContent = carrito.length;

    }

}

actualizarContadorPedido();

// ================================
// MODAL CHICHARRÓN DE CALAMAR
// ================================

const botonChicharron = document.querySelector(".boton-chicharron");
const modalChicharron = document.getElementById("modal-chicharron-calamar");
const cerrarModalChicharron = document.querySelector(".cerrar-modal-chicharron");


// ABRIR MODAL

if (botonChicharron && modalChicharron) {

    botonChicharron.addEventListener("click", () => {

        modalChicharron.style.display = "flex";

    });

}


// CERRAR CON LA X

if (cerrarModalChicharron && modalChicharron) {

    cerrarModalChicharron.addEventListener("click", () => {

        modalChicharron.style.display = "none";

    });

}


// CERRAR TOCANDO FUERA

if (modalChicharron) {

    modalChicharron.addEventListener("click", (e) => {

        if (e.target === modalChicharron) {

            modalChicharron.style.display = "none";

        }

    });

}
