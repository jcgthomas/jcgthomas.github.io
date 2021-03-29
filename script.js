$("document").ready(() => {

    $(".introText").hover(() => {
        $("#james").css( "color", "var(--col5)" );
      }, () => {
        $("#james").css( "color", "rgba(255, 255, 255, 0.8)" );
      })
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});