
const photos = [...document.querySelectorAll(".photo")];
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const counter = document.getElementById("counter");

let visiblePhotos = [];
let currentIndex = 0;

function updateVisiblePhotos() {
    visiblePhotos = photos.filter(photo => !photo.classList.contains("hidden"));
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(filter => filter.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        photos.forEach(photo => {
            const matches =
                category === "all" || photo.dataset.category === category;

            photo.classList.toggle("hidden", !matches);
        });

        updateVisiblePhotos();
    });
});

function openLightbox(index) {
    updateVisiblePhotos();

    if (!visiblePhotos.length) return;

    currentIndex = index;
    showImage();
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function showImage() {
    const photo = visiblePhotos[currentIndex];
    const img = photo.querySelector("img");
    const title = photo.querySelector("h3").textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title;
    counter.textContent = `${currentIndex + 1} / ${visiblePhotos.length}`;
}

function changeImage(direction) {
    currentIndex =
        (currentIndex + direction + visiblePhotos.length) %
        visiblePhotos.length;

    showImage();
}

photos.forEach(photo => {
    photo.addEventListener("click", () => {
        updateVisiblePhotos();
        openLightbox(visiblePhotos.indexOf(photo));
    });
});

document.getElementById("prev").addEventListener("click", () => {
    changeImage(-1);
});

document.getElementById("next").addEventListener("click", () => {
    changeImage(1);
});

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("close").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
    if (event.key === "Escape") closeLightbox();
});