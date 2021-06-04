document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.ready(() => {

    $('#page-wrapper').css('animation', 'page-hide var(--animation-time) forwards');
    $('.top-cover').css('animation', 'top-slide var(--animation-time)');
    $('.bottom-cover').css('animation', 'bottom-slide var(--animation-time)');
})