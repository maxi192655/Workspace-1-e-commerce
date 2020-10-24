var car = {};
var comentariosArray = [];
var productosArray = [];


function showRelatedProducts(arrayProductos, relatedProducts) {
    let contenido = "<hr>";

    contenido += `<div class="text-center p-4">
                    <h2><strong>${car.category}: </strong></h2>
                    <p class="lead">Encuentra otros productos que te Podrían interesar!</p>
                    </div>
                <div class="row">`
    relatedProducts.forEach(function (i) {
        contenido += `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="${arrayProductos[i].imgSrc}" alt="${arrayProductos[i].description}"></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">${arrayProductos[i].name}</a>
                </h4>
                <h5>${arrayProductos[i].currency}:${arrayProductos[i].cost}</h5>
                <p class="card-text">${arrayProductos[i].description}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">★ ★ ★ ★ ☆</small>
              </div>
            </div>
          </div>
       `
    });
    contenido += `</div>`
    document.getElementById("relatedProducts").innerHTML += contenido;
}


function showCar(car, arrayComments) {
    let info = "";
    let imgs = "";
    let comments = "<h3>Cuéntanos que te ha parecido:</h3> <hr>";

    info = `<div class="text-center p-4">
                <h2><strong>${car.name}: </strong></h2>
                <h3>Precio: ${car.cost}${car.currency}</h3>
                <b>Vendidos: ${car.soldCount}</b>
            </div>
           
            
               
            
        `;


    imgs += `
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-intervalal= "1000">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${car.images[0]}" class="d-block w-100 " alt="${car.description}">
                    </div>
                    <div class="carousel-item">
                        <img src="${car.images[1]}" class="d-block w-100" alt="${car.description}">
                    </div>
                    <div class="carousel-item">
                        <img src="${car.images[2]}" class="d-block w-100" alt="${car.description}">
                    </div>
                    <div class="carousel-item">
                        <img src="${car.images[3]}" class="d-block w-100" alt="${car.description}">
                    </div>
                    <div class="carousel-item">
                        <img src="${car.images[4]}" class="d-block w-100" alt="${car.description}">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
        </div>
        
            <div class="text-center p-4">
                <p><strong>Descripción: </strong>${car.description}</p>
                <a href="cart.html"><button id="Comprar" class="btn btn-primary btn-lg btn-block">Comprar!</button></a>
            </div>
    `



    arrayComments.forEach(function (comment) {
        let puntos = "";

        comments += `
                        <strong>${comment.user} opinó: </strong><br>
                        <p>${comment.description}</p>
            `;
        for (let i = 0; i < comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }
        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: right;">${puntos}</div><br><hr>`

    });



    document.getElementById("info").innerHTML += info;
    document.getElementById("imgs").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;

            showCar(car, comentariosArray);

        }

    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            car = resultObj.data;

            showCar(car, comentariosArray);
        }

    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productosArray = resultObj.data;

            showRelatedProducts(productosArray, car.relatedProducts);
        }

    });


    document.getElementById("submit").addEventListener("click", function () {

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let newComment = {
            score: parseInt(document.getElementById("newCal").value),
            description: document.getElementById("comm").value,
            user: JSON.parse(sessionStorage.getItem('User-Logged')).email,
            dateTime: dateTime,
        };
        comentariosArray.push(newComment);

        showCar(car, comentariosArray);
    });

});