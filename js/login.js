/*var usersArray = [];

function validateUser(array, userIn, passwordIn) {
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn) {
            return true;
        }
    }

    return false;
}*/



document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("submit").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("is-invalid");
            camposCompletos = false;
        }
        if (inputPassword.value === '') {
            inputPassword.classList.add("is-invalid");
            camposCompletos = false;
        }
        if (camposCompletos) {

            if (inputEmail.value, inputPassword.value) {
                
                //Almaceno informacion en la computadora del usuario y con setItem pasa 2 valores el nombre y el valor de inputEmail
                sessionStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value}));
                
                window.location = 'Inicio.html';
            } else {
                alert("Usuario o contraseña incorrecta !")
            }
        }else {
            alert("Debe ingresar los datos!")
        }
    })
});