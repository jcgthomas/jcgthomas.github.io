$("document").ready(() => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    let GRID_SQUARE_SIZE = 80;
    const MAX_GRID_DIMENSIONS = 12;
    let width = $("#intro").width();
    let height = $("#intro").height();
    if (width/10 > GRID_SQUARE_SIZE || height/10 > GRID_SQUARE_SIZE) {
        width > height ? GRID_SQUARE_SIZE = width/MAX_GRID_DIMENSIONS : GRID_SQUARE_SIZE = height/MAX_GRID_DIMENSIONS;
    }
    for (let i = 0; i < (Math.floor(width/GRID_SQUARE_SIZE)*Math.floor(height/GRID_SQUARE_SIZE)); i++) {
        $(".backgroundGrid").append(`<div class="gridSquare"></div>`);
    }
    $(".backgroundGrid").css("grid-template-columns", `repeat(${Math.floor(width/GRID_SQUARE_SIZE)}, 1fr)`);


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
            $(j).css("opacity", `${(l-40)/2}%`)
                .css("transition", `${(k/10)+2}s`)
                .css("background", `hsl(0, 0%, ${l}%)`)
                .css("transform", `translate(${(m/100)-0.5}vw, ${(n/100)-0.5}vh)
                                   rotate(${(o/20)-2.5}deg)
                                   scale(${(p/600)+0.8}, ${(p/600)+0.8})`)
                .css("box-shadow", `0 0 5px 8px hsl(0, 0%, ${l}%)`)
                .css("border-radius", "0%");
        }

        function hoverSquare() {
            let r = Math.floor(Math.random()*359);
            $(j).css("opacity", "60%")
                .css("transition", "0.3s")
                .css("background", `hsl(${r}, 20%, 60%)`)
                .css("box-shadow", `0 0 10px 10px hsl(${r}, 20%, 60%)`)
                .css("border-radius", "5%");
        }
        animateSquare();
        setInterval(animateSquare, Math.floor(Math.random()*100)*300+8000);
        $(j).hover(hoverSquare, animateSquare);
    })
});
