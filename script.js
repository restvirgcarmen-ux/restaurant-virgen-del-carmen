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
// CARRITO DE PEDIDO
// ================================

const abrirCarrito = document.getElementById("abrir-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");


// ================================
// ABRIR CARRITO
// ================================

if (abrirCarrito && panelCarrito) {

    abrirCarrito.addEventListener("click", () => {

        panelCarrito.classList.add("activo");

        mostrarCarrito();

    });

}


// ================================
// CERRAR CARRITO
// ================================

if (cerrarCarrito && panelCarrito) {

    cerrarCarrito.addEventListener("click", () => {

        panelCarrito.classList.remove("activo");

    });

}


// ================================
// MOSTRAR CARRITO
// ================================

function mostrarCarrito() {

    const carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];


    // Carrito vacío

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Tu pedido está vacío.
            </p>
        `;

        totalCarrito.textContent = "S/ 0.00";

        return;

    }


    listaCarrito.innerHTML = "";

    let total = 0;


    // Mostrar productos

    carrito.forEach((producto, indice) => {

        const precio = Number(producto.precio) || 0;
        const cantidad = Number(producto.cantidad) || 1;

        const subtotal = precio * cantidad;

        total += subtotal;


        const item = document.createElement("div");

        item.className = "item-carrito";


        item.innerHTML = `

            <div class="info-item-carrito">

                <strong>
                    ${producto.nombre}
                </strong>

                <span>
                    S/ ${precio.toFixed(2)}
                </span>

            </div>


            <div class="controles-cantidad">

                <button
                    class="menos-cantidad"
                    data-indice="${indice}"
                >
                    −
                </button>


                <span>
                    ${cantidad}
                </span>


                <button
                    class="mas-cantidad"
                    data-indice="${indice}"
                >
                    +
                </button>

            </div>


            <div class="subtotal-item">

                S/ ${subtotal.toFixed(2)}

            </div>


            <button
                class="eliminar-item"
                data-indice="${indice}"
            >
                🗑️
            </button>

        `;


        listaCarrito.appendChild(item);

    });


    // Mostrar total

    totalCarrito.textContent =
        `S/ ${total.toFixed(2)}`;


    activarBotonesCarrito();

}


// ================================
// BOTONES DEL CARRITO
// ================================

function activarBotonesCarrito() {


    // AUMENTAR CANTIDAD

    document.querySelectorAll(".mas-cantidad")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const indice =
                    Number(boton.dataset.indice);


                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                carrito[indice].cantidad =
                    (Number(carrito[indice].cantidad) || 1) + 1;


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );


                actualizarContadorPedido();

                mostrarCarrito();

            });

        });


    // DISMINUIR CANTIDAD

    document.querySelectorAll(".menos-cantidad")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const indice =
                    Number(boton.dataset.indice);


                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                carrito[indice].cantidad =
                    (Number(carrito[indice].cantidad) || 1) - 1;


                // Si llega a cero, eliminar

                if (carrito[indice].cantidad <= 0) {

                    carrito.splice(indice, 1);

                }


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );


                actualizarContadorPedido();

                mostrarCarrito();

            });

        });


    // ELIMINAR PRODUCTO

    document.querySelectorAll(".eliminar-item")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const indice =
                    Number(boton.dataset.indice);


                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                carrito.splice(indice, 1);


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );


                actualizarContadorPedido();

                mostrarCarrito();

            });

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

// ================================
// TIPO DE PEDIDO
// ================================

const opcionesTipoPedido =
    document.querySelectorAll('input[name="tipo-pedido"]');

const datosDelivery =
    document.getElementById("datos-delivery");

const datosLocal =
    document.getElementById("datos-local");

const datosRecoger =
    document.getElementById("datos-recoger");


// Ocultar todos los formularios

function ocultarDatosPedido() {

    if (datosDelivery) {
        datosDelivery.style.display = "none";
    }

    if (datosLocal) {
        datosLocal.style.display = "none";
    }

    if (datosRecoger) {
        datosRecoger.style.display = "none";
    }

}


// Cambiar según la opción seleccionada

opcionesTipoPedido.forEach(opcion => {

    opcion.addEventListener("change", () => {

        ocultarDatosPedido();


        if (opcion.value === "delivery") {

            datosDelivery.style.display = "block";

        }


        if (opcion.value === "local") {

            datosLocal.style.display = "block";

        }


        if (opcion.value === "recoger") {

            datosRecoger.style.display = "block";

        }

    });

});


// Al cargar la página, ocultar formularios

ocultarDatosPedido();

// ================================
// REALIZAR PEDIDO POR WHATSAPP
// ================================

const botonRealizarPedido =
    document.getElementById("realizar-pedido");


if (botonRealizarPedido) {

    botonRealizarPedido.addEventListener("click", () => {

        // ================================
        // OBTENER CARRITO
        // ================================

        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];


        // Verificar que haya productos

        if (carrito.length === 0) {

            alert("Tu pedido está vacío.");

            return;

        }


        // ================================
        // TIPO DE PEDIDO
        // ================================

        const tipoPedido =
            document.querySelector(
                'input[name="tipo-pedido"]:checked'
            );


        if (!tipoPedido) {

            alert(
                "Por favor, selecciona cómo deseas recibir tu pedido."
            );

            return;

        }


        // ================================
        // CALCULAR TOTAL
        // ================================

        let total = 0;

        let mensajeProductos = "";


        carrito.forEach(producto => {

            const precio =
                Number(producto.precio) || 0;

            const cantidad =
                Number(producto.cantidad) || 1;

            const subtotal =
                precio * cantidad;


            total += subtotal;


            mensajeProductos +=
                `🍽️ ${producto.nombre}\n` +
                `   Cantidad: ${cantidad}\n` +
                `   Precio: S/ ${precio.toFixed(2)}\n` +
                `   Subtotal: S/ ${subtotal.toFixed(2)}\n\n`;

        });


        // ================================
        // INFORMACIÓN DEL CLIENTE
        // ================================

        let mensajeDatos = "";


        // DELIVERY

        if (tipoPedido.value === "delivery") {

            const nombre =
                document.getElementById(
                    "nombre-delivery"
                ).value.trim();

            const telefono =
                document.getElementById(
                    "telefono-delivery"
                ).value.trim();

            const direccion =
                document.getElementById(
                    "direccion-delivery"
                ).value.trim();

            const referencia =
                document.getElementById(
                    "referencia-delivery"
                ).value.trim();


            if (!nombre ||
                !telefono ||
                !direccion ||
                !referencia) {

                alert(
                    "Por favor, completa todos los datos de delivery."
                );

                return;

            }


            mensajeDatos =
                `🛵 *DELIVERY GRATIS*\n\n` +
                `👤 Nombre: ${nombre}\n` +
                `📱 Celular: ${telefono}\n` +
                `📍 Dirección: ${direccion}\n` +
                `📌 Referencia: ${referencia}\n`;

        }


        // PARA COMER EN EL LOCAL

        if (tipoPedido.value === "local") {

            const nombre =
                document.getElementById(
                    "nombre-local"
                ).value.trim();

            const personas =
                document.getElementById(
                    "personas-local"
                ).value.trim();


            if (!nombre || !personas) {

                alert(
                    "Por favor, completa los datos para el local."
                );

                return;

            }


            mensajeDatos =
                `🍽️ *PARA COMER EN EL LOCAL*\n\n` +
                `👤 Nombre: ${nombre}\n` +
                `👥 Personas: ${personas}\n`;

        }


        // PARA RECOGER

        if (tipoPedido.value === "recoger") {

            const nombre =
                document.getElementById(
                    "nombre-recoger"
                ).value.trim();

            const telefono =
                document.getElementById(
                    "telefono-recoger"
                ).value.trim();

            const hora =
                document.getElementById(
                    "hora-recoger"
                ).value;


            if (!nombre || !telefono || !hora) {

                alert(
                    "Por favor, completa los datos para recoger."
                );

                return;

            }


            mensajeDatos =
                `📦 *PARA RECOGER*\n\n` +
                `👤 Nombre: ${nombre}\n` +
                `📱 Celular: ${telefono}\n` +
                `🕐 Hora de recojo: ${hora}\n`;

        }


        // ================================
        // CREAR MENSAJE
        // ================================

        const mensaje =

            `🍽️ *NUEVO PEDIDO*\n\n` +

            `━━━━━━━━━━━━━━━━━━\n` +

            `*DETALLE DEL PEDIDO*\n\n` +

            mensajeProductos +

            `━━━━━━━━━━━━━━━━━━\n` +

            `💰 *TOTAL: S/ ${total.toFixed(2)}*\n\n` +

            `━━━━━━━━━━━━━━━━━━\n\n` +

            mensajeDatos;


        // ================================
// MOSTRAR QR DE YAPE
// ================================

const modalYape =
    document.getElementById("modal-yape");


// Guardamos el mensaje para enviarlo
// después de confirmar el pago

window.mensajePedidoWhatsApp = mensaje;


// Mostrar el modal

if (modalYape) {

    modalYape.style.display = "flex";

} 
        
    });

}

// ================================
// MODAL DE PAGO YAPE
// ================================

const modalYape = document.getElementById("modal-yape");

const cerrarYape =
    document.getElementById("cerrar-yape");

const confirmarPagoYape =
    document.getElementById("confirmar-pago-yape");


// CERRAR CON X

if (cerrarYape) {

    cerrarYape.addEventListener("click", () => {

        modalYape.style.display = "none";

    });

}


// CERRAR TOCANDO FUERA

if (modalYape) {

    modalYape.addEventListener("click", (e) => {

        if (e.target === modalYape) {

            modalYape.style.display = "none";

        }

    });

}


// CONFIRMAR PAGO

if (confirmarPagoYape) {

    confirmarPagoYape.addEventListener("click", () => {

        // Cerrar QR

        modalYape.style.display = "none";


        // ================================
        // ENVIAR PEDIDO A WHATSAPP
        // ================================

        const numeroWhatsApp =
            "51952392317";


        const url =
            `https://wa.me/${numeroWhatsApp}?text=` +
            encodeURIComponent(
                window.mensajePedidoWhatsApp
            );


        window.open(url, "_blank");

    });

}

