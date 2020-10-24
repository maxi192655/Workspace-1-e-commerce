//creo constantes para aplicar a los sort boton
const ORDER_ASC_BY_COST = "cost -> COST";
const ORDER_DESC_BY_COST = "COST -> cost";
const ORDER_DESC_BY_SOLD = "SOLD -> sold"

var productsArray = [];
var minCost = undefined;
var maxCost = undefined;
var buscar = undefined;

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_SOLD) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}


function showProducts(array) {
    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost))
            && ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {
                contenido += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>  
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + '<strong>' + product.name + '</strong>' + `</h4>
                        <small class="text-muted">` + product.soldCount + ` Unidades vendidas</small>
                    </div>
                    <p class="mb-1">`+ '<strong>Descripcion: </strong>' + product.description + `</p>
                    <p class="mb-1">` + '<strong>Precio: </strong>' + product.cost + product.currency + `</p>
                </div>
            </div>
        </a>
        `
            }
        }
    }

    document.getElementById("Listado").innerHTML = contenido;

};


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray)

            showProducts(productsArray);
        }
    });



    document.getElementById("sortPriceAsc").addEventListener("click", function () {

        productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function () {

        productsArray = sortProducts(ORDER_DESC_BY_COST, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("sortSoldDesc").addEventListener("click", function () {

        productsArray = sortProducts(ORDER_DESC_BY_SOLD, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("filtrar").addEventListener("click", function () {

        minCost = document.getElementById("rangoPrecioMin").value;
        maxCost = document.getElementById("rangoPrecioMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined
        }

        showProducts(productsArray);
    });


    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("rangoPrecioMin").value = "";
        document.getElementById("rangoPrecioMax").value = "";
        minCost = undefined;
        maxCost = undefined;

        showProducts(productsArray);
    });

    document.getElementById("buscador").addEventListener('input', function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        showProducts(productsArray);

    });

    document.getElementById("limpBusqueda").addEventListener("click", function () {

        document.getElementById("buscador").value = "";

        buscar = undefined;

        showProducts(productsArray);

    });
});