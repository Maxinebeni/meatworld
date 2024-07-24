document.addEventListener('DOMContentLoaded', function () {
    var allProductsButton = document.querySelector('.hero__categories__all');
    var categoriesList = document.querySelector('.hero__categories__list');

    allProductsButton.addEventListener('click', function () {
        if (categoriesList.style.display === 'none' || categoriesList.style.display === '') {
            categoriesList.style.display = 'block';
        } else {
            categoriesList.style.display = 'none';
        }
    });
});
