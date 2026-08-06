// ================================
// LIGHTBOX GALERÍA
// ================================

const imagenes = document.querySelectorAll(".contenedor-galeria img");
const lightbox = document.getElementById("lightbox");
const imagenLightbox = document.getElementById("imagen-lightbox");
const cerrar = document.querySelector(".cerrar");

imagenes.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";
        imagenLightbox.src = img.src;

    });

});

cerrar.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});
