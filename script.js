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

const botonCeviche = document.querySelector('[data-plato="ceviche-mixto"]');
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

// ========================================
// MODALES DE LOS NUEVOS CEVICHES
// ========================================


// ========================================
// FUNCIÓN GENERAL PARA LOS NUEVOS CEVICHES
// ========================================

function configurarModalCeviche(
    botonPlato,
    modal,
    botonCerrar,
    botonesPrecio,
    botonAgregar,
    nombreProducto
) {

    let precioSeleccionado = null;


    // ================================
    // ABRIR MODAL
    // ================================

    if (botonPlato && modal) {

        botonPlato.addEventListener("click", () => {

            modal.style.display = "flex";

        });

    }


    // ================================
    // CERRAR CON X
    // ================================

    if (botonCerrar && modal) {

        botonCerrar.addEventListener("click", () => {

            modal.style.display = "none";

        });

    }


    // ================================
    // CERRAR TOCANDO FUERA
    // ================================

    if (modal) {

        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                modal.style.display = "none";

            }

        });

    }


    // ================================
    // SELECCIONAR PRECIO
    // ================================

    botonesPrecio.forEach(boton => {

        boton.addEventListener("click", () => {

            botonesPrecio.forEach(btn => {

                btn.classList.remove("seleccionado");

            });


            boton.classList.add("seleccionado");


            precioSeleccionado =
                Number(boton.dataset.precio);

        });

    });


    // ================================
    // AGREGAR AL PEDIDO
    // ================================

    if (botonAgregar) {

        botonAgregar.addEventListener("click", () => {

            // Verificar precio

            if (precioSeleccionado === null) {

                alert(
                    "Por favor, selecciona una opción de precio."
                );

                return;

            }


            // Obtener carrito

            let carrito =
                JSON.parse(
                    localStorage.getItem("carrito")
                ) || [];


            // Agregar producto

            carrito.push({

                nombre: nombreProducto,

                precio: precioSeleccionado,

                cantidad: 1

            });


            // Guardar carrito

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            // Actualizar contador

            actualizarContadorPedido();


            // Cerrar ventana

            modal.style.display = "none";


            // Limpiar selección

            botonesPrecio.forEach(btn => {

                btn.classList.remove("seleccionado");

            });


            precioSeleccionado = null;


            // Asegurar que el carrito quede cerrado

            const panelCarrito =
                document.getElementById("panel-carrito");

            if (panelCarrito) {

                panelCarrito.style.display = "none";

                panelCarrito.classList.remove("activo");

            }

        });

    }

}


// ========================================
// CEVICHE DE PESCADO
// ========================================

configurarModalCeviche(

    document.querySelector(
        '[data-plato="ceviche-pescado"]'
    ),

    document.getElementById(
        "modal-ceviche-pescado"
    ),

    document.querySelector(
        ".cerrar-modal-pescado"
    ),

    document.querySelectorAll(
        "#modal-ceviche-pescado .precio-ceviche"
    ),

    document.getElementById(
        "agregar-ceviche-pescado"
    ),

    "Ceviche de Pescado"

);


// ========================================
// CEVICHE DE MARISCOS
// ========================================

configurarModalCeviche(

    document.querySelector(
        '[data-plato="ceviche-mariscos"]'
    ),

    document.getElementById(
        "modal-ceviche-mariscos"
    ),

    document.querySelector(
        ".cerrar-modal-mariscos"
    ),

    document.querySelectorAll(
        "#modal-ceviche-mariscos .precio-ceviche"
    ),

    document.getElementById(
        "agregar-ceviche-mariscos"
    ),

    "Ceviche de Mariscos"

);


// ========================================
// CEVICHE DE CABALLA
// ========================================

configurarModalCeviche(

    document.querySelector(
        '[data-plato="ceviche-caballa"]'
    ),

    document.getElementById(
        "modal-ceviche-caballa"
    ),

    document.querySelector(
        ".cerrar-modal-caballa"
    ),

    document.querySelectorAll(
        "#modal-ceviche-caballa .precio-ceviche"
    ),

    document.getElementById(
        "agregar-ceviche-caballa"
    ),

    "Ceviche de Caballa"

);


// ========================================
// CEVICHE DE CABRILLÓN
// ========================================

configurarModalCeviche(

    document.querySelector(
        '[data-plato="ceviche-cabrillon"]'
    ),

    document.getElementById(
        "modal-ceviche-cabrillon"
    ),

    document.querySelector(
        ".cerrar-modal-cabrillon"
    ),

    document.querySelectorAll(
        "#modal-ceviche-cabrillon .precio-ceviche"
    ),

    document.getElementById(
        "agregar-ceviche-cabrillon"
    ),

    "Ceviche de Cabrillón"

);


// ========================================
// CEVICHE PERUANO
// ========================================

configurarModalCeviche(

    document.querySelector(
        '[data-plato="ceviche-peruano"]'
    ),

    document.getElementById(
        "modal-ceviche-peruano"
    ),

    document.querySelector(
        ".cerrar-modal-peruano"
    ),

    document.querySelectorAll(
        "#modal-ceviche-peruano .precio-ceviche"
    ),

    document.getElementById(
        "agregar-ceviche-peruano"
    ),

    "Ceviche Peruano"

);

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

    abrirCarrito.addEventListener("click", (e) => {

        e.stopPropagation();

        panelCarrito.classList.add("activo");

        panelCarrito.style.display = "block";

        mostrarCarrito();

    });

}

// ================================
// CERRAR CARRITO
// ================================

if (cerrarCarrito && panelCarrito) {

    cerrarCarrito.addEventListener("click", (e) => {

        e.stopPropagation();

        panelCarrito.classList.remove("activo");

        panelCarrito.style.display = "none";

    });

}

// ================================
// MOSTRAR CARRITO
// ================================

