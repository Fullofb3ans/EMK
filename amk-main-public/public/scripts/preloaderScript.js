window.onload = function () {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
}

$(document).ready(function () {
    $('#preloader').fadeOut(400);
});
