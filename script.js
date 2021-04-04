$("document").ready(() => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    $(".gridSquare").each(function(i, j) {
        function animateSquare() {
            let k = Math.floor(Math.random()*100);
            let l = k;
            let m = k;
            let n = k;
            let o = k;
            let p = k;
            let q = k;
            $(j).css("opacity", "5%")
                .css("transition", `${(k/20)+2}s`)
                .css("background", `hsl(0, 0%, ${(l/2)+50}%)`)
                .css("transform", `translate(${(m/10)-5}px, ${(n/10)-5}px)
                                   rotate(${(o/20)-2.5}deg)
                                   scale(${(p/1000)+0.95}, ${(q/1000)+0.95})`)
        }

        function hoverSquare() {
            let r = Math.floor(Math.random()*359);
            $(j).css("opacity", "40%")
                .css("transition", "0.2s")
                .css("background", `hsl(${r}, 80%, 60%)`);
        }
        animateSquare();
        $(j).hover(hoverSquare, animateSquare);
    })
});