function mostrarCarrito() {

    const carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];


    // ================================
    // CARRITO VACÍO
    // ================================

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Tu pedido está vacío.
            </p>
        `;

        totalCarrito.textContent = "S/ 0.00";

        return;

    }


    // ================================
    // AGRUPAR PRODUCTOS
    // POR NOMBRE + PRECIO
    // ================================

    const productosAgrupados = [];


    carrito.forEach(producto => {

        const precio =
            Number(producto.precio) || 0;

        const cantidad =
            Number(producto.cantidad) || 1;


        const existente =
            productosAgrupados.find(item =>
                item.nombre === producto.nombre &&
                Number(item.precio) === precio
            );


        if (existente) {

            existente.cantidad += cantidad;

        } else {

            productosAgrupados.push({

                nombre: producto.nombre,

                precio: precio,

                cantidad: cantidad

            });

        }

    });


    // ================================
    // MOSTRAR PRODUCTOS
    // ================================

    listaCarrito.innerHTML = "";

    let total = 0;


    productosAgrupados.forEach((producto, indice) => {

        const precio =
            Number(producto.precio) || 0;

        const cantidad =
            Number(producto.cantidad) || 1;


        const subtotal =
            precio * cantidad;


        total += subtotal;


        const item =
            document.createElement("div");


        item.className =
            "item-carrito";


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


    // ================================
    // TOTAL
    // ================================

    totalCarrito.textContent =
        `S/ ${total.toFixed(2)}`;


    // ================================
    // ACTIVAR BOTONES
    // ================================

    activarBotonesCarrito();

}


// ================================
// BOTONES DEL CARRITO
// PRODUCTOS AGRUPADOS
// ================================

function activarBotonesCarrito() {

    // ================================
    // AUMENTAR CANTIDAD
    // ================================

    document.querySelectorAll(".mas-cantidad")
        .forEach(boton => {

            boton.addEventListener("click", (e) => {

                e.stopPropagation();

                const indice =
                    Number(boton.dataset.indice);

                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                // Agrupar productos
                const productosAgrupados = [];


                carrito.forEach(producto => {

                    const precio =
                        Number(producto.precio) || 0;

                    const cantidad =
                        Number(producto.cantidad) || 1;


                    const existente =
                        productosAgrupados.find(item =>
                            item.nombre === producto.nombre &&
                            Number(item.precio) === precio
                        );


                    if (existente) {

                        existente.cantidad += cantidad;

                    } else {

                        productosAgrupados.push({

                            nombre: producto.nombre,

                            precio: precio,

                            cantidad: cantidad

                        });

                    }

                });


                const productoSeleccionado =
                    productosAgrupados[indice];


                if (!productoSeleccionado) {
                    return;
                }


                // Aumentar cantidad
                productoSeleccionado.cantidad++;


                // Reconstruir carrito
                const nuevoCarrito = [];


                productosAgrupados.forEach(producto => {

                    for (
                        let i = 0;
                        i < producto.cantidad;
                        i++
                    ) {

                        nuevoCarrito.push({

                            nombre: producto.nombre,

                            precio: producto.precio,

                            cantidad: 1

                        });

                    }

                });


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(nuevoCarrito)
                );


                actualizarContadorPedido();

                mostrarCarrito();

            });

        });


    // ================================
    // DISMINUIR CANTIDAD
    // ================================

    document.querySelectorAll(".menos-cantidad")
        .forEach(boton => {

            boton.addEventListener("click", (e) => {

                e.stopPropagation();

                const indice =
                    Number(boton.dataset.indice);

                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                // Agrupar productos
                const productosAgrupados = [];


                carrito.forEach(producto => {

                    const precio =
                        Number(producto.precio) || 0;

                    const cantidad =
                        Number(producto.cantidad) || 1;


                    const existente =
                        productosAgrupados.find(item =>
                            item.nombre === producto.nombre &&
                            Number(item.precio) === precio
                        );


                    if (existente) {

                        existente.cantidad += cantidad;

                    } else {

                        productosAgrupados.push({

                            nombre: producto.nombre,

                            precio: precio,

                            cantidad: cantidad

                        });

                    }

                });


                const productoSeleccionado =
                    productosAgrupados[indice];


                if (!productoSeleccionado) {
                    return;
                }


                // Disminuir cantidad
                productoSeleccionado.cantidad--;


                // Reconstruir carrito
                const nuevoCarrito = [];


                productosAgrupados.forEach(producto => {

                    if (producto.cantidad <= 0) {
                        return;
                    }


                    for (
                        let i = 0;
                        i < producto.cantidad;
                        i++
                    ) {

                        nuevoCarrito.push({

                            nombre: producto.nombre,

                            precio: producto.precio,

                            cantidad: 1

                        });

                    }

                });


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(nuevoCarrito)
                );


                actualizarContadorPedido();

                mostrarCarrito();

            });

        });


    // ================================
    // ELIMINAR PRODUCTO
    // ================================

    document.querySelectorAll(".eliminar-item")
        .forEach(boton => {

            boton.addEventListener("click", (e) => {

                e.stopPropagation();

                const indice =
                    Number(boton.dataset.indice);

                let carrito =
                    JSON.parse(
                        localStorage.getItem("carrito")
                    ) || [];


                // Agrupar productos
                const productosAgrupados = [];


                carrito.forEach(producto => {

                    const precio =
                        Number(producto.precio) || 0;

                    const cantidad =
                        Number(producto.cantidad) || 1;


                    const existente =
                        productosAgrupados.find(item =>
                            item.nombre === producto.nombre &&
                            Number(item.precio) === precio
                        );


                    if (existente) {

                        existente.cantidad += cantidad;

                    } else {

                        productosAgrupados.push({

                            nombre: producto.nombre,

                            precio: precio,

                            cantidad: cantidad

                        });

                    }

                });


                // Eliminar producto completo
                productosAgrupados.splice(indice, 1);


                // Reconstruir carrito
                const nuevoCarrito = [];


                productosAgrupados.forEach(producto => {

                    for (
                        let i = 0;
                        i < producto.cantidad;
                        i++
                    ) {

                        nuevoCarrito.push({

                            nombre: producto.nombre,

                            precio: producto.precio,

                            cantidad: 1

                        });

                    }

                });


                localStorage.setItem(
                    "carrito",
                    JSON.stringify(nuevoCarrito)
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


    // Sumar todas las unidades

    const totalUnidades =
        carrito.reduce((total, producto) => {

            return total +
                (Number(producto.cantidad) || 1);

        }, 0);


    const contador =
        document.getElementById("contador-carrito");


    if (contador) {

        contador.textContent = totalUnidades;

    }

}

actualizarContadorPedido();

// ================================
// MODALES DE CHICHARRONES
// ================================

// ========================================
// CHICHARRÓN DE CALAMAR
// ========================================

const botonChicharronCalamar =
    document.querySelector('[data-plato="chicharron-calamar"]');

const modalChicharronCalamar =
    document.getElementById("modal-chicharron-calamar");

const cerrarChicharronCalamar =
    document.querySelector(".cerrar-modal-chicharron");


// ========================================
// CHICHARRÓN DE PESCADO
// ========================================

const botonChicharronPescado =
    document.querySelector('[data-plato="chicharron-pescado"]');

const modalChicharronPescado =
    document.getElementById("modal-chicharron-pescado");

const cerrarChicharronPescado =
    document.querySelector(".cerrar-modal-chicharron-pescado");


// ========================================
// CHICHARRÓN MIXTO
// ========================================

const botonChicharronMixto =
    document.querySelector('[data-plato="chicharron-mixto"]');

const modalChicharronMixto =
    document.getElementById("modal-chicharron-mixto");

const cerrarChicharronMixto =
    document.querySelector(".cerrar-modal-chicharron-mixto");


// ========================================
// CHICHARRÓN DE POLLO
// ========================================

const botonChicharronPollo =
    document.querySelector('[data-plato="chicharron-pollo"]');

const modalChicharronPollo =
    document.getElementById("modal-chicharron-pollo");

const cerrarChicharronPollo =
    document.querySelector(".cerrar-modal-chicharron-pollo");

// ================================
// MODAL CABRILLÓN PASADO POR AGUA
// ================================

const botonCabrillonAgua =
    document.querySelector(".boton-especial[data-plato='cabrillon-agua']");

const modalCabrillonAgua =
    document.getElementById("modal-cabrillon-agua");

const cerrarCabrillonAgua =
    document.querySelector(".cerrar-modal-cabrillon-agua");


// ================================
// ABRIR MODAL
// ================================

if (botonCabrillonAgua && modalCabrillonAgua) {

    botonCabrillonAgua.addEventListener("click", () => {

        modalCabrillonAgua.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarCabrillonAgua && modalCabrillonAgua) {

    cerrarCabrillonAgua.addEventListener("click", () => {

        modalCabrillonAgua.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCabrillonAgua) {

    modalCabrillonAgua.addEventListener("click", (e) => {

        if (e.target === modalCabrillonAgua) {

            modalCabrillonAgua.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarCabrillonAgua =
    document.getElementById("agregar-cabrillon-agua");


if (botonAgregarCabrillonAgua) {

    botonAgregarCabrillonAgua.addEventListener("click", () => {

        let carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];


        carrito.push({

            nombre: "Cabrillón Pasado por Agua",

            precio: 65,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCabrillonAgua.style.display = "none";

    });

}

// ================================
// MODAL PARIHUELA CON CABRILLÓN
// ================================

const botonParihuelaCabrillon =
    document.querySelector(
        ".boton-especial[data-plato='parihuela-cabrillon']"
    );

const modalParihuelaCabrillon =
    document.getElementById(
        "modal-parihuela-cabrillon"
    );

const cerrarParihuelaCabrillon =
    document.querySelector(
        ".cerrar-modal-parihuela-cabrillon"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonParihuelaCabrillon &&
    modalParihuelaCabrillon
) {

    botonParihuelaCabrillon.addEventListener(
        "click",
        () => {

            modalParihuelaCabrillon.style.display =
                "flex";

        }
    );

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarParihuelaCabrillon &&
    modalParihuelaCabrillon
) {

    cerrarParihuelaCabrillon.addEventListener(
        "click",
        () => {

            modalParihuelaCabrillon.style.display =
                "none";

        }
    );

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalParihuelaCabrillon) {

    modalParihuelaCabrillon.addEventListener(
        "click",
        (e) => {

            if (e.target === modalParihuelaCabrillon) {

                modalParihuelaCabrillon.style.display =
                    "none";

            }

        }
    );

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarParihuelaCabrillon =
    document.getElementById(
        "agregar-parihuela-cabrillon"
    );


if (botonAgregarParihuelaCabrillon) {

    botonAgregarParihuelaCabrillon.addEventListener(
        "click",
        () => {

            let carrito =
                JSON.parse(
                    localStorage.getItem("carrito")
                ) || [];


            carrito.push({

                nombre:
                    "Parihuela con Cabrillón",

                precio: 75,

                cantidad: 1

            });


            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            actualizarContadorPedido();


            modalParihuelaCabrillon.style.display =
                "none";

        }
    );

}

// ================================
// MODAL SECO DE CHAVELO
// ================================

const botonSecoChavelo =
    document.querySelector(
        ".boton-especial[data-plato='seco-chavelo']"
    );

const modalSecoChavelo =
    document.getElementById(
        "modal-seco-chavelo"
    );

const cerrarSecoChavelo =
    document.querySelector(
        ".cerrar-modal-seco-chavelo"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonSecoChavelo && modalSecoChavelo) {

    botonSecoChavelo.addEventListener("click", () => {

        modalSecoChavelo.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarSecoChavelo && modalSecoChavelo) {

    cerrarSecoChavelo.addEventListener("click", () => {

        modalSecoChavelo.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalSecoChavelo) {

    modalSecoChavelo.addEventListener("click", (e) => {

        if (e.target === modalSecoChavelo) {

            modalSecoChavelo.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarSecoChavelo =
    document.getElementById(
        "agregar-seco-chavelo"
    );


if (botonAgregarSecoChavelo) {

    botonAgregarSecoChavelo.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Seco de Chavelo",

            precio: 45,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarContadorPedido();


        // Cerrar ventana

        modalSecoChavelo.style.display = "none";

    });

}

// ================================
// MODAL CACHEMAS ENCEBOLLADAS
// ================================

const botonCachemasEncebolladas =
    document.querySelector(
        ".boton-especial[data-plato='cachemas-encebolladas']"
    );

const modalCachemasEncebolladas =
    document.getElementById(
        "modal-cachemas-encebolladas"
    );

const cerrarCachemasEncebolladas =
    document.querySelector(
        ".cerrar-modal-cachemas-encebolladas"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonCachemasEncebolladas &&
    modalCachemasEncebolladas
) {

    botonCachemasEncebolladas.addEventListener("click", () => {

        modalCachemasEncebolladas.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarCachemasEncebolladas &&
    modalCachemasEncebolladas
) {

    cerrarCachemasEncebolladas.addEventListener("click", () => {

        modalCachemasEncebolladas.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCachemasEncebolladas) {

    modalCachemasEncebolladas.addEventListener("click", (e) => {

        if (e.target === modalCachemasEncebolladas) {

            modalCachemasEncebolladas.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarCachemasEncebolladas =
    document.getElementById(
        "agregar-cachemas-encebolladas"
    );


if (botonAgregarCachemasEncebolladas) {

    botonAgregarCachemasEncebolladas.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Cachemas Encebolladas",

            precio: 45,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarContadorPedido();


        // Cerrar ventana

        modalCachemasEncebolladas.style.display = "none";

    });

}

// ================================
// MODAL PATACONES ACEVICHADOS
// ================================

const botonPataconesAcevichados =
    document.querySelector(
        ".boton-especial[data-plato='patacones-acevichados']"
    );

const modalPataconesAcevichados =
    document.getElementById(
        "modal-patacones-acevichados"
    );

const cerrarPataconesAcevichados =
    document.querySelector(
        ".cerrar-modal-patacones-acevichados"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonPataconesAcevichados &&
    modalPataconesAcevichados
) {

    botonPataconesAcevichados.addEventListener("click", () => {

        modalPataconesAcevichados.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarPataconesAcevichados &&
    modalPataconesAcevichados
) {

    cerrarPataconesAcevichados.addEventListener("click", () => {

        modalPataconesAcevichados.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalPataconesAcevichados) {

    modalPataconesAcevichados.addEventListener("click", (e) => {

        if (e.target === modalPataconesAcevichados) {

            modalPataconesAcevichados.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarPataconesAcevichados =
    document.getElementById(
        "agregar-patacones-acevichados"
    );


if (botonAgregarPataconesAcevichados) {

    botonAgregarPataconesAcevichados.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Patacones Acevichados",

            precio: 45,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarContadorPedido();


        // Cerrar ventana

        modalPataconesAcevichados.style.display = "none";

    });

}

// ================================
// MODAL TORTILLA DE LANGOSTINOS
// ================================

const botonTortillaLangostinos =
    document.querySelector(
        ".boton-especial[data-plato='tortilla-langostinos']"
    );

const modalTortillaLangostinos =
    document.getElementById(
        "modal-tortilla-langostinos"
    );

const cerrarTortillaLangostinos =
    document.querySelector(
        ".cerrar-modal-tortilla-langostinos"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonTortillaLangostinos &&
    modalTortillaLangostinos
) {

    botonTortillaLangostinos.addEventListener("click", () => {

        modalTortillaLangostinos.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarTortillaLangostinos &&
    modalTortillaLangostinos
) {

    cerrarTortillaLangostinos.addEventListener("click", () => {

        modalTortillaLangostinos.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalTortillaLangostinos) {

    modalTortillaLangostinos.addEventListener("click", (e) => {

        if (e.target === modalTortillaLangostinos) {

            modalTortillaLangostinos.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

const botonAgregarTortillaLangostinos =
    document.getElementById(
        "agregar-tortilla-langostinos"
    );


if (botonAgregarTortillaLangostinos) {

    botonAgregarTortillaLangostinos.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Tortilla de Langostinos",

            precio: 45,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarContadorPedido();


        // Cerrar ventana

        modalTortillaLangostinos.style.display = "none";

    });

}

// ================================
// DÚO VIRGEN DEL CARMEN
// ================================

const botonDuoVirgen =
    document.querySelector(
        '[data-plato="duo-virgen"]'
    );

const modalDuoVirgen =
    document.getElementById(
        "modal-duo-virgen"
    );

const cerrarModalDuoVirgen =
    document.querySelector(
        ".cerrar-modal-duo-virgen"
    );

const opcionesDuoVirgen =
    document.querySelectorAll(
        ".opcion-duo-virgen"
    );

const botonAgregarDuoVirgen =
    document.getElementById(
        "agregar-duo-virgen"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonDuoVirgen && modalDuoVirgen) {

    botonDuoVirgen.addEventListener("click", () => {

        modalDuoVirgen.style.display = "flex";

    });

}


// ================================
// CERRAR MODAL CON X
// ================================

if (cerrarModalDuoVirgen && modalDuoVirgen) {

    cerrarModalDuoVirgen.addEventListener("click", () => {

        modalDuoVirgen.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalDuoVirgen) {

    modalDuoVirgen.addEventListener("click", (e) => {

        if (e.target === modalDuoVirgen) {

            modalDuoVirgen.style.display = "none";

        }

    });

}


// ================================
// SELECCIONAR COMBINACIÓN
// ================================

let opcionDuoVirgenSeleccionada = null;


opcionesDuoVirgen.forEach(opcion => {

    opcion.addEventListener("click", () => {

        opcionesDuoVirgen.forEach(btn => {

            btn.classList.remove("seleccionado");

        });

        opcion.classList.add("seleccionado");

        opcionDuoVirgenSeleccionada =
            opcion.dataset.opcion;

    });

});


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarDuoVirgen) {

    botonAgregarDuoVirgen.addEventListener("click", () => {

        // Verificar selección

        if (!opcionDuoVirgenSeleccionada) {

            alert(
                "Por favor, selecciona una combinación."
            );

            return;

        }


        // Obtener carrito

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        // Agregar Dúo

        carrito.push({

            nombre:
                `Dúo Virgen del Carmen - ${opcionDuoVirgenSeleccionada}`,

            precio: 55,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalDuoVirgen.style.display = "none";


        // Limpiar selección

        opcionesDuoVirgen.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        opcionDuoVirgenSeleccionada = null;

    });

}

// ================================
// DÚO PERUANO
// ================================

const botonDuoPeruano =
    document.querySelector(
        '[data-plato="duo-peruano"]'
    );

const modalDuoPeruano =
    document.getElementById(
        "modal-duo-peruano"
    );

const cerrarModalDuoPeruano =
    document.querySelector(
        ".cerrar-modal-duo-peruano"
    );

const opcionesDuoPeruano =
    document.querySelectorAll(
        ".opcion-duo-peruano"
    );

const botonAgregarDuoPeruano =
    document.getElementById(
        "agregar-duo-peruano"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonDuoPeruano && modalDuoPeruano) {

    botonDuoPeruano.addEventListener("click", () => {

        modalDuoPeruano.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalDuoPeruano && modalDuoPeruano) {

    cerrarModalDuoPeruano.addEventListener("click", () => {

        modalDuoPeruano.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalDuoPeruano) {

    modalDuoPeruano.addEventListener("click", (e) => {

        if (e.target === modalDuoPeruano) {

            modalDuoPeruano.style.display = "none";

        }

    });

}


// ================================
// SELECCIONAR COMBINACIÓN
// ================================

let opcionDuoPeruanoSeleccionada = null;


opcionesDuoPeruano.forEach(opcion => {

    opcion.addEventListener("click", () => {

        opcionesDuoPeruano.forEach(btn => {

            btn.classList.remove("seleccionado");

        });

        opcion.classList.add("seleccionado");

        opcionDuoPeruanoSeleccionada =
            opcion.dataset.opcion;

    });

});


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarDuoPeruano) {

    botonAgregarDuoPeruano.addEventListener("click", () => {

        if (!opcionDuoPeruanoSeleccionada) {

            alert(
                "Por favor, selecciona una combinación."
            );

            return;

        }


        // Obtener carrito

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        // Agregar Dúo Peruano

        carrito.push({

            nombre:
                `Dúo Peruano - ${opcionDuoPeruanoSeleccionada}`,

            precio: 55,

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

        modalDuoPeruano.style.display = "none";


        // Limpiar selección

        opcionesDuoPeruano.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        opcionDuoPeruanoSeleccionada = null;

    });

}

// ================================
// TRÍO VIRGEN DEL CARMEN
// ================================

const botonTrioVirgen =
    document.querySelector(
        '[data-plato="trio-virgen"]'
    );

const modalTrioVirgen =
    document.getElementById(
        "modal-trio-virgen"
    );

const cerrarModalTrioVirgen =
    document.querySelector(
        ".cerrar-modal-trio-virgen"
    );

const botonAgregarTrioVirgen =
    document.getElementById(
        "agregar-trio-virgen"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonTrioVirgen && modalTrioVirgen) {

    botonTrioVirgen.addEventListener("click", () => {

        modalTrioVirgen.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalTrioVirgen && modalTrioVirgen) {

    cerrarModalTrioVirgen.addEventListener("click", () => {

        modalTrioVirgen.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalTrioVirgen) {

    modalTrioVirgen.addEventListener("click", (e) => {

        if (e.target === modalTrioVirgen) {

            modalTrioVirgen.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarTrioVirgen) {

    botonAgregarTrioVirgen.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Trío Virgen del Carmen",

            precio: 70,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalTrioVirgen.style.display = "none";

    });

}

// ================================
// TRÍO PERUANO
// ================================

const botonTrioPeruano =
    document.querySelector(
        '[data-plato="trio-peruano"]'
    );

const modalTrioPeruano =
    document.getElementById(
        "modal-trio-peruano"
    );

const cerrarModalTrioPeruano =
    document.querySelector(
        ".cerrar-modal-trio-peruano"
    );

const botonAgregarTrioPeruano =
    document.getElementById(
        "agregar-trio-peruano"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonTrioPeruano && modalTrioPeruano) {

    botonTrioPeruano.addEventListener("click", () => {

        modalTrioPeruano.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalTrioPeruano && modalTrioPeruano) {

    cerrarModalTrioPeruano.addEventListener("click", () => {

        modalTrioPeruano.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalTrioPeruano) {

    modalTrioPeruano.addEventListener("click", (e) => {

        if (e.target === modalTrioPeruano) {

            modalTrioPeruano.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarTrioPeruano) {

    botonAgregarTrioPeruano.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Trío Peruano",

            precio: 70,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalTrioPeruano.style.display = "none";

    });

}

// ================================
// RONDA MARINA
// ================================

const botonRondaMarina =
    document.querySelector(
        '[data-plato="ronda-marina"]'
    );

const modalRondaMarina =
    document.getElementById(
        "modal-ronda-marina"
    );

const cerrarModalRondaMarina =
    document.querySelector(
        ".cerrar-modal-ronda-marina"
    );

const botonAgregarRondaMarina =
    document.getElementById(
        "agregar-ronda-marina"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonRondaMarina && modalRondaMarina) {

    botonRondaMarina.addEventListener("click", () => {

        modalRondaMarina.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalRondaMarina && modalRondaMarina) {

    cerrarModalRondaMarina.addEventListener("click", () => {

        modalRondaMarina.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalRondaMarina) {

    modalRondaMarina.addEventListener("click", (e) => {

        if (e.target === modalRondaMarina) {

            modalRondaMarina.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarRondaMarina) {

    botonAgregarRondaMarina.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Ronda Marina",

            precio: 85,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalRondaMarina.style.display = "none";

    });

}

// ================================
// RONDA CRIOLLA
// ================================

const botonRondaCriolla =
    document.querySelector(
        '[data-plato="ronda-criolla"]'
    );

const modalRondaCriolla =
    document.getElementById(
        "modal-ronda-criolla"
    );

const cerrarModalRondaCriolla =
    document.querySelector(
        ".cerrar-modal-ronda-criolla"
    );

const botonAgregarRondaCriolla =
    document.getElementById(
        "agregar-ronda-criolla"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonRondaCriolla && modalRondaCriolla) {

    botonRondaCriolla.addEventListener("click", () => {

        modalRondaCriolla.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalRondaCriolla && modalRondaCriolla) {

    cerrarModalRondaCriolla.addEventListener("click", () => {

        modalRondaCriolla.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalRondaCriolla) {

    modalRondaCriolla.addEventListener("click", (e) => {

        if (e.target === modalRondaCriolla) {

            modalRondaCriolla.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarRondaCriolla) {

    botonAgregarRondaCriolla.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Ronda Criolla",

            precio: 85,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalRondaCriolla.style.display = "none";

    });

}

// ================================
// RONDA ALIÑADA
// ================================

const botonRondaAlinada =
    document.querySelector(
        '[data-plato="ronda-alinada"]'
    );

const modalRondaAlinada =
    document.getElementById(
        "modal-ronda-alinada"
    );

const cerrarModalRondaAlinada =
    document.querySelector(
        ".cerrar-modal-ronda-alinada"
    );

const botonAgregarRondaAlinada =
    document.getElementById(
        "agregar-ronda-alinada"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonRondaAlinada && modalRondaAlinada) {

    botonRondaAlinada.addEventListener("click", () => {

        modalRondaAlinada.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (cerrarModalRondaAlinada && modalRondaAlinada) {

    cerrarModalRondaAlinada.addEventListener("click", () => {

        modalRondaAlinada.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalRondaAlinada) {

    modalRondaAlinada.addEventListener("click", (e) => {

        if (e.target === modalRondaAlinada) {

            modalRondaAlinada.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarRondaAlinada) {

    botonAgregarRondaAlinada.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Ronda Aliñada",

            precio: 85,

            cantidad: 1

        });


        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        actualizarContadorPedido();


        modalRondaAlinada.style.display = "none";

    });

}

// ================================
// JALEA A LA NORTEÑA
// ================================

const botonJaleaNortena =
    document.querySelector(
        '[data-plato="jalea-nortena"]'
    );

const modalJaleaNortena =
    document.getElementById(
        "modal-jalea-nortena"
    );

const cerrarModalJaleaNortena =
    document.querySelector(
        ".cerrar-modal-jalea-nortena"
    );

const botonAgregarJaleaNortena =
    document.getElementById(
        "agregar-jalea-nortena"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonJaleaNortena && modalJaleaNortena) {

    botonJaleaNortena.addEventListener("click", () => {

        modalJaleaNortena.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalJaleaNortena &&
    modalJaleaNortena
) {

    cerrarModalJaleaNortena.addEventListener("click", () => {

        modalJaleaNortena.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalJaleaNortena) {

    modalJaleaNortena.addEventListener("click", (e) => {

        if (e.target === modalJaleaNortena) {

            modalJaleaNortena.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarJaleaNortena) {

    botonAgregarJaleaNortena.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Jalea a la Norteña",

            precio: 75,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalJaleaNortena.style.display = "none";

    });

}

// ================================
// JALEA PIURANA
// ================================

const botonJaleaPiurana =
    document.querySelector(
        '[data-plato="jalea-piurana"]'
    );

const modalJaleaPiurana =
    document.getElementById(
        "modal-jalea-piurana"
    );

const cerrarModalJaleaPiurana =
    document.querySelector(
        ".cerrar-modal-jalea-piurana"
    );

const botonAgregarJaleaPiurana =
    document.getElementById(
        "agregar-jalea-piurana"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonJaleaPiurana && modalJaleaPiurana) {

    botonJaleaPiurana.addEventListener("click", () => {

        modalJaleaPiurana.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalJaleaPiurana &&
    modalJaleaPiurana
) {

    cerrarModalJaleaPiurana.addEventListener("click", () => {

        modalJaleaPiurana.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalJaleaPiurana) {

    modalJaleaPiurana.addEventListener("click", (e) => {

        if (e.target === modalJaleaPiurana) {

            modalJaleaPiurana.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarJaleaPiurana) {

    botonAgregarJaleaPiurana.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Jalea Piurana",

            precio: 75,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalJaleaPiurana.style.display = "none";

    });

}

// ================================
// SUDADO DE CABRILLÓN
// ================================

const botonSudadoCabrillon =
    document.querySelector(
        '[data-plato="sudado-cabrillon"]'
    );

const modalSudadoCabrillon =
    document.getElementById(
        "modal-sudado-cabrillon"
    );

const cerrarModalSudadoCabrillon =
    document.querySelector(
        ".cerrar-modal-sudado-cabrillon"
    );

const botonAgregarSudadoCabrillon =
    document.getElementById(
        "agregar-sudado-cabrillon"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonSudadoCabrillon && modalSudadoCabrillon) {

    botonSudadoCabrillon.addEventListener("click", () => {

        modalSudadoCabrillon.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalSudadoCabrillon &&
    modalSudadoCabrillon
) {

    cerrarModalSudadoCabrillon.addEventListener("click", () => {

        modalSudadoCabrillon.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalSudadoCabrillon) {

    modalSudadoCabrillon.addEventListener("click", (e) => {

        if (e.target === modalSudadoCabrillon) {

            modalSudadoCabrillon.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarSudadoCabrillon) {

    botonAgregarSudadoCabrillon.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Sudado de Cabrillón",

            precio: 65,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalSudadoCabrillon.style.display = "none";

    });

}

// ================================
// CARNE ALIÑADA
// ================================

const botonCarneAlinada =
    document.querySelector(
        '[data-plato="carne-alinada"]'
    );

const modalCarneAlinada =
    document.getElementById(
        "modal-carne-alinada"
    );

const cerrarModalCarneAlinada =
    document.querySelector(
        ".cerrar-modal-carne-alinada"
    );

const botonAgregarCarneAlinada =
    document.getElementById(
        "agregar-carne-alinada"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonCarneAlinada && modalCarneAlinada) {

    botonCarneAlinada.addEventListener("click", () => {

        modalCarneAlinada.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCarneAlinada &&
    modalCarneAlinada
) {

    cerrarModalCarneAlinada.addEventListener("click", () => {

        modalCarneAlinada.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCarneAlinada) {

    modalCarneAlinada.addEventListener("click", (e) => {

        if (e.target === modalCarneAlinada) {

            modalCarneAlinada.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCarneAlinada) {

    botonAgregarCarneAlinada.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Carne Aliñada",

            precio: 45,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCarneAlinada.style.display = "none";

    });

}

// ================================
// CARNE SECA
// ================================

const botonCarneSeca =
    document.querySelector(
        '[data-plato="carne-seca"]'
    );

const modalCarneSeca =
    document.getElementById(
        "modal-carne-seca"
    );

const cerrarModalCarneSeca =
    document.querySelector(
        ".cerrar-modal-carne-seca"
    );

const botonAgregarCarneSeca =
    document.getElementById(
        "agregar-carne-seca"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonCarneSeca && modalCarneSeca) {

    botonCarneSeca.addEventListener("click", () => {

        modalCarneSeca.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCarneSeca &&
    modalCarneSeca
) {

    cerrarModalCarneSeca.addEventListener("click", () => {

        modalCarneSeca.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCarneSeca) {

    modalCarneSeca.addEventListener("click", (e) => {

        if (e.target === modalCarneSeca) {

            modalCarneSeca.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCarneSeca) {

    botonAgregarCarneSeca.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Carne Seca",

            precio: 45,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCarneSeca.style.display = "none";

    });

}

// ================================
// COSTILLA DE CERDO
// ================================

const botonCostillaCerdo =
    document.querySelector(
        '[data-plato="costilla-cerdo"]'
    );

const modalCostillaCerdo =
    document.getElementById(
        "modal-costilla-cerdo"
    );

const cerrarModalCostillaCerdo =
    document.querySelector(
        ".cerrar-modal-costilla-cerdo"
    );

const botonAgregarCostillaCerdo =
    document.getElementById(
        "agregar-costilla-cerdo"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonCostillaCerdo && modalCostillaCerdo) {

    botonCostillaCerdo.addEventListener("click", () => {

        modalCostillaCerdo.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCostillaCerdo &&
    modalCostillaCerdo
) {

    cerrarModalCostillaCerdo.addEventListener("click", () => {

        modalCostillaCerdo.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCostillaCerdo) {

    modalCostillaCerdo.addEventListener("click", (e) => {

        if (e.target === modalCostillaCerdo) {

            modalCostillaCerdo.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCostillaCerdo) {

    botonAgregarCostillaCerdo.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Costilla de Cerdo",

            precio: 50,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCostillaCerdo.style.display = "none";

    });

}

// ================================
// ARROZ CON MARISCOS
// ================================

const botonArrozMariscos =
    document.querySelector(
        '[data-plato="arroz-mariscos"]'
    );

const modalArrozMariscos =
    document.getElementById(
        "modal-arroz-mariscos"
    );

const cerrarModalArrozMariscos =
    document.querySelector(
        ".cerrar-modal-arroz-mariscos"
    );

const preciosArrozMariscos =
    document.querySelectorAll(
        ".precio-arroz-mariscos"
    );

const botonAgregarArrozMariscos =
    document.getElementById(
        "agregar-arroz-mariscos"
    );

let precioArrozMariscosSeleccionado = null;


// ================================
// ABRIR MODAL
// ================================

if (
    botonArrozMariscos &&
    modalArrozMariscos
) {

    botonArrozMariscos.addEventListener("click", () => {

        modalArrozMariscos.style.display = "flex";

    });

}


// ================================
// SELECCIONAR PRECIO
// ================================

preciosArrozMariscos.forEach(boton => {

    boton.addEventListener("click", () => {

        preciosArrozMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        boton.classList.add("seleccionado");


        precioArrozMariscosSeleccionado =
            Number(boton.dataset.precio);

    });

});


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalArrozMariscos &&
    modalArrozMariscos
) {

    cerrarModalArrozMariscos.addEventListener("click", () => {

        modalArrozMariscos.style.display = "none";

        preciosArrozMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });

        precioArrozMariscosSeleccionado = null;

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalArrozMariscos) {

    modalArrozMariscos.addEventListener("click", (e) => {

        if (e.target === modalArrozMariscos) {

            modalArrozMariscos.style.display = "none";

            preciosArrozMariscos.forEach(btn => {

                btn.classList.remove("seleccionado");

            });

            precioArrozMariscosSeleccionado = null;

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarArrozMariscos) {

    botonAgregarArrozMariscos.addEventListener("click", () => {

        // Verificar precio

        if (
            precioArrozMariscosSeleccionado === null
        ) {

            alert(
                "Por favor, selecciona una opción de precio."
            );

            return;

        }


        // Obtener carrito

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        // Agregar producto

        carrito.push({

            nombre: "Arroz con Mariscos",

            precio:
                precioArrozMariscosSeleccionado,

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

        modalArrozMariscos.style.display = "none";


        // Limpiar selección

        preciosArrozMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });

        precioArrozMariscosSeleccionado = null;

    });

}

// ================================
// CHAUFA DE MARISCOS
// ================================

const botonChaufaMariscos =
    document.querySelector(
        '[data-plato="chaufa-mariscos"]'
    );

const modalChaufaMariscos =
    document.getElementById(
        "modal-chaufa-mariscos"
    );

const cerrarModalChaufaMariscos =
    document.querySelector(
        ".cerrar-modal-chaufa-mariscos"
    );

const preciosChaufaMariscos =
    document.querySelectorAll(
        ".precio-chaufa-mariscos"
    );

const botonAgregarChaufaMariscos =
    document.getElementById(
        "agregar-chaufa-mariscos"
    );

let precioChaufaMariscosSeleccionado = null;


// ================================
// ABRIR MODAL
// ================================

if (
    botonChaufaMariscos &&
    modalChaufaMariscos
) {

    botonChaufaMariscos.addEventListener("click", () => {

        modalChaufaMariscos.style.display = "flex";

    });

}


// ================================
// SELECCIONAR PRECIO
// ================================

preciosChaufaMariscos.forEach(boton => {

    boton.addEventListener("click", () => {

        preciosChaufaMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        boton.classList.add("seleccionado");


        precioChaufaMariscosSeleccionado =
            Number(boton.dataset.precio);

    });

});


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalChaufaMariscos &&
    modalChaufaMariscos
) {

    cerrarModalChaufaMariscos.addEventListener("click", () => {

        modalChaufaMariscos.style.display = "none";


        preciosChaufaMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        precioChaufaMariscosSeleccionado = null;

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalChaufaMariscos) {

    modalChaufaMariscos.addEventListener("click", (e) => {

        if (e.target === modalChaufaMariscos) {

            modalChaufaMariscos.style.display = "none";


            preciosChaufaMariscos.forEach(btn => {

                btn.classList.remove("seleccionado");

            });


            precioChaufaMariscosSeleccionado = null;

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarChaufaMariscos) {

    botonAgregarChaufaMariscos.addEventListener("click", () => {

        // Verificar precio

        if (
            precioChaufaMariscosSeleccionado === null
        ) {

            alert(
                "Por favor, selecciona una opción de precio."
            );

            return;

        }


        // Obtener carrito

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        // Agregar producto

        carrito.push({

            nombre: "Chaufa de Mariscos",

            precio:
                precioChaufaMariscosSeleccionado,

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

        modalChaufaMariscos.style.display = "none";


        // Limpiar selección

        preciosChaufaMariscos.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        precioChaufaMariscosSeleccionado = null;

    });

}

// ================================
// POLLO FRITO
// ================================

const botonPolloFrito =
    document.querySelector(
        '[data-plato="pollo-frito"]'
    );

const modalPolloFrito =
    document.getElementById(
        "modal-pollo-frito"
    );

const cerrarModalPolloFrito =
    document.querySelector(
        ".cerrar-modal-pollo-frito"
    );

const botonAgregarPolloFrito =
    document.getElementById(
        "agregar-pollo-frito"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonPolloFrito && modalPolloFrito) {

    botonPolloFrito.addEventListener("click", () => {

        modalPolloFrito.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalPolloFrito &&
    modalPolloFrito
) {

    cerrarModalPolloFrito.addEventListener("click", () => {

        modalPolloFrito.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalPolloFrito) {

    modalPolloFrito.addEventListener("click", (e) => {

        if (e.target === modalPolloFrito) {

            modalPolloFrito.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarPolloFrito) {

    botonAgregarPolloFrito.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Pollo Frito",

            precio: 15,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalPolloFrito.style.display = "none";

    });

}

// ================================
// LOMO SALTADO
// ================================

const botonLomoSaltado =
    document.querySelector(
        '[data-plato="lomo-saltado"]'
    );

const modalLomoSaltado =
    document.getElementById(
        "modal-lomo-saltado"
    );

const cerrarModalLomoSaltado =
    document.querySelector(
        ".cerrar-modal-lomo-saltado"
    );

const botonAgregarLomoSaltado =
    document.getElementById(
        "agregar-lomo-saltado"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonLomoSaltado && modalLomoSaltado) {

    botonLomoSaltado.addEventListener("click", () => {

        modalLomoSaltado.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalLomoSaltado &&
    modalLomoSaltado
) {

    cerrarModalLomoSaltado.addEventListener("click", () => {

        modalLomoSaltado.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalLomoSaltado) {

    modalLomoSaltado.addEventListener("click", (e) => {

        if (e.target === modalLomoSaltado) {

            modalLomoSaltado.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarLomoSaltado) {

    botonAgregarLomoSaltado.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Lomo Saltado",

            precio: 16,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalLomoSaltado.style.display = "none";

    });

}

// ================================
// MILANESA DE POLLO
// ================================

const botonMilanesaPollo =
    document.querySelector(
        '[data-plato="milanesa-pollo"]'
    );

const modalMilanesaPollo =
    document.getElementById(
        "modal-milanesa-pollo"
    );

const cerrarModalMilanesaPollo =
    document.querySelector(
        ".cerrar-modal-milanesa-pollo"
    );

const botonAgregarMilanesaPollo =
    document.getElementById(
        "agregar-milanesa-pollo"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonMilanesaPollo && modalMilanesaPollo) {

    botonMilanesaPollo.addEventListener("click", () => {

        modalMilanesaPollo.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalMilanesaPollo &&
    modalMilanesaPollo
) {

    cerrarModalMilanesaPollo.addEventListener("click", () => {

        modalMilanesaPollo.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalMilanesaPollo) {

    modalMilanesaPollo.addEventListener("click", (e) => {

        if (e.target === modalMilanesaPollo) {

            modalMilanesaPollo.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarMilanesaPollo) {

    botonAgregarMilanesaPollo.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Milanesa de Pollo",

            precio: 15,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalMilanesaPollo.style.display = "none";

    });

}

// ================================
// APANADO DE RES
// ================================

const botonApanadoRes =
    document.querySelector(
        '[data-plato="apanado-res"]'
    );

const modalApanadoRes =
    document.getElementById(
        "modal-apanado-res"
    );

const cerrarModalApanadoRes =
    document.querySelector(
        ".cerrar-modal-apanado-res"
    );

const botonAgregarApanadoRes =
    document.getElementById(
        "agregar-apanado-res"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonApanadoRes && modalApanadoRes) {

    botonApanadoRes.addEventListener("click", () => {

        modalApanadoRes.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalApanadoRes &&
    modalApanadoRes
) {

    cerrarModalApanadoRes.addEventListener("click", () => {

        modalApanadoRes.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalApanadoRes) {

    modalApanadoRes.addEventListener("click", (e) => {

        if (e.target === modalApanadoRes) {

            modalApanadoRes.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarApanadoRes) {

    botonAgregarApanadoRes.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Apanado de Res",

            precio: 16,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalApanadoRes.style.display = "none";

    });

}

// ================================
// BISTEC FRITO
// ================================

const botonBistecFrito =
    document.querySelector(
        '[data-plato="bistec-frito"]'
    );

const modalBistecFrito =
    document.getElementById(
        "modal-bistec-frito"
    );

const cerrarModalBistecFrito =
    document.querySelector(
        ".cerrar-modal-bistec-frito"
    );

const botonAgregarBistecFrito =
    document.getElementById(
        "agregar-bistec-frito"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonBistecFrito && modalBistecFrito) {

    botonBistecFrito.addEventListener("click", () => {

        modalBistecFrito.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalBistecFrito &&
    modalBistecFrito
) {

    cerrarModalBistecFrito.addEventListener("click", () => {

        modalBistecFrito.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalBistecFrito) {

    modalBistecFrito.addEventListener("click", (e) => {

        if (e.target === modalBistecFrito) {

            modalBistecFrito.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarBistecFrito) {

    botonAgregarBistecFrito.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Bistec Frito",

            precio: 16,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalBistecFrito.style.display = "none";

    });

}

// ================================
// PESCADO FRITO
// ================================

const botonPescadoFrito =
    document.querySelector(
        '[data-plato="pescado-frito"]'
    );

const modalPescadoFrito =
    document.getElementById(
        "modal-pescado-frito"
    );

const cerrarModalPescadoFrito =
    document.querySelector(
        ".cerrar-modal-pescado-frito"
    );

const botonAgregarPescadoFrito =
    document.getElementById(
        "agregar-pescado-frito"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonPescadoFrito && modalPescadoFrito) {

    botonPescadoFrito.addEventListener("click", () => {

        modalPescadoFrito.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalPescadoFrito &&
    modalPescadoFrito
) {

    cerrarModalPescadoFrito.addEventListener("click", () => {

        modalPescadoFrito.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalPescadoFrito) {

    modalPescadoFrito.addEventListener("click", (e) => {

        if (e.target === modalPescadoFrito) {

            modalPescadoFrito.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarPescadoFrito) {

    botonAgregarPescadoFrito.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Pescado Frito",

            precio: 15,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalPescadoFrito.style.display = "none";

    });

}

// ================================
// LOMO A LO POBRE
// ================================

const botonLomoPobre =
    document.querySelector(
        '[data-plato="lomo-pobre"]'
    );

const modalLomoPobre =
    document.getElementById(
        "modal-lomo-pobre"
    );

const cerrarModalLomoPobre =
    document.querySelector(
        ".cerrar-modal-lomo-pobre"
    );

const botonAgregarLomoPobre =
    document.getElementById(
        "agregar-lomo-pobre"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonLomoPobre && modalLomoPobre) {

    botonLomoPobre.addEventListener("click", () => {

        modalLomoPobre.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalLomoPobre &&
    modalLomoPobre
) {

    cerrarModalLomoPobre.addEventListener("click", () => {

        modalLomoPobre.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalLomoPobre) {

    modalLomoPobre.addEventListener("click", (e) => {

        if (e.target === modalLomoPobre) {

            modalLomoPobre.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarLomoPobre) {

    botonAgregarLomoPobre.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Lomo a lo Pobre",

            precio: 17,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalLomoPobre.style.display = "none";

    });

}

// ================================
// CARNE FRITA ALIÑADA
// ================================

const botonCarneFritaAlinada =
    document.querySelector(
        '[data-plato="carne-frita-alinada"]'
    );

const modalCarneFritaAlinada =
    document.getElementById(
        "modal-carne-frita-alinada"
    );

const cerrarModalCarneFritaAlinada =
    document.querySelector(
        ".cerrar-modal-carne-frita-alinada"
    );

const botonAgregarCarneFritaAlinada =
    document.getElementById(
        "agregar-carne-frita-alinada"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonCarneFritaAlinada &&
    modalCarneFritaAlinada
) {

    botonCarneFritaAlinada.addEventListener("click", () => {

        modalCarneFritaAlinada.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCarneFritaAlinada &&
    modalCarneFritaAlinada
) {

    cerrarModalCarneFritaAlinada.addEventListener("click", () => {

        modalCarneFritaAlinada.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCarneFritaAlinada) {

    modalCarneFritaAlinada.addEventListener("click", (e) => {

        if (e.target === modalCarneFritaAlinada) {

            modalCarneFritaAlinada.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCarneFritaAlinada) {

    botonAgregarCarneFritaAlinada.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Carne Frita Aliñada",

            precio: 16,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCarneFritaAlinada.style.display = "none";

    });

}

// ================================
// BISTEC A LO POBRE
// ================================

const botonBistecPobre =
    document.querySelector(
        '[data-plato="bistec-pobre"]'
    );

const modalBistecPobre =
    document.getElementById(
        "modal-bistec-pobre"
    );

const cerrarModalBistecPobre =
    document.querySelector(
        ".cerrar-modal-bistec-pobre"
    );

const botonAgregarBistecPobre =
    document.getElementById(
        "agregar-bistec-pobre"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonBistecPobre && modalBistecPobre) {

    botonBistecPobre.addEventListener("click", () => {

        modalBistecPobre.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalBistecPobre &&
    modalBistecPobre
) {

    cerrarModalBistecPobre.addEventListener("click", () => {

        modalBistecPobre.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalBistecPobre) {

    modalBistecPobre.addEventListener("click", (e) => {

        if (e.target === modalBistecPobre) {

            modalBistecPobre.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarBistecPobre) {

    botonAgregarBistecPobre.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Bistec a lo Pobre",

            precio: 17,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalBistecPobre.style.display = "none";

    });

}

// ================================
// CHICHA MORADA JARRA
// ================================

const botonChichaMoradaJarra =
    document.querySelector(
        '[data-plato="chicha-morada-jarra"]'
    );

const modalChichaMoradaJarra =
    document.getElementById(
        "modal-chicha-morada-jarra"
    );

const cerrarModalChichaMoradaJarra =
    document.querySelector(
        ".cerrar-modal-chicha-morada-jarra"
    );

const botonAgregarChichaMoradaJarra =
    document.getElementById(
        "agregar-chicha-morada-jarra"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonChichaMoradaJarra &&
    modalChichaMoradaJarra
) {

    botonChichaMoradaJarra.addEventListener("click", () => {

        modalChichaMoradaJarra.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalChichaMoradaJarra &&
    modalChichaMoradaJarra
) {

    cerrarModalChichaMoradaJarra.addEventListener("click", () => {

        modalChichaMoradaJarra.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalChichaMoradaJarra) {

    modalChichaMoradaJarra.addEventListener("click", (e) => {

        if (e.target === modalChichaMoradaJarra) {

            modalChichaMoradaJarra.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarChichaMoradaJarra) {

    botonAgregarChichaMoradaJarra.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Chicha Morada Jarra",

            precio: 12,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalChichaMoradaJarra.style.display = "none";

    });

}

// ================================
// MARACUYÁ JARRA
// ================================

const botonMaracuyaJarra =
    document.querySelector(
        '[data-plato="maracuya-jarra"]'
    );

const modalMaracuyaJarra =
    document.getElementById(
        "modal-maracuya-jarra"
    );

const cerrarModalMaracuyaJarra =
    document.querySelector(
        ".cerrar-modal-maracuya-jarra"
    );

const botonAgregarMaracuyaJarra =
    document.getElementById(
        "agregar-maracuya-jarra"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonMaracuyaJarra &&
    modalMaracuyaJarra
) {

    botonMaracuyaJarra.addEventListener("click", () => {

        modalMaracuyaJarra.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalMaracuyaJarra &&
    modalMaracuyaJarra
) {

    cerrarModalMaracuyaJarra.addEventListener("click", () => {

        modalMaracuyaJarra.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalMaracuyaJarra) {

    modalMaracuyaJarra.addEventListener("click", (e) => {

        if (e.target === modalMaracuyaJarra) {

            modalMaracuyaJarra.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarMaracuyaJarra) {

    botonAgregarMaracuyaJarra.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Maracuyá Jarra",

            precio: 12,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalMaracuyaJarra.style.display = "none";

    });

}

// ================================
// CLARITO HELADO JARRA
// ================================

const botonClaritoHeladoJarra =
    document.querySelector(
        '[data-plato="clarito-helado-jarra"]'
    );

const modalClaritoHeladoJarra =
    document.getElementById(
        "modal-clarito-helado-jarra"
    );

const cerrarModalClaritoHeladoJarra =
    document.querySelector(
        ".cerrar-modal-clarito-helado-jarra"
    );

const botonAgregarClaritoHeladoJarra =
    document.getElementById(
        "agregar-clarito-helado-jarra"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonClaritoHeladoJarra &&
    modalClaritoHeladoJarra
) {

    botonClaritoHeladoJarra.addEventListener("click", () => {

        modalClaritoHeladoJarra.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalClaritoHeladoJarra &&
    modalClaritoHeladoJarra
) {

    cerrarModalClaritoHeladoJarra.addEventListener("click", () => {

        modalClaritoHeladoJarra.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalClaritoHeladoJarra) {

    modalClaritoHeladoJarra.addEventListener("click", (e) => {

        if (e.target === modalClaritoHeladoJarra) {

            modalClaritoHeladoJarra.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarClaritoHeladoJarra) {

    botonAgregarClaritoHeladoJarra.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Clarito Helado Jarra",

            precio: 12,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalClaritoHeladoJarra.style.display = "none";

    });

}

// ================================
// CERVEZA CRISTAL
// ================================

const botonCervezaCristal =
    document.querySelector(
        '[data-plato="cerveza-cristal"]'
    );

const modalCervezaCristal =
    document.getElementById(
        "modal-cerveza-cristal"
    );

const cerrarModalCervezaCristal =
    document.querySelector(
        ".cerrar-modal-cerveza-cristal"
    );

const botonAgregarCervezaCristal =
    document.getElementById(
        "agregar-cerveza-cristal"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonCervezaCristal &&
    modalCervezaCristal
) {

    botonCervezaCristal.addEventListener("click", () => {

        modalCervezaCristal.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCervezaCristal &&
    modalCervezaCristal
) {

    cerrarModalCervezaCristal.addEventListener("click", () => {

        modalCervezaCristal.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCervezaCristal) {

    modalCervezaCristal.addEventListener("click", (e) => {

        if (e.target === modalCervezaCristal) {

            modalCervezaCristal.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCervezaCristal) {

    botonAgregarCervezaCristal.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Cerveza Cristal",

            precio: 10,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCervezaCristal.style.display = "none";

    });

}

// ================================
// GASEOSA 2 L
// ================================

const botonGaseosa2L =
    document.querySelector(
        '[data-plato="gaseosa-2l"]'
    );

const modalGaseosa2L =
    document.getElementById(
        "modal-gaseosa-2l"
    );

const cerrarModalGaseosa2L =
    document.querySelector(
        ".cerrar-modal-gaseosa-2l"
    );

const botonAgregarGaseosa2L =
    document.getElementById(
        "agregar-gaseosa-2l"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonGaseosa2L && modalGaseosa2L) {

    botonGaseosa2L.addEventListener("click", () => {

        modalGaseosa2L.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalGaseosa2L &&
    modalGaseosa2L
) {

    cerrarModalGaseosa2L.addEventListener("click", () => {

        modalGaseosa2L.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalGaseosa2L) {

    modalGaseosa2L.addEventListener("click", (e) => {

        if (e.target === modalGaseosa2L) {

            modalGaseosa2L.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarGaseosa2L) {

    botonAgregarGaseosa2L.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Gaseosa 2 L",

            precio: 14,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalGaseosa2L.style.display = "none";

    });

}

// ================================
// GASEOSA 1 1/2 L
// ================================

const botonGaseosa15L =
    document.querySelector(
        '[data-plato="gaseosa-15l"]'
    );

const modalGaseosa15L =
    document.getElementById(
        "modal-gaseosa-15l"
    );

const cerrarModalGaseosa15L =
    document.querySelector(
        ".cerrar-modal-gaseosa-15l"
    );

const botonAgregarGaseosa15L =
    document.getElementById(
        "agregar-gaseosa-15l"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonGaseosa15L && modalGaseosa15L) {

    botonGaseosa15L.addEventListener("click", () => {

        modalGaseosa15L.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalGaseosa15L &&
    modalGaseosa15L
) {

    cerrarModalGaseosa15L.addEventListener("click", () => {

        modalGaseosa15L.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalGaseosa15L) {

    modalGaseosa15L.addEventListener("click", (e) => {

        if (e.target === modalGaseosa15L) {

            modalGaseosa15L.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarGaseosa15L) {

    botonAgregarGaseosa15L.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Gaseosa 1 1/2 L",

            precio: 13,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalGaseosa15L.style.display = "none";

    });

}

// ================================
// GASEOSA 1 L
// ================================

const botonGaseosa1L =
    document.querySelector(
        '[data-plato="gaseosa-1l"]'
    );

const modalGaseosa1L =
    document.getElementById(
        "modal-gaseosa-1l"
    );

const cerrarModalGaseosa1L =
    document.querySelector(
        ".cerrar-modal-gaseosa-1l"
    );

const botonAgregarGaseosa1L =
    document.getElementById(
        "agregar-gaseosa-1l"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonGaseosa1L && modalGaseosa1L) {

    botonGaseosa1L.addEventListener("click", () => {

        modalGaseosa1L.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalGaseosa1L &&
    modalGaseosa1L
) {

    cerrarModalGaseosa1L.addEventListener("click", () => {

        modalGaseosa1L.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalGaseosa1L) {

    modalGaseosa1L.addEventListener("click", (e) => {

        if (e.target === modalGaseosa1L) {

            modalGaseosa1L.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarGaseosa1L) {

    botonAgregarGaseosa1L.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Gaseosa 1 L",

            precio: 11,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalGaseosa1L.style.display = "none";

    });

}

// ================================
// GASEOSA PERSONAL
// ================================

const botonGaseosaPersonal =
    document.querySelector(
        '[data-plato="gaseosa-personal"]'
    );

const modalGaseosaPersonal =
    document.getElementById(
        "modal-gaseosa-personal"
    );

const cerrarModalGaseosaPersonal =
    document.querySelector(
        ".cerrar-modal-gaseosa-personal"
    );

const botonAgregarGaseosaPersonal =
    document.getElementById(
        "agregar-gaseosa-personal"
    );


// ================================
// ABRIR MODAL
// ================================

if (
    botonGaseosaPersonal &&
    modalGaseosaPersonal
) {

    botonGaseosaPersonal.addEventListener("click", () => {

        modalGaseosaPersonal.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalGaseosaPersonal &&
    modalGaseosaPersonal
) {

    cerrarModalGaseosaPersonal.addEventListener("click", () => {

        modalGaseosaPersonal.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalGaseosaPersonal) {

    modalGaseosaPersonal.addEventListener("click", (e) => {

        if (e.target === modalGaseosaPersonal) {

            modalGaseosaPersonal.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarGaseosaPersonal) {

    botonAgregarGaseosaPersonal.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Gaseosa Personal",

            precio: 3.50,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalGaseosaPersonal.style.display = "none";

    });

}

// ================================
// SPORADE
// ================================

const botonSporade =
    document.querySelector(
        '[data-plato="sporade"]'
    );

const modalSporade =
    document.getElementById(
        "modal-sporade"
    );

const cerrarModalSporade =
    document.querySelector(
        ".cerrar-modal-sporade"
    );

const botonAgregarSporade =
    document.getElementById(
        "agregar-sporade"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonSporade && modalSporade) {

    botonSporade.addEventListener("click", () => {

        modalSporade.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalSporade &&
    modalSporade
) {

    cerrarModalSporade.addEventListener("click", () => {

        modalSporade.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalSporade) {

    modalSporade.addEventListener("click", (e) => {

        if (e.target === modalSporade) {

            modalSporade.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarSporade) {

    botonAgregarSporade.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Sporade",

            precio: 6.50,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalSporade.style.display = "none";

    });

}

// ================================
// AGUA MINERAL
// ================================

const botonAguaMineral =
    document.querySelector(
        '[data-plato="agua-mineral"]'
    );

const modalAguaMineral =
    document.getElementById(
        "modal-agua-mineral"
    );

const cerrarModalAguaMineral =
    document.querySelector(
        ".cerrar-modal-agua-mineral"
    );

const botonAgregarAguaMineral =
    document.getElementById(
        "agregar-agua-mineral"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonAguaMineral && modalAguaMineral) {

    botonAguaMineral.addEventListener("click", () => {

        modalAguaMineral.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalAguaMineral &&
    modalAguaMineral
) {

    cerrarModalAguaMineral.addEventListener("click", () => {

        modalAguaMineral.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalAguaMineral) {

    modalAguaMineral.addEventListener("click", (e) => {

        if (e.target === modalAguaMineral) {

            modalAguaMineral.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarAguaMineral) {

    botonAgregarAguaMineral.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Agua Mineral",

            precio: 3,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalAguaMineral.style.display = "none";

    });

}

// ================================
// YUCAS FRITAS
// ================================

const botonYucasFritas =
    document.querySelector(
        '[data-plato="yucas-fritas"]'
    );

const modalYucasFritas =
    document.getElementById(
        "modal-yucas-fritas"
    );

const cerrarModalYucasFritas =
    document.querySelector(
        ".cerrar-modal-yucas-fritas"
    );

const botonAgregarYucasFritas =
    document.getElementById(
        "agregar-yucas-fritas"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonYucasFritas && modalYucasFritas) {

    botonYucasFritas.addEventListener("click", () => {

        modalYucasFritas.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalYucasFritas &&
    modalYucasFritas
) {

    cerrarModalYucasFritas.addEventListener("click", () => {

        modalYucasFritas.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalYucasFritas) {

    modalYucasFritas.addEventListener("click", (e) => {

        if (e.target === modalYucasFritas) {

            modalYucasFritas.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarYucasFritas) {

    botonAgregarYucasFritas.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Yucas Fritas",

            precio: 6,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalYucasFritas.style.display = "none";

    });

}

// ================================
// PAPAS FRITAS
// ================================

const botonPapasFritas =
    document.querySelector(
        '[data-plato="papas-fritas"]'
    );

const modalPapasFritas =
    document.getElementById(
        "modal-papas-fritas"
    );

const cerrarModalPapasFritas =
    document.querySelector(
        ".cerrar-modal-papas-fritas"
    );

const botonAgregarPapasFritas =
    document.getElementById(
        "agregar-papas-fritas"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonPapasFritas && modalPapasFritas) {

    botonPapasFritas.addEventListener("click", () => {

        modalPapasFritas.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalPapasFritas &&
    modalPapasFritas
) {

    cerrarModalPapasFritas.addEventListener("click", () => {

        modalPapasFritas.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalPapasFritas) {

    modalPapasFritas.addEventListener("click", (e) => {

        if (e.target === modalPapasFritas) {

            modalPapasFritas.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarPapasFritas) {

    botonAgregarPapasFritas.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Papas Fritas",

            precio: 5,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalPapasFritas.style.display = "none";

    });

}

// ================================
// CAMOTES
// ================================

const botonCamotes =
    document.querySelector(
        '[data-plato="camotes"]'
    );

const modalCamotes =
    document.getElementById(
        "modal-camotes"
    );

const cerrarModalCamotes =
    document.querySelector(
        ".cerrar-modal-camotes"
    );

const botonAgregarCamotes =
    document.getElementById(
        "agregar-camotes"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonCamotes && modalCamotes) {

    botonCamotes.addEventListener("click", () => {

        modalCamotes.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCamotes &&
    modalCamotes
) {

    cerrarModalCamotes.addEventListener("click", () => {

        modalCamotes.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCamotes) {

    modalCamotes.addEventListener("click", (e) => {

        if (e.target === modalCamotes) {

            modalCamotes.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCamotes) {

    botonAgregarCamotes.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Camotes",

            precio: 5,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCamotes.style.display = "none";

    });

}

// ================================
// CHIFLES
// ================================

const botonChifles =
    document.querySelector(
        '[data-plato="chifles"]'
    );

const modalChifles =
    document.getElementById(
        "modal-chifles"
    );

const cerrarModalChifles =
    document.querySelector(
        ".cerrar-modal-chifles"
    );

const botonAgregarChifles =
    document.getElementById(
        "agregar-chifles"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonChifles && modalChifles) {

    botonChifles.addEventListener("click", () => {

        modalChifles.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalChifles &&
    modalChifles
) {

    cerrarModalChifles.addEventListener("click", () => {

        modalChifles.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalChifles) {

    modalChifles.addEventListener("click", (e) => {

        if (e.target === modalChifles) {

            modalChifles.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarChifles) {

    botonAgregarChifles.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Chifles",

            precio: 5,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalChifles.style.display = "none";

    });

}

// ================================
// YUCA SANCOCHADA
// ================================

const botonYucaSancochada =
    document.querySelector(
        '[data-plato="yuca-sancochada"]'
    );

const modalYucaSancochada =
    document.getElementById(
        "modal-yuca-sancochada"
    );

const cerrarModalYucaSancochada =
    document.querySelector(
        ".cerrar-modal-yuca-sancochada"
    );

const botonAgregarYucaSancochada =
    document.getElementById(
        "agregar-yuca-sancochada"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonYucaSancochada && modalYucaSancochada) {

    botonYucaSancochada.addEventListener("click", () => {

        modalYucaSancochada.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalYucaSancochada &&
    modalYucaSancochada
) {

    cerrarModalYucaSancochada.addEventListener("click", () => {

        modalYucaSancochada.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalYucaSancochada) {

    modalYucaSancochada.addEventListener("click", (e) => {

        if (e.target === modalYucaSancochada) {

            modalYucaSancochada.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarYucaSancochada) {

    botonAgregarYucaSancochada.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Yuca Sancochada",

            precio: 5,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalYucaSancochada.style.display = "none";

    });

}

// ================================
// CANCHA
// ================================

const botonCancha =
    document.querySelector(
        '[data-plato="cancha"]'
    );

const modalCancha =
    document.getElementById(
        "modal-cancha"
    );

const cerrarModalCancha =
    document.querySelector(
        ".cerrar-modal-cancha"
    );

const botonAgregarCancha =
    document.getElementById(
        "agregar-cancha"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonCancha && modalCancha) {

    botonCancha.addEventListener("click", () => {

        modalCancha.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalCancha &&
    modalCancha
) {

    cerrarModalCancha.addEventListener("click", () => {

        modalCancha.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalCancha) {

    modalCancha.addEventListener("click", (e) => {

        if (e.target === modalCancha) {

            modalCancha.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarCancha) {

    botonAgregarCancha.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Cancha",

            precio: 6,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalCancha.style.display = "none";

    });

}

// ================================
// ARROZ BLANCO
// ================================

const botonArrozBlanco =
    document.querySelector(
        '[data-plato="arroz-blanco"]'
    );

const modalArrozBlanco =
    document.getElementById(
        "modal-arroz-blanco"
    );

const cerrarModalArrozBlanco =
    document.querySelector(
        ".cerrar-modal-arroz-blanco"
    );

const botonAgregarArrozBlanco =
    document.getElementById(
        "agregar-arroz-blanco"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonArrozBlanco && modalArrozBlanco) {

    botonArrozBlanco.addEventListener("click", () => {

        modalArrozBlanco.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalArrozBlanco &&
    modalArrozBlanco
) {

    cerrarModalArrozBlanco.addEventListener("click", () => {

        modalArrozBlanco.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalArrozBlanco) {

    modalArrozBlanco.addEventListener("click", (e) => {

        if (e.target === modalArrozBlanco) {

            modalArrozBlanco.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarArrozBlanco) {

    botonAgregarArrozBlanco.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Arroz Blanco",

            precio: 6,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalArrozBlanco.style.display = "none";

    });

}

// ================================
// SARANDAJA
// ================================

const botonSarandaja =
    document.querySelector(
        '[data-plato="sarandaja"]'
    );

const modalSarandaja =
    document.getElementById(
        "modal-sarandaja"
    );

const cerrarModalSarandaja =
    document.querySelector(
        ".cerrar-modal-sarandaja"
    );

const botonAgregarSarandaja =
    document.getElementById(
        "agregar-sarandaja"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonSarandaja && modalSarandaja) {

    botonSarandaja.addEventListener("click", () => {

        modalSarandaja.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalSarandaja &&
    modalSarandaja
) {

    cerrarModalSarandaja.addEventListener("click", () => {

        modalSarandaja.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalSarandaja) {

    modalSarandaja.addEventListener("click", (e) => {

        if (e.target === modalSarandaja) {

            modalSarandaja.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarSarandaja) {

    botonAgregarSarandaja.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Sarandaja",

            precio: 7,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalSarandaja.style.display = "none";

    });

}

// ================================
// PATACONES
// ================================

const botonPatacones =
    document.querySelector(
        '[data-plato="patacones"]'
    );

const modalPatacones =
    document.getElementById(
        "modal-patacones"
    );

const cerrarModalPatacones =
    document.querySelector(
        ".cerrar-modal-patacones"
    );

const botonAgregarPatacones =
    document.getElementById(
        "agregar-patacones"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonPatacones && modalPatacones) {

    botonPatacones.addEventListener("click", () => {

        modalPatacones.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalPatacones &&
    modalPatacones
) {

    cerrarModalPatacones.addEventListener("click", () => {

        modalPatacones.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalPatacones) {

    modalPatacones.addEventListener("click", (e) => {

        if (e.target === modalPatacones) {

            modalPatacones.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarPatacones) {

    botonAgregarPatacones.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Patacones",

            precio: 10,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalPatacones.style.display = "none";

    });

}

// ================================
// TEQUEÑOS
// ================================

const botonTequenos =
    document.querySelector(
        '[data-plato="tequenos"]'
    );

const modalTequenos =
    document.getElementById(
        "modal-tequenos"
    );

const cerrarModalTequenos =
    document.querySelector(
        ".cerrar-modal-tequenos"
    );

const botonAgregarTequenos =
    document.getElementById(
        "agregar-tequenos"
    );


// ================================
// ABRIR MODAL
// ================================

if (botonTequenos && modalTequenos) {

    botonTequenos.addEventListener("click", () => {

        modalTequenos.style.display = "flex";

    });

}


// ================================
// CERRAR CON X
// ================================

if (
    cerrarModalTequenos &&
    modalTequenos
) {

    cerrarModalTequenos.addEventListener("click", () => {

        modalTequenos.style.display = "none";

    });

}


// ================================
// CERRAR TOCANDO FUERA
// ================================

if (modalTequenos) {

    modalTequenos.addEventListener("click", (e) => {

        if (e.target === modalTequenos) {

            modalTequenos.style.display = "none";

        }

    });

}


// ================================
// AGREGAR AL PEDIDO
// ================================

if (botonAgregarTequenos) {

    botonAgregarTequenos.addEventListener("click", () => {

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        carrito.push({

            nombre: "Tequeños",

            precio: 12,

            cantidad: 1

        });


        // Guardar carrito

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );


        // Actualizar contador

        actualizarContadorPedido();


        // Cerrar ventana

        modalTequenos.style.display = "none";

    });

    }

// ========================================
// FUNCIÓN PARA ABRIR Y CERRAR MODALES
// ========================================

function configurarModalChicharron(
    boton,
    modal,
    botonCerrar
) {

    if (!boton || !modal) {
        return;
    }


    // ABRIR

    boton.addEventListener("click", () => {

        modal.style.display = "flex";

    });


    // CERRAR CON X

    if (botonCerrar) {

        botonCerrar.addEventListener("click", () => {

            modal.style.display = "none";

        });

    }


    // CERRAR TOCANDO FUERA

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.style.display = "none";

        }

    });

}


// ========================================
// ACTIVAR LOS 4 MODALES
// ========================================

configurarModalChicharron(
    botonChicharronCalamar,
    modalChicharronCalamar,
    cerrarChicharronCalamar
);

configurarModalChicharron(
    botonChicharronPescado,
    modalChicharronPescado,
    cerrarChicharronPescado
);

configurarModalChicharron(
    botonChicharronMixto,
    modalChicharronMixto,
    cerrarChicharronMixto
);

configurarModalChicharron(
    botonChicharronPollo,
    modalChicharronPollo,
    cerrarChicharronPollo
);


// ========================================
// SELECCIÓN DE PRECIOS
// ========================================

document.querySelectorAll(".modal-plato")
    .forEach(modal => {

        const precios =
            modal.querySelectorAll(".precio-chicharron");

        precios.forEach(boton => {

            boton.addEventListener("click", () => {

                // Quitar selección anterior
                precios.forEach(btn => {

                    btn.classList.remove("seleccionado");

                });


                // Seleccionar precio
                boton.classList.add("seleccionado");


                // Guardar precio seleccionado
                modal.dataset.precioSeleccionado =
                    boton.dataset.precio;

            });

        });

    });


// ========================================
// AGREGAR CHICHARRONES AL PEDIDO
// ========================================

function configurarAgregarChicharron(
    idBoton,
    modal,
    nombreProducto
) {

    const botonAgregar =
        document.getElementById(idBoton);


    if (!botonAgregar || !modal) {
        return;
    }


    botonAgregar.addEventListener("click", () => {

        // Obtener precio seleccionado

        const precio =
            Number(modal.dataset.precioSeleccionado);


        // Verificar selección

        if (!precio) {

            alert(
                "Por favor, selecciona una opción de precio."
            );

            return;

        }


        // Obtener carrito

        let carrito =
            JSON.parse(
                localStorage.getItem("carrito")
            ) || [];


        // Agregar producto

        carrito.push({

            nombre: nombreProducto,

            precio: precio,

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

        modal.style.display = "none";


        // Limpiar selección

        const precios =
            modal.querySelectorAll(".precio-chicharron");


        precios.forEach(btn => {

            btn.classList.remove("seleccionado");

        });


        modal.dataset.precioSeleccionado = "";


        // IMPORTANTE:
        // El carrito NO se abre automáticamente.
        // Solo aumenta el contador.

    });

}


// ========================================
// CONFIGURAR LOS 4 BOTONES AGREGAR
// ========================================

configurarAgregarChicharron(
    "agregar-chicharron",
    modalChicharronCalamar,
    "Chicharrón de Calamar"
);

configurarAgregarChicharron(
    "agregar-chicharron-pescado",
    modalChicharronPescado,
    "Chicharrón de Pescado"
);

configurarAgregarChicharron(
    "agregar-chicharron-mixto",
    modalChicharronMixto,
    "Chicharrón Mixto"
);

configurarAgregarChicharron(
    "agregar-chicharron-pollo",
    modalChicharronPollo,
    "Chicharrón de Pollo"
);
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

// Guardamos el mensaje para enviarlo
// después de confirmar el pago

window.mensajePedidoWhatsApp = mensaje;


// ================================
// MOSTRAR RESUMEN PARA CONFIRMAR
// ================================

if (resumenPedidoConfirmacion) {

    let resumen = "";

    carrito.forEach(producto => {
        const precio = Number(producto.precio) || 0;
        const cantidad = Number(producto.cantidad) || 1;
        const subtotal = precio * cantidad;

        resumen +=
            `<div class="item-resumen-pedido">` +
            `<strong>${producto.nombre}</strong><br>` +
            `<span>${cantidad} × S/ ${precio.toFixed(2)}</span>` +
            `<strong>S/ ${subtotal.toFixed(2)}</strong>` +
            `</div>`;
    });

    resumen +=
        `<div class="total-resumen-pedido">` +
        `<strong>TOTAL</strong>` +
        `<strong>S/ ${total.toFixed(2)}</strong>` +
        `</div>`;

    resumen += `<div class="datos-resumen-pedido">${mensajeDatos.replace(/\n/g, "<br>")}</div>`;

    resumenPedidoConfirmacion.innerHTML = resumen;
}

// Mostrar primero el resumen; Yape queda para el siguiente paso
if (modalConfirmacionPedido) {
    modalConfirmacionPedido.style.display = "flex";
}

        
    });

}

// ================================
// MODAL REVISAR Y CONFIRMAR PEDIDO
// ================================

const modalConfirmacionPedido =
    document.getElementById("modal-confirmar-pedido");

const cerrarConfirmacionPedido =
    document.getElementById("cerrar-confirmacion-pedido");

const editarPedidoConfirmacion =
    document.getElementById("editar-pedido-confirmacion");

const continuarPagoConfirmacion =
    document.getElementById("continuar-pago-confirmacion");

const resumenPedidoConfirmacion =
    document.getElementById("resumen-pedido-confirmacion");


function cerrarModalConfirmacionPedido() {
    if (modalConfirmacionPedido) {
        modalConfirmacionPedido.style.display = "none";
    }
}

if (cerrarConfirmacionPedido) {
    cerrarConfirmacionPedido.addEventListener("click", () => {
        cerrarModalConfirmacionPedido();
    });
}

if (editarPedidoConfirmacion) {
    editarPedidoConfirmacion.addEventListener("click", () => {
        cerrarModalConfirmacionPedido();
        if (panelCarrito) {
            panelCarrito.classList.add("activo");
            panelCarrito.style.display = "block";
        }
    });
}

if (modalConfirmacionPedido) {
    modalConfirmacionPedido.addEventListener("click", (e) => {
        if (e.target === modalConfirmacionPedido) {
            cerrarModalConfirmacionPedido();
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


// CONTINUAR AL PAGO DESDE LA CONFIRMACIÓN
if (continuarPagoConfirmacion) {
    continuarPagoConfirmacion.addEventListener("click", () => {
        cerrarModalConfirmacionPedido();

        if (modalYape) {
            modalYape.style.display = "flex";
        }
    });
}


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

        mostrarEstadoPedidoEnviado();

    });

}

// ========================================
// CERRAR CARRITO AL TOCAR FUERA
// ========================================

document.addEventListener("click", (e) => {

    const carritoPedido =
        document.getElementById("carrito-pedido");

    const panelCarrito =
        document.getElementById("panel-carrito");

    const abrirCarrito =
        document.getElementById("abrir-carrito");

    if (!carritoPedido || !panelCarrito || !abrirCarrito) {
        return;
    }


    // Comprobar si el carrito está abierto

    const carritoAbierto =
        panelCarrito.classList.contains("activo") ||
        panelCarrito.style.display === "block";


    if (!carritoAbierto) {
        return;
    }


    // Si tocamos dentro del carrito,
    // NO hacer nada

    if (panelCarrito.contains(e.target)) {
        return;
    }


    // Si tocamos el botón "Mi pedido",
    // NO cerrar aquí

    if (abrirCarrito.contains(e.target)) {
        return;
    }


    // Cualquier otro lugar de la pantalla:
    // cerrar carrito

    panelCarrito.classList.remove("activo");

    panelCarrito.style.display = "none";

});

// =========================================================
// IMAGEN DE RESPALDO
// Si una foto de plato no existe, muestra logo-amarillo.png
// =========================================================

const IMAGEN_RESPALDO = "imagenes/logo-amarillo.png";

function activarImagenesDeRespaldo() {

    const imagenes = document.querySelectorAll("img");

    imagenes.forEach((imagen) => {

        function colocarRespaldo() {

            // Evitar un ciclo infinito
            if (imagen.dataset.respaldo === "true") {
                return;
            }

            imagen.dataset.respaldo = "true";

            imagen.src = IMAGEN_RESPALDO;

            imagen.classList.add("imagen-respaldo");
        }

        imagen.addEventListener("error", colocarRespaldo);

        // Detectar imágenes que ya hayan fallado
        if (
            imagen.complete &&
            imagen.naturalWidth === 0 &&
            !imagen.src.includes("logo-amarillo.png")
        ) {
            colocarRespaldo();
        }
    });
}


// Ejecutar cuando cargue la página
document.addEventListener(
    "DOMContentLoaded",
    activarImagenesDeRespaldo
);
