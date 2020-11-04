document.addEventListener("DOMContentLoaded", function (e) {
    let perfil = localStorage.getItem('perfil');
    

    if (perfil) {

        perfil = JSON.parse(perfil);

        if (perfil.imgUrl != "") {
            document.getElementById("imgPerfil").src = perfil.imgUrl;
        }
        document.getElementById("imgUrl").value = perfil.imgUrl;
        document.getElementById("Nombre").value = perfil.Nombre;
        document.getElementById("Apellido").value = perfil.Apellido;
        document.getElementById("Email").value = perfil.Email;
        document.getElementById("Edad").value = perfil.Edad;
        document.getElementById("Telefono").value = perfil.Telefono;

    }

    document.getElementById("Guardar").addEventListener("click", function (e) {
        let camposCompletos = true;
        let imgUrl = document.getElementById("imgUrl");
        let nombre = document.getElementById("Nombre");
        let apellido = document.getElementById("Apellido");
        let email = document.getElementById("Email");
        let edad = document.getElementById("Edad");
        let telefono = document.getElementById("Telefono");

        if(nombre.value === ''){
            nombre.classList.add("is-invalid");
            camposCompletos = false;
        } else{
            nombre.classList.remove("is-invalid")
        }
        if(apellido.value === ''){
            apellido.classList.add("is-invalid");
            camposCompletos = false;
        } else{
            nombre.classList.remove("is-invalid")
        }
        if(email.value === ''){
            email.classList.add("is-invalid");
            camposCompletos = false;
        } else{
            nombre.classList.remove("is-invalid")
        }
        if(camposCompletos){
            localStorage.setItem('perfil', JSON.stringify({
                Nombre: nombre.value,
                Apellido: apellido.value,
                Edad: edad.value,
                imgUrl: imgUrl.value,
                Email: email.value,
                Telefono: telefono.value
            }));

            window.location = "my-profile.html";
        }
    });

});