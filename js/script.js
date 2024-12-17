$(document).ready(function () {
    function loadProducts(page) {
        $.ajax({
            url: 'get_products.php',
            type: 'GET',
            data: { page: page },
            success: function (response) {
                if (response.products) {
                    let productHTML = '';
                    response.products.forEach(product => {
                        productHTML += `
                            <div class="col-md-4 mb-4">
                                <div class="card product-card">
                                    <button class="like-btn">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                    <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">${product.description}</p>
                                        <p class="card-text text-primary"><strong>${product.price} €</strong></p>
                                        <button class="btn btn-success">Ajouter au panier</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $('#product-list').html(productHTML);

                    // Gérer la pagination
                    updatePagination(response.pagination);
                }
            },
            error: function (err) {
                console.error('Erreur AJAX:', err);
                $('#product-list').html('<p class="text-center">Impossible de charger les produits.</p>');
            }
        });
    }

    function updatePagination(pagination) {
        const { currentPage, totalPages } = pagination;
        let paginationHTML = '';

        // Première page
        if (currentPage > 1) {
            paginationHTML += `<li class="page-item"><a class="page-link" data-page="1">«</a></li>`;
        }

        // Flèche précédente
        if (currentPage > 1) {
            paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}">‹</a></li>`;
        }

        // Pages dynamiques (3 autour de la page actuelle)
        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
            paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                                <a class="page-link" data-page="${i}">${i}</a>
                               </li>`;
        }

        // Flèche suivante
        if (currentPage < totalPages) {
            paginationHTML += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}">›</a></li>`;
        }

        // Dernière page
        if (currentPage < totalPages) {
            paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}">»</a></li>`;
        }

        $('#pagination').html(paginationHTML);
    }

    // Initialisation
    loadProducts(1);

    // Gestion des clics sur la pagination
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        loadProducts(page);
    });
});
