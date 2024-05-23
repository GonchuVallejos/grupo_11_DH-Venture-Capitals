window.onload = function(){

    const form = document.querySelector(".form-login");

    form.addEventListener("submit", function(e){

        let campoPassword = document.querySelector("input#password");

        if(campoPassword.value.length < 8){
            alert("El campo Contraseña debe contener al menos 8 caracteres")
                }})}