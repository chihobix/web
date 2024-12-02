window.onload = function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.left = '0px'; 
};

document.getElementById('toggleSidebar').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('toggleSidebar');

    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-200px'; 
    } else {
        sidebar.style.left = '0px'; 
    }

    toggleButton.classList.add('rotate');

    setTimeout(function() {
        toggleButton.classList.remove('rotate');
    }, 500); 
});
