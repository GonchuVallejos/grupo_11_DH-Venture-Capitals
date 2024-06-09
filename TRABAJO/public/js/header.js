window.addEventListener('load', () =>{

    document.addEventListener('click', function(event) {
        const menuContainer = document.getElementById('menu-button');
        const dropdownMenu = document.querySelector('.menu-desplegable');
        const isClickedInsideMenu = menuContainer.contains(event.target);
    
        if (!isClickedInsideMenu) {
            dropdownMenu.classList.remove('open-menu');
        }
    });
    
    document.getElementById('menu-button').addEventListener('click', function() {
        const dropdownMenu = document.querySelector('.menu-desplegable');
        dropdownMenu.classList.toggle('open-menu');
    });


})