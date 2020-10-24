articulosArray = [];


function calctotal() {
    let suma = 0;
    let subs = document.getElementsByClassName("subtotal")
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = suma;
    calcEnvio();
}

function calcSubtotal(unitCost, i) {

    let count = parseInt(document.getElementById(`cantidad${i}`).value);

    subtotal = count * unitCost;

    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calctotal();
}

function checkCurrency(unitCost, currency) {
    if (currency === "UYU") {
        return unitCost / 40
    } else {
        return unitCost
    }
}


function showCartProducts(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let unitCostDolar = checkCurrency(product.unitCost, product.currency);

        let sub = unitCostDolar * product.count;
        //let sub = checkCurrency(product.unitCost,product.currency) * product.count;

        contenido += `
            <tr>
                <th>${i + 1}</th>
                <td><img src='${product.src}' width="75px"></td>

                <td>${product.name}</td>
                
                <td> ${product.currency} ${product.unitCost}</td>
                
                <td><input style="width:60px;" onchange="calcSubtotal(${unitCostDolar}, ${i})" type="number" id="cantidad${i}" value="${product.count}" min="1"></td>

                <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:blod;">${sub}</td>
                
                <td><button id="${i}" class="btn btn-danger" onclick="eliminar(${i})"> X</button></td>
            </tr>
        `
    }
    document.getElementById("listado").innerHTML += contenido;
    calctotal()
}
function eliminar(i) {
    if (articulosArray.length > 1) {
        articulosArray.splice(i, 1);
        document.getElementById("listado").innerHTML = "";
        showCartProducts(articulosArray);
    } else {
        articulosArray = []
        document.getElementById("listado").innerHTML =
            `
        <h2>No tiene productos en el carrito</h2>
        <p>Seleccione alguno de nuestro <a href="Products.html">Productos</a></p>
        `
    }
    calctotal()
}

function calcEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total * envio / 100;
    let totalAPagar = totalConEnvio + total;
    let contenido = `
        <tr>
        <td>${total}</td>

        <td>${envio} % sobre el subtotal</td>

        <td>${totalConEnvio}</td>

        <td>${totalAPagar}</td>

        </tr>
    `
    document.getElementById("totalEnvio").innerHTML = contenido;
}

function selectPayment() {

    var pagos = document.getElementsByName("FormaDePago");
    for (var i = 0; i < pagos.length; i++) {
        if (pagos[i].checked && (pagos[i].value == "1")) {
            document.getElementById("bankPayment").classList.add("d-none");
            document.getElementById("idBank").value = "";
            document.getElementById("accountNumber").value = "";
            document.getElementById("cardPayment").classList.remove("d-none");
        } else if (pagos[i].checked && (pagos[i].value == "2")) {
            document.getElementById("cardPayment").classList.add("d-none");
            document.getElementById("NameCard").value = "";
            document.getElementById("ExpDate").value = "";
            document.getElementById("CardId").value = "";
            document.getElementById("PassCard").value = "";
            document.getElementById("bankPayment").classList.remove("d-none");
        }
    }

}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_PLUS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosArray = resultObj.data.articles;

            showCartProducts(articulosArray);

            calcEnvio()
        }
    });
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio()
        });
    }
    let tipoPagos = document.getElementsByName("FormaDePago");
    for (var i = 0; i < tipoPagos.length; i++) {
        tipoPagos[i].addEventListener("change", function () {
            selectPayment();
        });
    }

    // logica datosenvio + modal con datos de pago 


    let form = document.getElementsByClassName('needs-validation')[0];
    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    });

    let botonAbrirModalDatosPagos = document.getElementById("BotonAbrirModalDatosPagos");
    botonAbrirModalDatosPagos.addEventListener('click', function (e) {
        let formDatosEnvio = document.getElementById('formDatosEnvio');
        if (formDatosEnvio.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        formDatosEnvio.classList.add('was-validated');
    });

    let botonSubmitModalDatosPagos = document.getElementById("BotonSubmitModalDatosPagos");
    botonSubmitModalDatosPagos.addEventListener('click', function (event) {
        let pagos = document.getElementsByName("FormaDePago");

        //obtener forma de pago seleccionada
        let value = null;
        for (var i = 0; i < pagos.length; i++) {
            if (pagos[i].checked) {
                value = pagos[i].value;
                break;
            }
        }

        //chequeo si hay una forma de pago seleccionada y es card o bank
        if (value != null && (value == "1" || value == "2")) {
            let formPayment;
            if (value == "1") { //forma de pago = tarjeta
                formPayment = document.getElementById('formCardPayment');
            } else if (value == "2") { //forma de pago = bank
                formPayment = document.getElementById('formBankPayment');
            }

            if (formPayment.checkValidity() === false) { //no es valido
                event.preventDefault();
                event.stopPropagation();
            } else {
                $('#modalDatosPagos').modal('hide');
            }
            formPayment.classList.add('was-validated');
        }
    });
});