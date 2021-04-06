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
            let l = Math.floor(Math.random()*100);
            if (l < 90) {
                l = (l / 5) + 50;
            }
            let m = Math.floor(Math.random()*100);
            let n = Math.floor(Math.random()*100);
            let o = Math.floor(Math.random()*100);
            let p = Math.floor(Math.random()*100);
            $(j).css("opacity", `${(l-50)/1.2}%`)
                .css("transition", `${(k/10)+2}s`)
                .css("background", `hsl(0, 0%, ${l}%)`)
                .css("transform", `translate(${(m/100)-0.5}vw, ${(n/100)-0.5}vh)
                                   rotate(${(o/20)-2.5}deg)
                                   scale(${(p/500)+0.9}, ${(p/500)+0.9})`)
                .css("box-shadow", `0 0 20px hsl(0, 0%, ${l}%)`);
        }

        function hoverSquare() {
            let r = Math.floor(Math.random()*359);
            $(j).css("opacity", "80%")
                .css("transition", "0.15s")
                .css("background", `hsl(${r}, 30%, 50%)`)
                .css("box-shadow", `0 0 50px hsl(${r}, 30%, 50%)`);
                // .css("transform", `scale(1.05, 1.05) rotate(${(r/20)-9}deg)`);
                // .css("transform", "scale(1,1)");
        }
        animateSquare();
        setInterval(animateSquare, Math.floor(Math.random()*100)*300+10000);
        $(j).hover(hoverSquare, animateSquare);
    })
});
