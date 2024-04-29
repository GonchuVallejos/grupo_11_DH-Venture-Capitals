window.onload = function(){

    const form = document.querySelector(".form-register");

    form.addEventListener("submit", function(e){

        let errores = [];

        let campoNombre = document.querySelector("input#nombre");
        let campoApellido = document.querySelector("input#apellido");
        let campoEmail = document.querySelector("input#email");
        let campoPassword = document.querySelector("input#password");
        let campoRePassword = document.querySelector("input#re-password");
        let campoImagen = document.querySelector("input#image");

        if(campoNombre.value.length < 2){
            errores.push("El campo Nombre debe contener al menos 2 caracteres");
        } else if(campoApellido.value.length < 2){
            errores.push("El campo Apellido debe contener al menos 2 caracteres");
        } else if(campoEmail.value == ""){
            errores.push("El campo Email es obligatorio");
        }  else if(campoEmail.validity.typeMismatch){
                errores.push("El Email debe ser válido");
        } else if(campoPassword.value.length < 8){
            errores.push("El campo Contraseña debe contener al menos 8 caracteres");
        } else if(campoRePassword.value !== campoPassword.value){
            errores.push("La confirmación de la contraseña debe coincidir");
        } else if(campoImagen.validity.typeMismatch){
            errores.push("La imagen debe ser un archivo válido");
        }

        if(errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector(".errores ul");
            errores.forEach(error => {
                ulErrores.innerHTML += `<li> ${error} </li>`
            })  
        }

    })
}