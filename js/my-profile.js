let newProfile = parseInt(document.getElementById(infoPersonal).value)

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("Cambios").addEventListener("click", function (e) {

        let inputNombre = document.getElementById("Nombre");
        let inputApellido = document.getElementById("Apellido");
        let inputEmail = document.getElementById("E-mail");

        let camposMinimos = true;

        if (inputNombre.value === '') {
            inputNombre.classList.add("invalid");
            camposMinimos = false;
        }
        if (inputApellido.value === '') {
            inputApellido.classList.add("invalid");
            camposMinimos = false;
        }
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposMinimos = false;
        }
        if(camposMinimos) {

            if(inputApellido.value, inputEmail.value, inputNombre.value) {
                sessionStorage.setItem('Perfil Completo', JSON.stringify({em}))
            }

        }

    });

});