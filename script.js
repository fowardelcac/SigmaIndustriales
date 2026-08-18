document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts(category) {
        productCards.forEach(card => {
            if (card.getAttribute("data-category") === category) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Evento de clic en botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");
            filterProducts(selectedCategory);
        });
    });

    // Detectar si se entra con una categoría desde la URL (ej: productos.html?cat=barras)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("cat");

    if (categoryParam) {
        const targetBtn = document.querySelector(`.filter-btn[data-category="${categoryParam}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    } else {
        // Por defecto muestra la primera categoría activa
        const defaultCategory = document.querySelector(".filter-btn.active")?.getAttribute("data-category") || "mesas";
        filterProducts(defaultCategory);
    }
});


const productDialog = document.getElementById('product-dialog');
const dialogImg = document.getElementById('dialog-img');
const dialogThumbs = document.getElementById('dialog-thumbs');
const dialogCategory = document.getElementById('dialog-category');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
const dialogWhatsapp = document.getElementById('dialog-whatsapp');
const dialogClose = document.getElementById('dialog-close');

document.querySelectorAll('.btn-ver-mas').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');

        const title = card.querySelector('h3').textContent;
        const category = card.querySelector('.product-category').textContent;
        const description = card.querySelector('.product-info p').textContent;
        const gallery = card.dataset.gallery.split(',').map(src => src.trim());

        dialogCategory.textContent = category;
        dialogTitle.textContent = title;
        dialogDescription.textContent = description;

        dialogImg.src = gallery[0];
        dialogImg.alt = title;

        dialogThumbs.innerHTML = '';
        gallery.forEach((src, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = 'dialog-thumb' + (index === 0 ? ' active' : '');
            thumb.innerHTML = `<img src="${src}" alt="${title}">`;

            thumb.addEventListener('click', () => {
                dialogImg.src = src;
                dialogThumbs.querySelectorAll('.dialog-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });

            dialogThumbs.appendChild(thumb);
        });

        const mensaje = `Hola! Quiero consultar sobre: ${title}`;
        dialogWhatsapp.href = `https://wa.me/5493515126823?text=${encodeURIComponent(mensaje)}`;

        productDialog.showModal();
    });
});

dialogClose.addEventListener('click', () => productDialog.close());

productDialog.addEventListener('click', (e) => {
    if (e.target === productDialog) productDialog.close();
});